pub mod utils;

use {
    anchor_lang::{
        prelude::*, solana_program::system_program, AnchorDeserialize, AnchorSerialize,
        Discriminator, Key,
    },
    arrayref::array_ref,
    spl_associated_token_account,
    spl_token::state::Mint,
    spl_token_metadata::{
        instruction::{create_master_edition, create_metadata_accounts, update_metadata_accounts},
        state::{
            MAX_CREATOR_LEN, MAX_CREATOR_LIMIT, MAX_NAME_LENGTH, MAX_SYMBOL_LENGTH, MAX_URI_LENGTH,
        },
    },
    std::cell::Ref,
};

use anchor_lang::solana_program::{
    program::{invoke, invoke_signed},
    program_pack::Pack,
    system_instruction,
};

declare_id!("CANHaiDd6HPK3ykgunmXFNZMrZ4KbZgEidY5US2L8CTw");

pub const PREFIX: &str = "candy_machine";

pub struct MintAccounts<'b, 'info> {
    pub candy_machine: &'b mut ProgramAccount<'info, CandyMachine>,
    pub config: &'b ProgramAccount<'info, Config>,
    pub payer: &'b AccountInfo<'info>,
    pub wallet: &'b AccountInfo<'info>,
    pub metadata: &'b AccountInfo<'info>,
    pub mint: &'b AccountInfo<'info>,
    pub mint_authority: &'b AccountInfo<'info>,
    pub update_authority: &'b AccountInfo<'info>,
    pub master_edition: &'b AccountInfo<'info>,
    pub token_metadata_program: &'b AccountInfo<'info>,
    pub token_program: &'b AccountInfo<'info>,
    pub system_program: &'b AccountInfo<'info>,
    pub rent: &'b Sysvar<'info, Rent>,
    pub clock: &'b Sysvar<'info, Clock>,
}

fn mint<'b, 'info>(offsets_amount: u64, ctx: MintAccounts<'b, 'info>) -> ProgramResult {
    let candy_machine = ctx.candy_machine;
    let config = ctx.config;
    let clock = ctx.clock;
    let mut localtest = false;

    match candy_machine.data.go_live_date {
        None => {
            if *ctx.payer.key != candy_machine.authority {
                return Err(ErrorCode::CandyMachineNotLiveYet.into());
            }
        }
        Some(val) => {
            if clock.unix_timestamp < val {
                if *ctx.payer.key != candy_machine.authority {
                    return Err(ErrorCode::CandyMachineNotLiveYet.into());
                }
            }
            if val == 0 {
                localtest = true;
            }
        }
    }

    let mut nft_level = None;
    for i in 0..candy_machine.data.items_by_level.len() {
        msg!(
            "offsets_amount:{}, price:{}",
            offsets_amount,
            candy_machine.data.items_by_level[i].price
        );
        if offsets_amount >= candy_machine.data.items_by_level[i].price {
            if candy_machine.items_redeemed_by_level[i]
                < candy_machine.data.items_by_level[i].items_available
            {
                // found one nft > amount threshold
                nft_level = Some(i);
                msg!("found at {}", i);
                break;
            }
        }
    }

    if nft_level.is_none() {
        return Err(ErrorCode::CandyMachineEmpty.into());
    }

    // No lamport transfert
    // NFT are given against some co2 offset
    candy_machine.items_redeemed_by_level[nft_level.unwrap()] = candy_machine
        .items_redeemed_by_level[nft_level.unwrap()]
    .checked_add(1)
    .ok_or(ErrorCode::NumericalOverflowError)?;

    // Skip metadata / masteredition call on localnet
    // Flag localnet with go_live_date = 0 ?!??

    if !localtest {
        let config_line = get_config_line(
            &config.to_account_info(),
            candy_machine.items_redeemed as usize,
        )?;

        let config_key = config.key();
        let authority_seeds = [
            PREFIX.as_bytes(),
            config_key.as_ref(),
            candy_machine.data.uuid.as_bytes(),
            &[candy_machine.bump],
        ];

        let mut creators: Vec<spl_token_metadata::state::Creator> =
            vec![spl_token_metadata::state::Creator {
                address: candy_machine.key(),
                verified: true,
                share: 0,
            }];

        for c in &config.data.creators {
            creators.push(spl_token_metadata::state::Creator {
                address: c.address,
                verified: false,
                share: c.share,
            });
        }

        let metadata_infos = vec![
            ctx.metadata.clone(),
            ctx.mint.clone(),
            ctx.mint_authority.clone(),
            ctx.payer.clone(),
            ctx.token_metadata_program.clone(),
            ctx.token_program.clone(),
            ctx.system_program.clone(),
            ctx.rent.to_account_info().clone(),
            candy_machine.to_account_info().clone(),
        ];

        let master_edition_infos = vec![
            ctx.master_edition.clone(),
            ctx.mint.clone(),
            ctx.mint_authority.clone(),
            ctx.payer.clone(),
            ctx.metadata.clone(),
            ctx.token_metadata_program.clone(),
            ctx.token_program.clone(),
            ctx.system_program.clone(),
            ctx.rent.to_account_info().clone(),
            candy_machine.to_account_info().clone(),
        ];

        invoke_signed(
            &create_metadata_accounts(
                *ctx.token_metadata_program.key,
                *ctx.metadata.key,
                *ctx.mint.key,
                *ctx.mint_authority.key,
                *ctx.payer.key,
                candy_machine.key(),
                config_line.name,
                config.data.symbol.clone(),
                config_line.uri,
                Some(creators),
                config.data.seller_fee_basis_points,
                false,
                config.data.is_mutable,
            ),
            metadata_infos.as_slice(),
            &[&authority_seeds],
        )?;

        invoke_signed(
            &create_master_edition(
                *ctx.token_metadata_program.key,
                *ctx.master_edition.key,
                *ctx.mint.key,
                candy_machine.key(),
                *ctx.mint_authority.key,
                *ctx.metadata.key,
                *ctx.payer.key,
                Some(config.data.max_supply),
            ),
            master_edition_infos.as_slice(),
            &[&authority_seeds],
        )?;

        let mut new_update_authority = Some(candy_machine.authority);

        if !ctx.config.data.retain_authority {
            new_update_authority = Some(ctx.update_authority.key());
        }

        invoke_signed(
            &update_metadata_accounts(
                *ctx.token_metadata_program.key,
                *ctx.metadata.key,
                candy_machine.key(),
                new_update_authority,
                None,
                Some(true),
            ),
            &[
                ctx.token_metadata_program.clone(),
                ctx.metadata.clone(),
                candy_machine.to_account_info().clone(),
            ],
            &[&authority_seeds],
        )?;
    }

    Ok(())
}

#[program]
pub mod candy_machine {

    use super::*;

    pub fn mint_nft<'info>(
        ctx: Context<'_, '_, '_, 'info, MintNFT<'info>>,
        offsets_amount: u64,
    ) -> ProgramResult {
        let context = MintAccounts {
            candy_machine: &mut ctx.accounts.candy_machine,
            config: &ctx.accounts.config,
            payer: &ctx.accounts.payer,
            wallet: &ctx.accounts.wallet,
            metadata: &ctx.accounts.metadata,
            mint: &ctx.accounts.mint,
            mint_authority: &ctx.accounts.mint_authority,
            update_authority: &ctx.accounts.update_authority,
            master_edition: &ctx.accounts.master_edition,
            token_metadata_program: &ctx.accounts.token_metadata_program,
            token_program: &ctx.accounts.token_program,
            system_program: &ctx.accounts.system_program,
            rent: &ctx.accounts.rent,
            clock: &ctx.accounts.clock,
        };

        mint(offsets_amount, context)?;

        Ok(())
    }

    pub fn update_candy_machine(
        ctx: Context<UpdateCandyMachine>,
        _price: Option<u64>,
        go_live_date: Option<i64>,
    ) -> ProgramResult {
        let candy_machine = &mut ctx.accounts.candy_machine;

        // TODO
        // if let Some(p) = price {
        //     candy_machine.data.price = p;
        // }

        if let Some(go_l) = go_live_date {
            msg!("Go live date changed to {}", go_l);
            candy_machine.data.go_live_date = Some(go_l)
        }
        Ok(())
    }

    pub fn mint_one<'info>(
        ctx: Context<'_, '_, '_, 'info, MintOne<'info>>,
        offsets_amount: u64,
    ) -> ProgramResult {

        let candy_machine = &ctx.accounts.candy_machine;

        // If offset amount less than min price, return without minting
        if offsets_amount
            < candy_machine.data.items_by_level[candy_machine.data.items_by_level.len() - 1].price
        {
            return Ok(());
        }

        
        msg!("Create Mint account");
        invoke(
            &system_instruction::create_account(
                ctx.accounts.payer.key,
                ctx.accounts.mint.key,
                ctx.accounts.rent.minimum_balance(Mint::LEN),
                Mint::LEN as u64,
                &spl_token::id(),
            ),
            &[ctx.accounts.payer.clone(), ctx.accounts.mint.clone()],
        )?;

        msg!("Initialize Mint");
        invoke(
            &spl_token::instruction::initialize_mint(
                &spl_token::id(),
                ctx.accounts.mint.key,
                ctx.accounts.payer.key,
                Some(ctx.accounts.payer.key),
                0,
            )?,
            &[
                ctx.accounts.token_program.clone(),
                ctx.accounts.mint.clone(),
                ctx.accounts.rent.to_account_info(),
            ],
        )?;

        msg!("Create associated token");
        invoke(
            &spl_associated_token_account::create_associated_token_account(
                &ctx.accounts.payer.key,
                &ctx.accounts.payer.key,
                &ctx.accounts.mint.key,
            ),
            &[
                ctx.accounts.payer.clone(),
                ctx.accounts.associated_token.clone(),
                ctx.accounts.payer.clone(),
                ctx.accounts.mint.clone(),
                ctx.accounts.system_program.clone(),
                ctx.accounts.token_program.clone(),
                ctx.accounts.rent.to_account_info(),
                ctx.accounts.ata_program.to_account_info(),
            ],
        )?;

        invoke(
            &spl_token::instruction::mint_to(
                &spl_token::id(),
                &ctx.accounts.mint.key,
                &ctx.accounts.associated_token.key,
                &ctx.accounts.payer.key,
                &[],
                1,
            )?,
            &[
                ctx.accounts.mint.clone(),
                ctx.accounts.associated_token.clone(),
                ctx.accounts.payer.clone(),
            ],
        )?;

        let context = MintAccounts {
            candy_machine: &mut ctx.accounts.candy_machine,
            config: &ctx.accounts.config,
            payer: &ctx.accounts.payer,
            wallet: &ctx.accounts.wallet,
            metadata: &ctx.accounts.metadata,
            mint: &ctx.accounts.mint,
            mint_authority: &ctx.accounts.payer,
            update_authority: &ctx.accounts.payer,
            master_edition: &ctx.accounts.master_edition,
            token_metadata_program: &ctx.accounts.token_metadata_program,
            token_program: &ctx.accounts.token_program,
            system_program: &ctx.accounts.system_program,
            rent: &ctx.accounts.rent,
            clock: &ctx.accounts.clock,
        };

        mint(offsets_amount, context)?;

        Ok(())
    }

    pub fn ping(ctx: Context<Ping>, test: u8) -> ProgramResult {
        let candy_machine = &ctx.accounts.candy_machine;
        msg!(
            "Ping candy_machine {}. Test {}",
            candy_machine.data.uuid,
            test
        );

        Ok(())
    }

    pub fn initialize_config(ctx: Context<InitializeConfig>, data: ConfigData) -> ProgramResult {
        let config_info = &mut ctx.accounts.config;
        if data.uuid.len() != 6 {
            return Err(ErrorCode::UuidMustBeExactly6Length.into());
        }

        let mut config = Config {
            data,
            authority: *ctx.accounts.authority.key,
        };

        let mut array_of_zeroes = vec![];
        while array_of_zeroes.len() < MAX_SYMBOL_LENGTH - config.data.symbol.len() {
            array_of_zeroes.push(0u8);
        }
        let new_symbol =
            config.data.symbol.clone() + std::str::from_utf8(&array_of_zeroes).unwrap();
        config.data.symbol = new_symbol;

        // - 1 because we are going to be a creator
        if config.data.creators.len() > MAX_CREATOR_LIMIT - 1 {
            return Err(ErrorCode::TooManyCreators.into());
        }

        let mut new_data = Config::discriminator().try_to_vec().unwrap();
        new_data.append(&mut config.try_to_vec().unwrap());
        let mut data = config_info.data.borrow_mut();
        // god forgive me couldnt think of better way to deal with this
        for i in 0..new_data.len() {
            data[i] = new_data[i];
        }

        let vec_start =
            CONFIG_ARRAY_START + 4 + (config.data.max_number_of_lines as usize) * CONFIG_LINE_SIZE;
        let as_bytes = (config
            .data
            .max_number_of_lines
            .checked_div(8)
            .ok_or(ErrorCode::NumericalOverflowError)? as u32)
            .to_le_bytes();
        for i in 0..4 {
            data[vec_start + i] = as_bytes[i]
        }

        Ok(())
    }

    pub fn add_config_lines(
        ctx: Context<AddConfigLines>,
        index: u32,
        config_lines: Vec<ConfigLine>,
    ) -> ProgramResult {
        let config = &mut ctx.accounts.config;
        let account = config.to_account_info();
        let current_count = get_config_count(&account.data.borrow())?;
        let mut data = account.data.borrow_mut();

        let mut fixed_config_lines = vec![];

        if index > config.data.max_number_of_lines - 1 {
            return Err(ErrorCode::IndexGreaterThanLength.into());
        }

        for line in &config_lines {
            let mut array_of_zeroes = vec![];
            while array_of_zeroes.len() < MAX_NAME_LENGTH - line.name.len() {
                array_of_zeroes.push(0u8);
            }
            let name = line.name.clone() + std::str::from_utf8(&array_of_zeroes).unwrap();

            let mut array_of_zeroes = vec![];
            while array_of_zeroes.len() < MAX_URI_LENGTH - line.uri.len() {
                array_of_zeroes.push(0u8);
            }
            let uri = line.uri.clone() + std::str::from_utf8(&array_of_zeroes).unwrap();
            fixed_config_lines.push(ConfigLine { name, uri })
        }

        let as_vec = fixed_config_lines.try_to_vec()?;
        // remove unneeded u32 because we're just gonna edit the u32 at the front
        let serialized: &[u8] = &as_vec.as_slice()[4..];

        let position = CONFIG_ARRAY_START + 4 + (index as usize) * CONFIG_LINE_SIZE;

        let array_slice: &mut [u8] =
            &mut data[position..position + fixed_config_lines.len() * CONFIG_LINE_SIZE];
        array_slice.copy_from_slice(serialized);

        let bit_mask_vec_start = CONFIG_ARRAY_START
            + 4
            + (config.data.max_number_of_lines as usize) * CONFIG_LINE_SIZE
            + 4;

        let mut new_count = current_count;
        for i in 0..fixed_config_lines.len() {
            let position = (index as usize)
                .checked_add(i)
                .ok_or(ErrorCode::NumericalOverflowError)?;
            let my_position_in_vec = bit_mask_vec_start
                + position
                    .checked_div(8)
                    .ok_or(ErrorCode::NumericalOverflowError)?;
            let position_from_right = 7 - position
                .checked_rem(8)
                .ok_or(ErrorCode::NumericalOverflowError)?;
            let mask = u8::pow(2, position_from_right as u32);

            let old_value_in_vec = data[my_position_in_vec];
            data[my_position_in_vec] = data[my_position_in_vec] | mask;

            if old_value_in_vec != data[my_position_in_vec] {
                msg!("Increasing count");
                new_count = new_count
                    .checked_add(1)
                    .ok_or(ErrorCode::NumericalOverflowError)?;
            }
        }

        // plug in new count.
        data[CONFIG_ARRAY_START..CONFIG_ARRAY_START + 4]
            .copy_from_slice(&(new_count as u32).to_le_bytes());

        Ok(())
    }

    pub fn initialize_candy_machine(
        ctx: Context<InitializeCandyMachine>,
        bump: u8,
        data: CandyMachineData,
    ) -> ProgramResult {
        let candy_machine = &mut ctx.accounts.candy_machine;

        if data.uuid.len() != 6 {
            return Err(ErrorCode::UuidMustBeExactly6Length.into());
        }
        candy_machine.data = data;
        candy_machine.wallet = *ctx.accounts.wallet.key;
        candy_machine.authority = *ctx.accounts.authority.key;
        candy_machine.config = ctx.accounts.config.key();
        candy_machine.bump = bump;
        candy_machine.items_redeemed_by_level = vec![0; candy_machine.data.items_by_level.len()];

        let mut total_items = 0;
        for i in &candy_machine.data.items_by_level {
            total_items = total_items + i.items_available;
        }

        if get_config_count(&ctx.accounts.config.to_account_info().data.borrow())?
            < total_items as usize
        {
            return Err(ErrorCode::ConfigLineMismatch.into());
        }

        let _config_line = match get_config_line(&ctx.accounts.config.to_account_info(), 0) {
            Ok(val) => val,
            Err(_) => return Err(ErrorCode::ConfigMustHaveAtleastOneEntry.into()),
        };

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8, data: CandyMachineData)]
pub struct InitializeCandyMachine<'info> {
    #[account(init, seeds=[PREFIX.as_bytes(), config.key().as_ref(), data.uuid.as_bytes()], payer=payer, bump=bump, space=CANDY_MACHINE_SIZE)]
    candy_machine: ProgramAccount<'info, CandyMachine>,
    #[account(constraint= wallet.owner == &spl_token::id() || (wallet.data_is_empty() && wallet.lamports() > 0) )]
    wallet: AccountInfo<'info>,
    #[account(has_one=authority)]
    config: ProgramAccount<'info, Config>,
    #[account(signer, constraint= authority.data_is_empty() && authority.lamports() > 0)]
    authority: AccountInfo<'info>,
    #[account(mut, signer)]
    payer: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    system_program: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(data: ConfigData)]
pub struct InitializeConfig<'info> {
    #[account(mut, constraint= config.to_account_info().owner == program_id && config.to_account_info().data_len() >= CONFIG_ARRAY_START+4+(data.max_number_of_lines as usize)*CONFIG_LINE_SIZE + 4 + (data.max_number_of_lines.checked_div(8).ok_or(ErrorCode::NumericalOverflowError)? as usize))]
    config: AccountInfo<'info>,
    #[account(constraint= authority.data_is_empty() && authority.lamports() > 0 )]
    authority: AccountInfo<'info>,
    #[account(mut, signer)]
    payer: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct AddConfigLines<'info> {
    #[account(mut, has_one = authority)]
    config: ProgramAccount<'info, Config>,
    #[account(signer)]
    authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    config: ProgramAccount<'info, Config>,
    #[account(
        mut,
        has_one = config,
        has_one = wallet,
        seeds = [PREFIX.as_bytes(), config.key().as_ref(), candy_machine.data.uuid.as_bytes()],
        bump = candy_machine.bump,
    )]
    candy_machine: ProgramAccount<'info, CandyMachine>,
    #[account(mut, signer)]
    payer: AccountInfo<'info>,
    #[account(mut)]
    wallet: AccountInfo<'info>,
    // With the following accounts we aren't using anchor macros because they are CPI'd
    // through to token-metadata which will do all the validations we need on them.
    #[account(mut)]
    metadata: AccountInfo<'info>,
    #[account(mut)]
    mint: AccountInfo<'info>,
    #[account(signer)]
    mint_authority: AccountInfo<'info>,
    #[account(signer)]
    update_authority: AccountInfo<'info>,
    #[account(mut)]
    master_edition: AccountInfo<'info>,
    #[account(address = spl_token_metadata::id())]
    token_metadata_program: AccountInfo<'info>,
    #[account(address = spl_token::id())]
    token_program: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    system_program: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
    clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct UpdateCandyMachine<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [PREFIX.as_bytes(), candy_machine.config.key().as_ref(), candy_machine.data.uuid.as_bytes()],
        bump = candy_machine.bump
    )]
    candy_machine: ProgramAccount<'info, CandyMachine>,
    #[account(signer)]
    authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct MintOne<'info> {
    pub config: ProgramAccount<'info, Config>,
    #[account(
        mut,
        has_one = config,
        has_one = wallet,
        seeds = [PREFIX.as_bytes(), config.key().as_ref(), candy_machine.data.uuid.as_bytes()],
        bump = candy_machine.bump,
    )]
    pub candy_machine: ProgramAccount<'info, CandyMachine>,
    #[account(mut, signer)]
    pub payer: AccountInfo<'info>,
    #[account(mut)]
    pub wallet: AccountInfo<'info>,
    #[account(mut)]
    pub associated_token: AccountInfo<'info>,
    #[account(mut)]
    pub metadata: AccountInfo<'info>,
    #[account(mut, signer)]
    pub mint: AccountInfo<'info>,
    #[account(mut)]
    pub master_edition: AccountInfo<'info>,
    #[account(address = spl_token_metadata::id())]
    pub token_metadata_program: AccountInfo<'info>,
    #[account(address = spl_associated_token_account::id())]
    pub ata_program: AccountInfo<'info>,
    #[account(address = spl_token::id())]
    pub token_program: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct Ping<'info> {
    #[account()]
    pub candy_machine: ProgramAccount<'info, CandyMachine>,
    // #[account(signer)]
    // pub authority: AccountInfo<'info>,
}

#[account]
#[derive(Default)]
pub struct CandyMachine {
    pub authority: Pubkey,
    pub wallet: Pubkey,
    pub config: Pubkey,
    pub data: CandyMachineData,
    pub items_redeemed: u64,
    pub items_redeemed_by_level: Vec<u64>,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct CandyMachineData {
    pub uuid: String,
    pub items_by_level: Vec<Level>,
    pub go_live_date: Option<i64>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct Level {
    pub price: u64,
    pub items_available: u64,
}

pub const MAX_LEVELS: usize = 9;
pub const CANDY_MACHINE_SIZE: usize =
    8 + 32 + 32 + 32 + 8 + 1 + 6 + MAX_LEVELS * (8) + MAX_LEVELS * (8 + 8) + 8 + 200;
// pub const CANDY_MACHINE_SIZE: usize = 8+32+32+33+32+64+64+64+200;

pub const CONFIG_ARRAY_START: usize = 32 + // authority
4 + 6 + // uuid + u32 len
4 + MAX_SYMBOL_LENGTH + // u32 len + symbol
2 + // seller fee basis points
1 + 4 + MAX_CREATOR_LIMIT*MAX_CREATOR_LEN + // optional + u32 len + actual vec
8 + //max supply
1 + // is mutable
1 + // retain authority
4; // max number of lines;

#[account]
#[derive(Default)]
pub struct Config {
    pub authority: Pubkey,
    pub data: ConfigData,
    // there's a borsh vec u32 denoting how many actual lines of data there are currently (eventually equals max number of lines)
    // There is actually lines and lines of data after this but we explicitly never want them deserialized.
    // here there is a borsh vec u32 indicating number of bytes in bitmask array.
    // here there is a number of bytes equal to ceil(max_number_of_lines/8) and it is a bit mask used to figure out when to increment borsh vec u32
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct ConfigData {
    pub uuid: String,
    pub symbol: String,               // The symbol for the asset
    pub seller_fee_basis_points: u16, // Royalty basis points that goes to creators in secondary sales (0-10000)
    pub creators: Vec<Creator>,
    pub max_supply: u64,
    pub is_mutable: bool,
    pub retain_authority: bool,
    pub max_number_of_lines: u32,
}

pub fn get_config_count(data: &Ref<&mut [u8]>) -> core::result::Result<usize, ProgramError> {
    return Ok(u32::from_le_bytes(*array_ref![data, CONFIG_ARRAY_START, 4]) as usize);
}

pub fn get_config_line(
    a: &AccountInfo,
    index: usize,
) -> core::result::Result<ConfigLine, ProgramError> {
    let arr = a.data.borrow();

    let total = get_config_count(&arr)?;
    if index > total {
        return Err(ErrorCode::IndexGreaterThanLength.into());
    }
    let data_array = &arr[CONFIG_ARRAY_START + 4 + index * (CONFIG_LINE_SIZE)
        ..CONFIG_ARRAY_START + 4 + (index + 1) * (CONFIG_LINE_SIZE)];

    let config_line: ConfigLine = ConfigLine::try_from_slice(data_array)?;

    Ok(config_line)
}

pub const CONFIG_LINE_SIZE: usize = 4 + MAX_NAME_LENGTH + 4 + MAX_URI_LENGTH;
#[derive(AnchorSerialize, AnchorDeserialize, Debug)]
pub struct ConfigLine {
    /// The name of the asset
    pub name: String,
    /// URI pointing to JSON representing the asset
    pub uri: String,
}

// Unfortunate duplication of token metadata so that IDL picks it up.

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Creator {
    pub address: Pubkey,
    pub verified: bool,
    pub share: u8, // In percentages, NOT basis points ;) Watch out!
}

#[error]
pub enum ErrorCode {
    #[msg("Account does not have correct owner!")]
    IncorrectOwner,
    #[msg("Account is not initialized!")]
    Uninitialized,
    #[msg("Mint Mismatch!")]
    MintMismatch,
    #[msg("Index greater than length!")]
    IndexGreaterThanLength,
    #[msg("Config must have atleast one entry!")]
    ConfigMustHaveAtleastOneEntry,
    #[msg("Numerical overflow error!")]
    NumericalOverflowError,
    #[msg("Can only provide up to 4 creators to candy machine (because candy machine is one)!")]
    TooManyCreators,
    #[msg("Uuid must be exactly of 6 length")]
    UuidMustBeExactly6Length,
    #[msg("Not enough tokens to pay for this minting")]
    NotEnoughTokens,
    #[msg("Not enough SOL to pay for this minting")]
    NotEnoughSOL,
    #[msg("Token transfer failed")]
    TokenTransferFailed,
    #[msg("Candy machine is empty!")]
    CandyMachineEmpty,
    #[msg("Candy machine is not live yet!")]
    CandyMachineNotLiveYet,
    #[msg("Number of config lines must be at least number of items available")]
    ConfigLineMismatch,
}

<template>
  <q-card class="project-card">
    <!-- this can should be dynamic--><q-img
      :src="item?.image"
      style="height: 300px !important"
    >
      <q-badge
        inline
        :label="`$ ${item.price} USD/TONNE`"
        class="price"
        color="#000"
      ></q-badge>
      <!-- <v-fade-transition>
          <v-overlay absolute color="#000">
            <q-btn :to="{ name: 'projects-id', params: { id: 1 } }"
              >See more info</q-btn
            >
          </v-overlay>
        </v-fade-transition> -->
    </q-img>

    <q-card-section>
      <div class="text-h6" v-text="item.name + ' (' + item.number + ')'"></div>
      <div class="text-subtitle2" v-text="item.description"></div>
    </q-card-section>

    <!-- <q-card-actions>
      <q-btn flat>Action 1</q-btn>
      <q-btn flat>Action 2</q-btn>
    </q-card-actions> -->
    <q-card-actions>
      <div class="d-flex justify-content-between align-items-center w-100">
        <q-btn color="primary" class="full-width">{{ label }}</q-btn>
        <q-popup-edit v-model="label">
          <h6 class="mb-1 text-center" v-text="item.name"></h6>
          <q-input
            label="Quantité demandée"
            type="number"
            :max="+item.number"
            v-model="value"
          />
          <div class="my-4">
            <q-input v-model="buyerPk" label="Votre adresse public" />
          </div>
          <q-btn @click="buy" color="black" class="full-width"
            >Lancer la transaction</q-btn
          >
        </q-popup-edit>
      </div>
    </q-card-actions>
    <!-- <q-card-actions v-if="!presentation">
      <div class="d-flex align-center w-100">
        <div class="col-md-3">
          <v-text-field class="my-input" outlined value="1"></v-text-field>
        </div>
        <div class="col-md-9"></div>
      </div>
    </q-card-actions> -->
  </q-card>
</template>

<script lang="ts">
import { IBuyDto, IProject } from "@/IProject";
import { defineComponent, inject, PropType, ref } from "vue";
import { useWallet, initWallet } from "@solana/wallet-adapter-vue";
import { getPhantomWallet, WalletName } from "@solana/wallet-adapter-wallets";
import { AxiosInstance } from "axios";

export default defineComponent({
  props: {
    elevation: {
      type: Number,
      default: 0,
    },
    presentation: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object as PropType<IProject>,
      required: true,
    },
  },
  setup() {
    const axios = inject("axios") as AxiosInstance;

    const label = ref("Acheter");
    const buyerPk = ref("");
    const value = ref(1);

    async function buy() {
      const wallets = [getPhantomWallet()];
      initWallet({ wallets, autoConnect: true });
      const { wallet, select } = useWallet();
      select(WalletName.Phantom);
     
      // console.log(theWallet.wallet);

      const dto: IBuyDto = {
        offsets: value.value,
        buyerPk:  "",
         wallet:null

      };

      try {
        const { data } = await axios.post("/buy", dto);
        console.log("success", data);
      } catch (error) {
        console.log(error);
      }
    }

    return { value, buy, label, buyerPk };
  },
});
</script>

<style lang="scss">
.project-card {
  padding-bottom: 15px;
  .my-input {
    .v-messages,
    .v-text-field__details {
      display: none;
    }

    .v-input__slot {
      margin-bottom: 0 !important;
      min-height: 0 !important;
    }
  }

  .price {
    position: absolute;
    right: 12px;
    top: 13px;

    * {
      height: auto !important;
      font-size: 1em !important;
    }
  }
}
</style>
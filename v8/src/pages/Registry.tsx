import * as React from "react";
// import Navbar from '../components/Navbar'
import { useState } from "react";
import {CMSProps} from "../components/CandyMachineStatus"
import { fetchProjects } from "../api/fetchProjects";
import { useWallet } from "@solana/wallet-adapter-react";
import CM from "../components/CandyMachineStatus";
export default function Registry(props:CMSProps) {
  const wallet = useWallet();
  const [projectList, setProjectList] = useState([]);

  React.useEffect(()=>{
    //@ts-ignore
    fetchProjects(wallet,props.connection).then(p=>setProjectList(p))}
  , [props.connection,wallet]);

  return (
    <>
    
    
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to the registry.</h1>
        <h2>
          Here you can directly purchase your offsets through the projects candy
          machines.
        </h2>
        <p>The more offsets you buy, the rarer the NFT. Good luck! ☘️<br/>
        
          Each project features its own natural wonder, so choose
          wisely!<br/>
        
      🌺🐴🦕🐙🦐🐣🐷🐮🦁🐡🌴🌺</p>
      </div>
      <div>
        <div>
          <br />
          <div>
            
          </div>
          <br />
          <div  style={{backgroundColor:"black", color:"white !important"}}>
            <table
             style={{borderSpacing:"100px"}}
   
    
            >
              <tr>
                
                  <th align="center">Project Name</th>
                  <th align="center">CO2e Available (T)</th>
                  <th align="center">Price (lamports)</th>
                  <th align="center">Account</th>
                  <th align="center">Owner</th>
                  <th align="center">Project Description</th>
                  <th align="center">Picture</th>

                
              </tr>
              
                {projectList? projectList.map((row) => (
                  <tr
                    //@ts-ignore
                    key={row}>
                    
                  
                    <td >
                      {//@ts-ignore
                      row.name}
                    </td>
                    <td align="center">{//@ts-ignore
                    row.number}</td>
                    <td align="center">{//@ts-ignore
                    row.price}</td>
                    {<td align="center">{//@ts-ignore
                    row.address}</td>}
                    {<td align="center">{//@ts-ignore
                    row.owner}</td>}

                    <td align="center">{//@ts-ignore
                    row.description}</td>
                    <td align="center">
                      <img
                        src={//@ts-ignore
                          row.image} alt="project"
                        style={{ width: "200px", height: "250px" }}
                      />
                    </td>
                    <td>
                      <CM {...props}                      />
                    </td>
                  </tr>
                )):<></>}
              
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        ></div>
      </div>
    </>
  );
}
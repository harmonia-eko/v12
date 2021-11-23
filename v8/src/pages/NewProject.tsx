import { Connection} from "@solana/web3.js";
import { useState } from "react";
import { newProject } from "../api/newProject";
import {AnchorWallet} from "@solana/wallet-adapter-react/lib/useAnchorWallet"
import Alert from 'react-bootstrap/Alert';
// import {Form as form} from 'react-bootstrap'
//import Spinner from "react-bootstrap/Spinner"
// import Navbar from '../components/Navbar'
import { useWallet } from "@solana/wallet-adapter-react";

export const NewProject = (props:{wallet:AnchorWallet,connection:Connection})=>{
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage]=useState('')
    const [description, setDescription] = useState("");
    const [aNewProject,setANewProject]=useState(false)
    const wallet = useWallet()
return(<>

<form className='npf' >
              <input
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                
              />
             
              <input type='number'
                placeholder="initial amount"
                

            
                onChange={
                    (e) => setNumber(parseInt(e.target.value))
                }
              />
              <input type="number"
                placeholder="price"
                
                onChange={
                    (e) => setPrice(parseInt(e.target.value))
                }
              /> 
              <textarea
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              
            /><input type="file" placeholder='browse' onChange={(e) => setImage(e.target.value)}/> 



              <button onClick={() =>{
                setANewProject(true)
              newProject(name, number, price,wallet,props.connection,image,description).then(()=>{setANewProject(false);return <Alert variant="success">
              Success! 
            </Alert>}).catch(error =>{
              setANewProject(false)
              alert(error);}
)
          }}>create</button>
          {aNewProject?<p>Please wait</p>:<></>}
            </form></>
)       
}
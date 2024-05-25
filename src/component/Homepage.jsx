
import { useEffect, useState } from "react";
import thumbnail from "../assets/bg1.png";
import axios from "axios";
import { Button, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function Homepage(){
    const [featuredPhone, setFeaturedPhone] =useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    
    useEffect(()=>{
        axios.get(baseUrl+'/featuredphone').then((response)=>{
            // console.log(response.data)
          setFeaturedPhone(response.data.Phones);
        })
    },[])

  
    const navigate = useNavigate();
   
    if(featuredPhone.length===0){
      return <div>
       <center style={{marginTop:'100px'}}>
    <CircularProgress />
    </center>
      </div>
    }
 return<div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
 <img src={thumbnail} style={{ width: '100%', height: 'auto' }} alt="Thumbnail" />
 <Button variant="contained" size="large" style={{ position: 'absolute', left: '64.6%', transform: 'translate(-50%, -50%)', marginTop:'367px',
                                color:'black', backgroundColor:'aliceblue', width:'240px', height:'70px', fontSize:'large', borderRadius:'50px'}}
     onClick={()=>{
      navigate('/product');
     }}>Show Product</Button> 
     <div style={{padding:'3rem 0rem'}}>
      <Typography>
      <center>
      <h1 style={{fontWeight:'100'}}>Featured Phones</h1>
      </center>
      
      </Typography>
        
        <div style={{display:'flex', flexWrap:"wrap", gap:'30px', maxWidth:'80%', margin:'64px 180px'}}>
        {featuredPhone.map(p => <Item name={p.name} price={p.price} image={p.imageLink} id={p._id}></Item>)}
        </div>

        <div>
        <center>
        <Button variant="contained" style={{}} onClick={()=>{
           navigate('/product');
        }}>
               <Typography>ALL PRODUCTS</Typography>
            </Button>
        </center>
            
        </div>
     </div>
     
     <div style={{backgroundColor:"white", margin:'100px 0px'}}>
     <center>
     <Typography>
        <h1 style={{marginTop:'100px', fontWeight:'100'}}>Join our newsletter and get 5% off</h1>
       </Typography>
       <TextField style={{height:'50px', width:'500px'}} id="outlined-basic" label="Enter Your Email" variant="outlined"  required/>
       <Button variant="outlined" style={{color:'black', height:'56px', marginLeft:'7px'}} onClick={()=>{
        toast.success("You're added to the subscription list.")
       }}>Subscribe</Button>
     </center>
       
     </div>
    <ToastContainer/>
     <div style={{backgroundColor:"black", color:"white", height:'80px' }}>
      <center>
        <Typography>
          <h3 style={{paddingTop:'20px'}}>© 2024 Shop𝕏 All rights reserved.</h3>
        </Typography>
      </center>
     </div>
 </div>
}


function Item(props){
   const navigate = useNavigate();
  return <div>

  <CardActionArea onClick={()=>{
       navigate("/product/"+props.id)
    }}>
      <Card variant="outlined">
       <img src={props.image} style={{width:'364px', height:'225px', objectFit:"contain"}}></img>
       
     </Card>
    </CardActionArea>
    <Typography>
    <div style={{display:"flex", justifyContent:"space-between", padding:'0px 2px'}}>
            <h3 style={{fontWeight:'100'}}>{props.name}</h3>
            <h3 style={{fontWeight:'100'}}>₹{props.price}</h3>
        </div>
    </Typography>
    
    
  </div>
  
}
export default Homepage;
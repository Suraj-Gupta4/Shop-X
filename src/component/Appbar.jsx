import { Button,Link, Typography } from "@mui/material";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {useRecoilValue} from 'recoil';
import { updatedNumber } from "../store/selectors/productNumber";
import { cartNumberState } from "../store/atoms/cartNumber";
import {useSetRecoilState} from "recoil";

function Appbar(){
    const navigate= useNavigate();
    const productNumber = useRecoilValue(updatedNumber);
    const setCartNumberState = useSetRecoilState(cartNumberState);
    console.log(productNumber);

    useEffect(()=>{

      const cartNumber= localStorage.getItem('cartNumber');
      console.log("Type of CartNumber : ",typeof(cartNumber) )
      if(cartNumber){
        setCartNumberState({productNumber:parseInt(cartNumber)});
      }
    },[])
return <div>
<div>
  {productNumber >0 && (
    <div style={{width:'20px', height:'20px', position:'fixed', top:'5px', right:'122px', zIndex:'1020', borderRadius:'50%', 
    backgroundColor:'aliceblue', boxSizing:'border-box', paddingLeft:'6px'}}>{productNumber}</div>
  )}
</div>

<div style={{marginBottom:'50px'}}> 
<div style={{backgroundColor:"rgba(176, 196, 222, 1)", color:'black', height:'50px', display:'flex', justifyContent:'space-between', 
             position:'fixed', top:'0', width:'100%', zIndex:'1000'}}>
        <Typography style={{marginLeft:'100px'}}>
        
        <h3 style={{marginTop:'0px', fontFamily:'sans-serif', fontSize:'32px', cursor:'pointer'}}>
        <Link onClick={()=>{navigate('/')}} underline="hover"  style={{color:'black'}}>shop𝕏</Link>
        </h3>
        
            
        </Typography>
        <div style={{marginRight:'100px' , display:'flex'}}>
        
        <Link onClick={()=>{navigate('/product')}} underline="hover" style={{fontSize:"20px", fontFamily:'sans-serif', marginTop:'15px', marginRight:'50px', color:'black', cursor:'pointer'}}>
        Product</Link>
        
        <Link onClick={()=>{navigate('/aboutus')}} underline="hover" style={{fontSize:"20px", fontFamily:'sans-serif', marginTop:'15px', marginRight:'50px', color:'black', cursor:'pointer'}}>
        About us</Link>
        
          <ShoppingCartIcon style={{cursor:"pointer", marginTop:'15px', width:'1.5rem', height:'1.5rem'}} onClick={()=>{
            navigate('/cart');
          }} />
          
          <Link onClick={()=>{navigate('/cart')}} underline="none" style={{fontSize:"15px", fontFamily:'sans-serif', marginTop:'25px', color:'black', cursor:'pointer'}}>
        Cart</Link>
        </div>
        
    </div>
</div>
    
</div>
}

export default Appbar;
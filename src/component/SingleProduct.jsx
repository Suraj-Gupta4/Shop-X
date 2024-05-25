import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartNumberState } from "../store/atoms/cartNumber";
import {useSetRecoilState} from "recoil";
import {loadStripe} from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';

function SingleProduct(){
    const {productId} = useParams();
    const [product, setProduct] = useState('');
    const setCartNumberState = useSetRecoilState(cartNumberState);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const stripePk = import.meta.env.VITE_STRIPE_PK;
    
 useEffect(()=>{

  axios.get(baseUrl+"/product/"+productId).then((response)=>{
    // console.log(response.data);
    setProduct(response.data.prod);
   
  })
 }, [])


 // Payment Integration
 const makePayment = async() =>{
  const stripe = await loadStripe(stripePk);

  var prodInfo =[]
  
    prodInfo.push( {
      productName:product.name,
      productPrice:product.price,
      productQuantity:1
    })
  

  // console.log("ProdInfo: ", prodInfo);

  const body = {
    products: prodInfo
  }
  
  // console.log("Body : ", body);

  
 
   axios.post(baseUrl+"/create-checkout-session",
  body
  ,{
    headers:{
        "Content-Type":"application/json"
    }
}).then((response)=>{
    // console.log(response.data);
    
    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })
})
  
  
}


if(product.length===0){
  return <div>
    <center style={{marginTop:'100px'}}>
    <CircularProgress />
    </center>
  </div>
}

 return <div style={{display:'flex', marginTop:'100px'}}>
       <div style={{marginLeft:'200px', display:'flex'}}>
         <img src={product.imageLink} style={{height:'500px'}}></img> 
         <div style={{height:"500px", width:'2px', backgroundColor:'slategrey', marginRight:'25px', marginLeft:'20px'}}></div>
       </div>
       
       <div style={{width:'auto'}}>
       <Typography>
          <h1  style={{ fontWeight:100}}>{product.name}</h1>
          <h2 style={{ fontWeight:100, width:'600px', fontSize:'20px'}}>{product.description}</h2>
          <div style={{width:'600px', height:'2px', backgroundColor:'slategrey'}}></div>
          <h1 style={{ fontWeight:100}}><span style={{fontSize:15, color:'slategrey'}}>M.R.P:<s>{" ₹"+ ((product.price*120)/100)}</s></span>{"  ₹"+product.price}</h1>
       </Typography>
         
          <div >
            <Button variant='contained' style={{marginRight:'20px'}}
            onClick={()=>{
             axios.get(baseUrl+'/product/addtocart/'+productId).then((response)=>{
              // console.log(response.data);
              localStorage.setItem('cartNumber', response.data.itemCount);
             
              setCartNumberState({productNumber:response.data.itemCount});
              // console.log("cartItems:",response.data.itemCount);
              // console.log(typeof(response.data.itemCount));
             })
             
             toast.success("Added to cart!", {
              position: "top-center"
             });
            }}>Add to Cart</Button>
            
            <Button variant="contained" onClick={makePayment}>Buy now</Button>
          </div>
          
       </div>
       <ToastContainer />
 </div>
}

export default SingleProduct;
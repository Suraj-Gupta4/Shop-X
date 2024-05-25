import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { cartNumberState } from "../store/atoms/cartNumber";
import {useSetRecoilState} from "recoil";
import {loadStripe} from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';

function Cart(){
  
    const [item, setItem] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [open, setOpen] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const stripePk = import.meta.env.VITE_STRIPE_PK;

    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(()=>{
      axios.get(baseUrl+'/cart').then((response)=>{
        // console.log(response.data);
        setItem(response.data.cart);
        
        setTotalCost(response.data.total);
        
      })
      
    },[])

    useEffect(() => {
      // Simulate an API call to check if the cart is empty
      setTimeout(() => {
        // Check if the cart is empty
        if (item.length === 0) {
          setIsEmpty(true);
        }
        setIsLoading(false);
      }, 2000);
    }, []);
  
    if (isLoading) {
      return <div>
        <center style={{marginTop:'100px'}}>
    <CircularProgress />
    </center>
      </div>;
    }
  
    if (isEmpty && item.length===0) {
      return <div><h1 style={{ margin: '110px 669px' }}>Cart is empty!</h1></div>;
    }
    
   
    // Payment Integration
    const makePayment = async() =>{
      const stripe = await loadStripe(stripePk);

      var prodInfo =[]
      item.map((product)=>{
        prodInfo.push( {
          productName:product.addedProduct[0].name,
          productPrice:product.addedProduct[0].price,
          productQuantity:product.totalQuantity
        })
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

return <div>
   
    <Typography>
        <h1 style={{backgroundColor:'white', marginTop:'60px', fontWeight:100}}><center>CART<span>🛒</span></center></h1>
        {item.map((i)=> <Item name={i.addedProduct[0].name} price={i.addedProduct[0].price} image={i.addedProduct[0].imageLink} desc={i.addedProduct[0].description} 
        quantity={i.totalQuantity} totalprice={i.totalPrice} productId = {i._id} setItem={setItem} setTotalCost={setTotalCost} ></Item>)}
        <div style={{height:'2px', backgroundColor:'#bcccdc', marginLeft:'150px', maxWidth:'80vw'}}></div>
        
        <Card variant='outlined' style={{width:'27vw', marginLeft:'63%', marginTop:'2%', marginBottom:'2%'}}>
        <Typography>
        <h2 style={{color:'grey', paddingLeft:'27%'}}>PRICE DETAILS</h2>
        <div style={{padding:'0px 20px'}}>
        <div style={{display:'flex', justifyContent:'space-between' }}>
        <h3>Item(s) Price :</h3>
          <span style={{paddingTop:'20px'}}>₹{totalCost}</span>
         </div>
          
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <h3>Shipping :</h3>
          <span style={{paddingTop:'20px'}}>₹<s>40</s> Free</span>
          </div>
          
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <h1>Total Amount :</h1>
          <span style={{paddingTop:'25px', fontSize:'xx-large'}}>₹{totalCost}</span>
          </div>
        </div>
        
          
        </Typography>
          
          <Button variant='contained'   style={{marginLeft:'20px', marginBottom:'10px'}}  onClick={makePayment}>Place Order</Button>
          <Dialog
        open={open}
        onClose={handleClose}>
         
          <DialogTitle>
          Order Confirmation
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText style={{color:'green'}}>
            Your order has been successfully placed.
          </DialogContentText>
        </DialogContent>
       
        </Dialog>
       
        </Card>
    </Typography>
  
 </div>
}

function Item(props){
  const setCartNumberState = useSetRecoilState(cartNumberState);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
    return <div style={{maxWidth:'80vw', marginLeft:'150px'}}>
      <div style={{height:'2px', backgroundColor:'#bcccdc'}}></div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <div style={{display:'flex'}}>
      <img src={props.image} style={{height:'100px', width:'100px', margin:'10px 30px'}}></img>
      <div style={{paddingBottom:'10px'}}>
      <h3>{props.name}</h3>
      
      <div style={{display:'flex', gap:'25px'}}>
      <div style={{border:'1px solid black', padding:'5px', borderRadius:'5px', width:'170px', display:'flex', justifyContent:'space-between'}}>
      <Button variant='outlined' style={{height:'25px', padding:'2px', minWidth:'50px'}} 
      onClick={()=>{
        axios.post(baseUrl+"/increaseitem",{
          productId: props.productId
        },{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((response)=>{
          // console.log(response.data);
          props.setItem(response.data.cart);
          props.setTotalCost(response.data.total);
        })
      }}>
      
      <AddIcon  style={{ height:'17px', width:'17px'}}/>
      
      </Button>

      <span style={{margin:'0px'}}>{"Qty: "+props.quantity}</span>
      
      <Button variant='outlined'  
      style={{height:'25px', padding:'2px', minWidth:'50px'}}
      onClick={()=>{
        if(props.quantity>1)
        {
          axios.post(baseUrl+"/decreaseitem",{
          productId: props.productId
        },{
          headers:{
            "Content-Type":"application/json"
          }
        }).then((response)=>{
          // console.log(response.data);
          props.setItem(response.data.cart);
          props.setTotalCost(response.data.total);
        })
        }
       
      }}> 
     
      <RemoveIcon  style={{ height:'17px', width:'17px'}}/>
      
      </Button>
      </div>

      <Button variant='outlined' 
        style={{color:'black'}}
       onClick={()=>{
        axios.delete(baseUrl+"/delete/" + props.productId).then((response)=>{
          // console.log(response.data);
          props.setItem(response.data.cart);
          props.setTotalCost(response.data.total);
          setCartNumberState({productNumber:response.data.itemCount});
          localStorage.setItem('cartNumber', response.data.itemCount);
        })
      }}>Remove</Button>
      </div>
      
      </div> 
      </div>
      
      
      <div style={{display:'flex'}}> 
     
     <h2 style={{margin:'10px 0px'}}>
        price
     <span style={{fontSize:'14px', marginLeft:'5px'}}>(one item)</span>
     </h2>
      <h3 style={{marginLeft:'-100px', marginTop:'65.5px', color:'grey'}}>₹{props.price}</h3></div>
       
       <div>
       <h2 style={{margin:'10px 0px'}}>total price</h2>
      <h3 style={{color:'grey'}}>{props.quantity} * ₹{props.price} : ₹{props.totalprice}</h3>
       </div>
      
      </div>
      
      
    </div>
}
export default Cart;
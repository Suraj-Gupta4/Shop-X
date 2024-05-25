import {  useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Success() {
    const navigate= useNavigate();
    return <div >
       <center style={{marginTop:'100'}}>
       <h1>Order Confirmation</h1>
        <h2 style={{color:'green'}}>Your order has been successfully placed.</h2>
        <Button onClick={()=>{navigate('/')}} variant="outlined">Go to homepage</Button>
       </center>
        
    </div>
}

export default Success;
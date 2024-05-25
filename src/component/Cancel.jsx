import {  useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Cancel() {
    const navigate= useNavigate();
    return <div>
       <center style={{marginTop:'100'}}>
       <h1>Order Confirmation</h1>
        <h2 style={{color:'green'}}>Your order has been cancelled. Please order again.</h2>
        <Button onClick={()=>{navigate('/')}} variant="outlined">Go to homepage</Button>
       </center>
    </div>
}

export default Cancel;
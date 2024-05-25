import { Button, Card, Typography } from "@mui/material";

function AboutUS(){
    return <div>
    <center style={{marginTop:'60px'}}>
      <Typography style={{backgroundColor:'white'}}>
        <h1 style={{fontWeight:100}}>ABOUT US</h1>
      </Typography>
    </center>
       <Card variant="outlined"  style={{margin:'0px 50px', marginTop:'30px'}}>
       <Typography style={{ padding:'40px', fontFamily:'sans-serif', color:'grey', fontSize:'20px'}}>
          <h3>
          Welcome to shop𝕏, your one-stop destination for all your mobile phone needs! 
          At shop𝕏, we're passionate about providing our customers with the best shopping experience 
          when it comes to purchasing mobile phones. With a wide selection of the latest models from all the top brands, 
          including Apple, Samsung, Xiaomi, OnePlus, and more, we aim to cater to every mobile enthusiast's preferences.
          </h3>
          <h3>
          Our mission is to offer a seamless and hassle-free shopping experience, where you can browse through an extensive 
          collection of smartphones, compare features and prices, and make informed purchasing decisions. Whether you're looking 
          for the latest flagship device with cutting-edge technology or a budget-friendly option without compromising on quality, 
          shop𝕏 has something for everyone.
          </h3>

          <h3>
          Thank you for choosing shop𝕏 as your trusted mobile phone retailer. We look forward to serving you and being a 
          part of your mobile technology journey!
          </h3>
       </Typography>
       </Card>
       
    </div>
}

export default AboutUS
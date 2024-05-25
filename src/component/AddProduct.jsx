import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import axios from "axios";

function AddProduct(){
    const [ProductName, setProductName] = useState('');
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductImage, setProductImage] = useState('');
    const [ProductDescription, setProductDescription ] = useState('');
    const [ProductBrand, setProductBrand] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return <div>
       
       <center>
       <Card variant="outlined" style={{width: 400, padding:20, margin:'100px 0px 50px 0px'}}>
       <h1>Add Products</h1>
      <TextField 
      fullWidth = "true"
      label="ProductName" 
      variant="outlined" 
      onChange={e => setProductName(e.target.value)} 
      />
      
      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="ProductPrice" 
       variant="outlined" 
       onChange={e => setProductPrice(e.target.value)}
       />

      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="ProductImage" 
       variant="outlined" 
       onChange={e => setProductImage(e.target.value)}
       />

       <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="ProductDescription" 
       variant="outlined" 
       onChange={e => setProductDescription(e.target.value)}
       />

       <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="ProductBrand" 
       variant="outlined" 
       onChange={e => setProductBrand(e.target.value)}
       />   

       </Card>

       <Button variant='contained' 
       onClick={()=>{
            axios.post(baseUrl+"/createProduct",{
                name:ProductName,
                price:ProductPrice,
                imageLink:ProductImage,
                description:ProductDescription,
                brand:ProductBrand
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((response)=>{
                console.log(response.data);
                alert("Product added");
            })
        }}>Add Product</Button>
       </center>   
     

        
    </div>
}


export default AddProduct;
import { useEffect, useState } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import { Button, CardActionArea, FormControlLabel, FormGroup, Grid, Link, Radio, RadioGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Products(){
    const [products, setProducts] = useState([]);
    const [targetPrice, setTargetPrice] = useState(200000);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(8);
    const [brand, setBrand]= useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(()=>{
      axios.get(baseUrl+"/product").then((response)=>{
        // console.log(response.data);
        setProducts(response.data.products);
      })
    }, [])
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFisrtRecord = indexOfLastRecord - recordsPerPage; 
    const nPage = Math.ceil(products.length / recordsPerPage);
    const currentItem = products.slice(indexOfFisrtRecord, indexOfLastRecord);

    const updatePageNum = (event, value)=>{
      setCurrentPage(value);
    }

    if(products.length===0){
      return <div>
        <center style={{marginTop:'100px'}}>
    <CircularProgress />
    </center>
      </div>
    }

    return <div>
    <center style={{marginTop:'60px'}}>
      <Typography style={{backgroundColor:'white'}}>
        <h1 style={{fontWeight:100}}>PRODUCTS</h1>
      </Typography>
    </center>
    <Grid container spacing={2}>
    <Grid item xs={3}>
      <Typography style={{marginLeft:'80px'}}>
        <h1 style={{fontWeight:100}}>Filters</h1>
      </Typography>
      <div style={{marginLeft:'80px'}}>
        <Typography>
          <h2 style={{fontWeight:100}}>Brands</h2>
        </Typography>

        <Brand brandname="iPhone" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage} ></Brand>
        <Brand brandname="Samsung" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Oneplus" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Motorola" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Xiaomi" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Realme" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Vivo" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
        <Brand brandname="Oppo" setProducts={setProducts} price={targetPrice} setCurrentPage={setCurrentPage}></Brand>
      </div>
       
       <div style={{marginLeft:'80px', marginTop:'40px', marginBottom:'40px'}}>
       <Typography>
        <h2 style={{fontWeight:100}}>Price Filter</h2>
       </Typography>
       <Slider style={{width:'80%'}} defaultValue={200000}  min={10000} max={200000} step={20000} aria-label="Small" valueLabelDisplay="auto" 
                 onChange={(e) => setTargetPrice(e.target.value)}
                  onChangeCommitted={()=>{
                    axios.post(baseUrl+"/pricevalue",{
                      price:targetPrice
                    },{
                       headers:{
                        "Content-Type":"application/json"
                       }
                    }).then((response) =>{
                      // console.log(response.data);
                      setProducts(response.data.nArr);
                    })
                  }}
                />
       </div>

       <Button style={{marginLeft:'80px'}} variant='outlined' onClick={()=>{
        window.location="/product";
       }}>Clear Filter</Button>
    </Grid>

    <Grid item xs={9} style={{paddingTop:'100px', paddingLeft:'40px', backgroundColor:'ghostwhite'}}>
      
      <div style={{display:'flex', gap:30 , marginTop:'10px', marginLeft:'10px', flexWrap:'wrap'}}>
       {currentItem.map(p => <Product name={p.name} price={p.price} image={p.imageLink} id={p._id} brand={p.brand}></Product>)}
      </div>

       <div style={{marginTop:'50px', marginBottom:'30px', backgroundColor:'whitesmoke', paddingLeft:'450px'}}>
       <Stack spacing={2}>
      <Pagination count={nPage} page={currentPage} onChange={updatePageNum} size='large' color='primary'/>
    </Stack>
       </div> 
    </Grid>
    
    </Grid>
      
            
    </div>

}

function Product(props){
  const navigate = useNavigate();
  return <div>
  <CardActionArea onClick={()=>{
    navigate("/product/"+props.id);
  }}>
  <Card variant="outlined" style={{width: 230 , padding:10, height:350, border:'0px'}}>
          <Typography >
                         
             <img src={props.image} width={250} height={200} style={{objectFit:"contain"}}></img>
             
             <h2 style={{marginTop:10, marginBottom:10 , height:'72px', fontWeight:100}}>{props.name}</h2>
             <h3 style={{marginTop:10, marginBottom:10, fontWeight:100 }}>{"₹"+props.price}</h3>
             
            
         </Typography>  
      </Card>
  </CardActionArea>
    
  </div>
}

function Brand(props){
  const [checked, setChecked] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = () => {
    setChecked(!checked);
    if(!checked)
        {
          axios.post(baseUrl+'/brandFilter',{
            brand:props.brandname,
            price: props.price
          },{
            headers:{
                      "Content-Type":"application/json"
                     }
          }).then((response)=>{
            // console.log(response.data);
            props.setProducts(response.data.bArr);
            props.setCurrentPage(1);
          })
          
       
        }
        else if(checked){
          axios.post(baseUrl+"/removeBrandFilter",{
        brand:props.brandname,
        price:props.price
        },{
          headers: {
            "Content-Type":"application/json"
          }
        }).then((response)=>{
            // console.log(response.data);
            props.setProducts(response.data.rbArr);
          })
       
      }
  };
  return <div>
  <FormGroup>
  
  <FormControlLabel control={ <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    
    />}   label={props.brandname}>

    </FormControlLabel>
  
  
  </FormGroup>
    
  </div>
}
export default Products;

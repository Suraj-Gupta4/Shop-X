import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './component/Products';
import AddProduct from './component/AddProduct';
import Appbar from './component/Appbar';
import SingleProduct from './component/SingleProduct';
import Cart from './component/Cart';
import Homepage from './component/Homepage';
import AboutUS from './component/AboutUs';
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import Success from './component/success';
import Cancel from './component/Cancel';

function App() {
  

  return (
    <>
    {/* <div style={{backgroundColor:"#eeeeee", width:'100vw', height:'100vh', overflow:'auto'}}> */}
    <RecoilRoot>
      <Router>
      <Appbar />
      <Routes>
         <Route path="/"  element={<Homepage / >} />
         <Route path="/cart" element={<Cart/>} />
         <Route path='/addProduct' element={<AddProduct />} />
         <Route path="/product"  element={<Products />} />
         <Route path="/product/:productId"  element={<SingleProduct/>} />
         <Route path="/aboutus"  element={<AboutUS />} />
         <Route path="/success"  element={<Success />} />
         <Route path="/cancel"  element={<Cancel />} />
      </Routes>
      
    </Router>
    </RecoilRoot>
    
    
        {/* </div> */}
    </>
  )
}


export default App

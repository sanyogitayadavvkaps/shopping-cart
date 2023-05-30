import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddToCart from '../Components/AddToCart'
import CheckOutForm from '../Components/CheckOutForm'
import Main from '../Components/Main'
import Succes from '../Components/Pages/Succes'
import ProductDetails from '../Components/ProductDetail'
import RegistrationForm from '../Components/RegistrastionForm'
import Shop from '../Components/Shop'
import SignIn from '../Components/SignIn'


export default function AllRoute() {
  return (
    <Routes>
          
      <Route path="/" element={ <Main/>}/>
       <Route path="/shop" element={ <Shop/>}/>
      <Route path="/prouct/detail/:id" element={<ProductDetails />} />
      <Route path="/add-to-cart" element={ <AddToCart/>}/>
      <Route path="/check-out-form" element={ <CheckOutForm/>}/>
      <Route path="/sign-up" element={<RegistrationForm />} />
      <Route path="/login" element={ <SignIn/>}/>
      <Route path="/succes" element={ <Succes/>}/>

      '



      

 </Routes>
  )
}

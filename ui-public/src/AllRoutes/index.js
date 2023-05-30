import {  Routes, Route } from "react-router-dom";
import PageNotFound from "../components/404";
import BuyNow from "../components/BuyNow";
import CheckoutSuccess from "../components/Checkout-success";
import EditUserForm from "../components/EditUser";
import Home from "../components/Home";
import UserLogin from "../components/Login";
import Cancel from "../components/Paymant/cancle";
import Success from "../components/Paymant/succes";
import UserSignUp from "../components/SignUp";
import ViewDetails from "../components/ViewDeatils";
const AllRoutes = () =>{
    return(
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<UserLogin />} />
         <Route path="/sign-up" element={<UserSignUp />} />/
         <Route path="/view-deatils/:id" element={<ViewDetails />} />
         <Route path="*"  element={<PageNotFound />} />
         <Route path="/edit-user/:id"  element={<EditUserForm />} />
         {/* <Route path="/buy-now"  element={<BuyNow />} /> */}
         <Route path="/success" element={<Success />} /> 
        <Route path="/cancel" element={<Cancel />} /> 
            <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} /> 

            





        </Routes>
    )
}

export default AllRoutes
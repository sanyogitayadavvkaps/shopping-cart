import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoute from './routes/AllRoute';
import { useEffect, useState } from 'react';
import { getRequest } from './Api';
import { ToastContainer } from 'react-toastify';
import { createContext } from 'react';

export const CategoryContext = createContext();

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [cartData,setCartData] = useState([])
  const [quantity, setQuantity] = useState(1)
  const[productArray,setProductArray] = useState([])
  

  useEffect(() => {
    getCategory();
    getCartData()
  }, []);

  useEffect(() => {
  }, [categoryData]);

  const getCategory = async () => {
    const res = await getRequest('/get-category');
    setCategoryData(res.data);
  };
  const getCartData = async () => {
    const res = await getRequest(`/get-cart`)
    // setProductArray(res.data[0].totalPrice)
    setCartData(res.data[0]?.productData)
  }
  return (
    <BrowserRouter>
       <ToastContainer />
      <CategoryContext.Provider value={{categoryData,quantity,setQuantity,cartData,getCartData,productArray}}>
        <AllRoute />
      </CategoryContext.Provider>
    </BrowserRouter>
  );
}

export default App;

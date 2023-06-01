import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoute from './routes/AllRoute';
import { useEffect, useState } from 'react';
import { getRequest, getRequestById } from './Api';
import { ToastContainer } from 'react-toastify';
import { createContext } from 'react';

export const CategoryContext = createContext();

function App() {
  const [categoryData, setCategoryData] = useState([]);
  const [quantity, setQuantity] = useState(1)
  const[allGetCart,setAllGetCart] = useState([])
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    getCategory();
    getAllCartByUserId()
    // getCart()
  }, []);


  const getCategory = async () => {
    const res = await getRequest('/get-category');
    console.log("res=>",res.data);

    setCategoryData(res?.data);
    console.log("vcategoryData=>",categoryData);
  };
  const getAllCartByUserId = async () => {
    const res = await getRequestById(`/get-all-cart/${userId}`)
setAllGetCart(res.data[0].productId)
  }

  return (
    <BrowserRouter>
       <ToastContainer />
      <CategoryContext.Provider value={{categoryData,quantity,setQuantity,allGetCart,getAllCartByUserId}}>
        <AllRoute />
      </CategoryContext.Provider>
    </BrowserRouter>
  );
}

export default App;

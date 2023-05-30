import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AdminLoginForm from "./components/AdminLoginform";
import EditCategory from "./components/Forms/EditCategory";
import EditPostForm from "./components/Forms/EditPost";
import Home from "./components/Home";
import CategoriesPage from "./components/pages/CategoriesPage";
import PostPage from "./components/pages/PostPage";
import ProfilePage from "./components/pages/ProfilePage";
import UserPage from "./components/pages/UserPage";
import { ToastContainer } from 'react-toastify'
import ShowBlogs from "./components/pages/ShowBlogs";
import EditUser from "./components/Forms/EditUser";
import Products from "./components/pages/Products/inex";
import EditProductForm from "./components/Forms/EditProductForm";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-page" element={<PostPage />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/categories-page" element={<CategoriesPage />} />
        <Route path="/profile-page/:id" element={<ProfilePage />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/post/edit/:id" element={<EditPostForm />} />
        <Route path="/categorie/edit/:id" element={<EditCategory />} />
        <Route path="/show-blogs/:id" element={<ShowBlogs />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/proucts" element={<Products />} />
        <Route path="/edit-proucts/:id" element={<EditProductForm />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;

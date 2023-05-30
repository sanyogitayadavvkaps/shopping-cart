import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRequest, postRequest } from "../../../Api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const history = useNavigate();
  const { register, handleSubmit,reset } = useForm();
  const [showPostModal, setShowPostModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [getBlog, setGetBlog] = useState([]);
  const [names, setNames] = useState([]);
  const [emailError, setEmailError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showProduct, setShowProduct] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShowUserModal = () => {
    setShowUserModal(true);
  };
  const handleShowCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleShowModal = () => {
    setShowPostModal(true);
  };
  const handleShowProuctModal = () => {
    setShowProduct(true)
}
  const handleHideModal = () => {
    getBlogData()
    setShowPostModal(false);
    setShowUserModal(false);
    setShowCategoryModal(false);
    setShowProduct(false)
  };
  const categorySubmit = async (data) => {
    const res = await postRequest("/insert-category", data);
    if (res.status === 200) {
      toast.success("Category Add successfully");
      setShowCategoryModal(false);
      reset();
    } else {
      toast.error("Error Please check..");
    }
  };

  const addBlogs = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("CategoryId", formData.CategoryId);
    formDataToSend.append("blog", formData.image[0]);
    formDataToSend.append("description", formData.description);
    try {
      const res = await postRequest("/post-blog", formDataToSend);
      if (res.status === 200) {
        toast.success("Blogs Add successfully");
        setShowPostModal(false);
        getBlogData();
        reset();

      } else {
        toast.error("Error Please check..");
      }
    } catch (err) {
      console.log("Blogs Error=>", err);
    }
  };

  const addUser = async (value) => {
    const res = await postRequest("/user-register", value);
    const { error } = res;
    if (error) {
      setEmailError(error);
      return;
    }
    if (res.status === 200) {
      toast.success("User Add successfully");
      setShowUserModal(false);
      history("/user-page");
      reset();
    } else {
      toast.error("Error Please check..");
    }
  };

  const getCategorName = async () => {
    const res = await getRequest("/get-category-name");
    setNames(res.data);
  };


  useEffect(() => {
    getCategorName();
    getBlogData();
  }, []);

  
  const getBlogData = async () => {
    const res = await getRequest("/get-blog");
    console.log("ress=>", res.data);
  
    // Sort the blog posts array by createdAt date in descending order
    const sortedPosts = res.data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
  
    // Slice the sorted array to only include the latest 5 posts
    const latestPosts = sortedPosts.slice(0, 5);
  
    setGetBlog(latestPosts);
  };
  
  const addProduct = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("CategoryId", formData.CategoryId);
    formDataToSend.append("prouctimg", formData.image[0]);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("noOfProucts", formData.noOfProucts);
    formDataToSend.append("price", formData.price);


    try {
      const res = await postRequest("/post-product", formDataToSend);
      if (res.status === 200) {
        toast.success("Products Add successfully");
        setShowProduct(false);
        reset();

      } else {
        toast.error("Error Please check..");
      }
    } catch (err) {
      console.log("Blogs Error=>", err);
    }
}

  // const latestPosts = getBlog?.slice(0, 5);
  return (
    <div>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-cog"></i> Dashboard
              </h1>
            </div>
          </div>
        </div>  
      </header>
      <section id="actions" class="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-block"
                onClick={handleShowModal}
              >
                <i className="fas fa-plus"></i> Add Post
              </button>
            </div>
            <div className="col-md-3">
              <a
                onClick={handleShowCategoryModal}
                className="btn btn-success btn-block"
              >
                <i className="fas fa-plus"></i> Add Category
              </a>
            </div>
            <div className="col-md-3">
              <a
                className="btn btn-warning btn-block"
                onClick={handleShowUserModal}
              >
                <i className="fas fa-plus"></i> Add User
              </a>
            </div>
            <div className="col-md-3">
              <a
                className="btn btn-warning btn-block"
                onClick={handleShowProuctModal}
              >
                <i className="fas fa-plus"></i> Add Products
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  {getBlog?.length &&
                    getBlog?.map((value, index) => {
                      const createdAtDate = new Date(value.createdAt);
                      // Format createdAtDate to "MMM DD YYYY" format
                      const formattedDate = createdAtDate.toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      );
                      return (
                        <tbody>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.title}</td>
                            <td>{value.categoryName}</td>
                            <td>{formattedDate}</td>
                            <td>
                              <button
                                onClick={() =>
                                  history(`/post/edit/${value._id}`)
                                }
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-angle-double-right"></i>{" "}
                                Details
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Posts</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt"></i>{getBlog?.length}
                  </h4>
                  <NavLink
                    to={"post-page"}
                    className="btn btn-outline-light btn-sm"
                  >
                    View
                  </NavLink>
                </div>
              </div>

              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Categories</h3>
                  <h4 className="display-4">
                    <i className="fas fa-folder"></i> 4
                  </h4>
                  <NavLink
                    to={"/categories-page"}
                    className="btn btn-outline-light btn-sm"
                  >
                    View
                  </NavLink>
                </div>
              </div>

              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display-4">
                    <i className="fas fa-users"></i> 4
                  </h4>
                  <NavLink
                    to={"/user-page"}
                    className="btn btn-outline-light btn-sm"
                  >
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPostModal && (
        <div
          className="modal fade show"
          id="addPostModal"
          style={{ display: "block", paddingRight: 15 }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Post</h5>
                <button className="close" onClick={handleHideModal}>
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(addBlogs)}
                  enctype="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("title")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      {...register("CategoryId")}
                    >
                      <option value=""> Select Category</option>
                      {names.length &&
                        names?.map((name) => (
                          <option key={name._id} value={name._id}>
                            {name.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="image"
                        {...register("image")}
                      />
                      <label htmlFor="image" className="custom-file-label">
                        Choose File
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Body</label>
                    <textarea
                      type="text"
                      className="form-control"
                      {...register("description")}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div
          className="modal fade show"
          id="addCategoryModal"
          style={{ display: "block", paddingRight: 15 }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Add Category</h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  onClick={handleHideModal}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(categorySubmit)}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("categoryName")}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUserModal && (
        <div
          className="modal fade show"
          id="addUserModal"
          style={{ display: "block", paddingRight: 15 }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add User</h5>
                <button className="close" onClick={handleHideModal}>
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(addUser)}>
                  <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("lastName")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email")}
                    />
                    <p className="text-danger">{emailError}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        {...register("password")}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("mobile")}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-success" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

{showProduct && (
        <div
          className="modal fade show"
          id="addPostModal"
          style={{ display: "block", paddingRight: 15 }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Product</h5>
                <button className="close" onClick={handleHideModal}>
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(addProduct)}
                  enctype="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="title">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("productName")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      {...register("CategoryId")}
                    >
                      <option value=""> Select Category</option>
                      {names.length &&
                        names?.map((name) => (
                          <option key={name._id} value={name._id}>
                            {name.categoryName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="image"
                        {...register("image")}
                      />
                      <label htmlFor="image" className="custom-file-label">
                        Choose File
                      </label>
                    </div>
                    <div className="form-group">
                    <label htmlFor="noOfProucts">No Of Proucts</label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("noOfProucts")}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("price")}
                    />
                  </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Body</label>
                    <textarea
                      type="text"
                      className="form-control"
                      {...register("description")}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};
export default MainPage;

import { useForm } from "react-hook-form";
import MainLayoutes from "../../layoutes/MainLayoutes";
import {
  deleteRequest,
  getRequest,
  getRequestById,
  putRequest,
  ServerUrl,
} from "../../../Api/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPostForm = () => {
  const history = useNavigate();
  const [names, setNames] = useState([]);
  const [valueImg, setImgValue] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  console.log("REsponse=>", id);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getRequestById(`get-product-by-id/${id}`);
      console.log("REsponse=>", response);
      setImgValue(response.data);
      const { title, description, blogImage } = response.data;
      setValue("title", title);
      setValue("title", title);
      setValue("description", description);
      setValue("CategoryId", response.data.CategoryId?._id);
      if (blogImage) {
        // Convert blogImage to a Blob object
        const blob = new Blob([blogImage], { type: "image/jpeg" });
        // Create a URL for the blob object
        const imageUrl = URL.createObjectURL(blob);
        setValue("blog", imageUrl);
      }
    };
    fetchUser();
    getCategorName();
  }, [id, setValue]);
  const getCategorName = async () => {
    const res = await getRequest("/get-category-name");
    setNames(res.data);
  };

  const editBlog = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("CategoryId", formData.CategoryId);
    formDataToSend.append("blog", formData.image[0]);
    formDataToSend.append("description", formData.description);
    const res = await putRequest(`/update-blog/${id}`, formDataToSend);
    if (res.status === 200) {
      toast.success("Blogs update successfully");
      history("/post-page");
    } else {
      toast.error("Error Please check..");
    }
  };

  const deleteData = async () => {
   const res =  await deleteRequest(`/remove-blog/${id}`);
   if(res.status===200)
   {
    toast.success("Blogs deleted successfully");
    history("/post-page");
   }
   else {
    toast.error("Error Please check..");
  }

  };

  return (
    <MainLayoutes>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>{valueImg.title}</h1>
            </div>
          </div>
        </div>
      </header>
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <NavLink to={"/"} className="btn btn-light btn-block">
                <i className="fas fa-arrow-left" /> Back To Dashboard
              </NavLink>
            </div>
            <div className="col-md-3">
              <a href="index.html" className="btn btn-success btn-block">
                <i className="fas fa-check" /> Save Changes
              </a>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-danger btn-block"
                data-toggle="modal"
                type="button"
                data-target="#exampleModal"
              >
                <i className="fas fa-trash" />
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Edit Post</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(editBlog)}>
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
                      <div className="col-md-6">
                        <img
                          src={`${ServerUrl}/Blogs/${valueImg.blogImage}`}
                          style={{ width: "3rem" }}
                        />
                      </div>
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
        </div>
      </section>

      <>
        {/* Modal */}
        <div
           className="modal fade"
           id="exampleModal"
           tabIndex={-1}
           role="dialog"
           aria-labelledby="exampleModalLabel"
           aria-hidden="true"
           data-backdrop="static"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Modal
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {" "}
                Do you really want to delete these records?
                <br />
                This process cannot be undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={deleteData}
                >
                Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainLayoutes>
  );
};
export default EditPostForm;

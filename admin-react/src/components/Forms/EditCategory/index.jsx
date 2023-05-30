import { useForm } from "react-hook-form";
import MainLayoutes from "../../layoutes/MainLayoutes";
import { deleteRequest, getRequestById, putRequest, } from "../../../Api/index";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const {id} = useParams()
  const history = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const fetchUser = async () => {
      const response = await getRequestById(`/get-category/id/${id}`);
      setValue('categoryName',response?.data?.categoryName)
 
    };
    fetchUser();
  }, [id, setValue]);


  const categorySubmit = async (data) => {
    try {
     const res =  await putRequest(`/update-category/${id}`, data);
     if(res.status===200){
      toast.success('Category update successfully');
      history("/categories-page");
     }
     else{
       toast.error('Error Please check..')
     }
    
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  const deleteData = async () => {
    const res =  await deleteRequest(`/remove-category/${id}`);
    if(res.status===200)
    {
     toast.success("Blogs deleted successfully");
     history("/categories-page");
    }
    else {
     toast.error("Error Please check..");
   }
 
   };
 
  return (
    <MainLayoutes>
     <header id="main-header" className="py-2 bg-success text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-folder"></i> Categories
              </h1>
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
                  <h4>Edit Categories</h4>
                </div>
                <div className="card-body">
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
        </div>
      </section>
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
    </MainLayoutes>
  );
};
export default EditCategory;

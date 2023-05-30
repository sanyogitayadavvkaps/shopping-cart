import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteRequest, getRequestById, putRequest } from "../../../Api";
import MainLayoutes from "../../layoutes/MainLayoutes"

const EditUser = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
      const {id} = useParams()
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
     useEffect(() => {
    const fetchUser = async () => {
      const response = await getRequestById(`/get-user-by-id/${id}`);
      const {
        firstName,
        lastName,
        email,
        mobile
      } = response.data;
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
    setValue("mobile", mobile);
      
    };
    fetchUser();
  }, [id, setValue]);
    ;

    
    const addUser = async (value) => {
        const res = await putRequest(`/update-user/${id}`, value);
        if (res.status === 200) {
          toast.success("User Add successfully");
          history("/user-page");
        } else {
          toast.error("Error Please check..");
        }
    };
    
    const deleteData = async () => {
        const res =  await deleteRequest(`/remove-user/${id}`);
        if(res.status===200)
        {
         toast.success("User deleted successfully");
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
              <h1>Edit User</h1>
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


            </MainLayoutes>
    )
}
export default EditUser
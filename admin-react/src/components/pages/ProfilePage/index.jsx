import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getRequestById } from "../../../Api";
import MainLayoutes from "../../layoutes/MainLayoutes";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {id} = useParams()

useEffect(() => {
  const fetchUser = async () => {
    const response = await getRequestById(`/admin/get/id/${id}`);
    const{email,} = response.data
    setValue('email',email)
  };
  fetchUser();
}, [id, setValue]);

  return (
      <MainLayoutes>
    <div>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-user" /> Edit Profile
              </h1>
            </div>
          </div>
        </div>
      </header>
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <NavLink to={'/'} className="btn btn-light btn-block">
                <i className="fas fa-arrow-left" /> Back To Dashboard
              </NavLink>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block">
                <i className="fas fa-lock" /> Change Password
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-danger btn-block">
                <i className="fas fa-trash" /> Delete Account
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="profile">
  <div className="container">
    <div className="row">
      <div className="col-md-9">
        <div className="card">
          <div className="card-header">
            <h4>Edit Profile</h4>
          </div>
          <div className="card-body">
            <form>
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
                <input
                  type="password"
                  className="form-control"
                  {...register("password")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <h3>Your Avatar</h3>
        <img src="img/avatar.png" alt="" className="d-block img-fluid mb-3" />
        <button className="btn btn-primary btn-block">Edit Image</button>
        <button className="btn btn-danger btn-block">Delete Image</button>
      </div>
    </div>
  </div>
</section>

    </div>
    </MainLayoutes>
  );
};
export default ProfilePage;

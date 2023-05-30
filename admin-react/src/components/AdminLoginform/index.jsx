import Footer from "../Footer";
import { postRequest } from "../../Api/index.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const AdminLoginForm = () => {
  const history = useNavigate();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const adminSubmit = async (value) => {
    const res = await postRequest("/admin/login", value);
    const { error, passwordError } = res;
    if (error) {
      setEmailError(res.error);
      return;
    }
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    console.log("DATA=>", res);
  
    const { _id, token, expiresIn } = res.data; // Assuming the API response includes an 'expiresIn' field
  
    if (res.auth) {
      const expirationTime = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and calculate expiration time
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("_id", _id);
      history("/");
    }
  };
  
  return (
    <div>
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">
              Blogen
            </a>
          </div>
        </nav>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-user" /> Blogen Admin
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(adminSubmit)}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          {...register("email")}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email.message}
                          </div>
                        )}
                        <p className="text-danger">{emailError}</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          {...register("password")}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password.message}
                          </div>
                        )}

                        <p className="text-danger">{passwordError}</p>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary btn-block"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    </div>
  );
};
export default AdminLoginForm;

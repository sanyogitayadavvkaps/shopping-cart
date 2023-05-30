import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  const history = useNavigate()
  const logOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('_id')
    history('/admin-login')
  }
  const id = localStorage.getItem("_id")
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <NavLink to={"/"} className="nav-link active" style={{color: "aliceblue"}}>
            Blogen
          </NavLink>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <NavLink to={"/"} className="nav-link active">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to={"/post-page"} className="nav-link">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to={"/categories-page"} className="nav-link">
                  Categories
                </NavLink>proucts
              </li>
              <li className="nav-item px-2">
                <NavLink to={"/user-page"} className="nav-link">
                  Users
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to={"/proucts"} className="nav-link">
                  Proucts
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Welcome Brad
                </a>
                <div className="dropdown-menu">
                  <NavLink to={`/profile-page/${id}`} className="dropdown-item">
                    <i className="fas fa-user-circle"></i> Profile
                  </NavLink>
                  <a href="settings.html" className="dropdown-item">
                    <i className="fas fa-cog"></i> Settings
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <NavLink onClick={logOut} className="nav-link">
                  <i className="fas fa-user-times"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;

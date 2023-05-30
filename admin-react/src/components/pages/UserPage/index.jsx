import { useState } from "react";
import { useEffect } from "react";
import MainLayoutes from "../../layoutes/MainLayoutes";
import { getRequest } from "../../../Api";
import { NavLink } from "react-router-dom";
const UserPage = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = useState("");
  const[getUser,setGetUser] = useState([])
  useEffect(()=>{
    getUserData()

  },[search, currentPage, pageSize])
  const getUserData = async()=>{
    const res = await getRequest(`/get-user?search=${search}&pageNumber=${currentPage}&pageSize=${pageSize}`)
    setGetUser(res.data)
    setTotalPage(res.totalPages);
    setTotalRecord(res.count);
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <li
          className={`page-item ${i === currentPage ? "active" : ""}`}
          key={i}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };
  return (
    <MainLayoutes>
      <header id="main-header" className="py-2 bg-warning text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users"></i> Users
              </h1>
            </div>
          </div>
        </div>
      </header>
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Users..."
                  name="search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-warning">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="users">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Users</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>S No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
               {getUser.length ? (
                    <tbody>
                      {getUser?.map((data,index)=>{
                        return(
                          <tr key={index}>
                          <td> {(currentPage - 1) * pageSize + index + 1}</td>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.email}</td>
                          <td>{data.mobile}</td>
                          <td>
                            <NavLink to={`/edit-user/${data._id}`} className="btn btn-secondary">
                              <i className="fas fa-angle-double-right"></i> Details
                            </NavLink>
                          </td>
                        </tr>
                        )
                      })}
                  
                  </tbody>
               ):(
                <tbody>
                <tr>
                  <td colSpan="4">No Post found.</td>
                </tr>
              </tbody>
               )
              }
                </table>
                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <button className="page-link">Previous</button>
                    </li>
                    {renderPaginationButtons()}
                    <li className="page-item">
                      <button className="page-link">Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayoutes>
  );
};
export default UserPage;

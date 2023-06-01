import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest, ServerUrl } from "../../../Api";
import MainLayoutes from "../../layoutes/MainLayoutes";

const Products = () => {
  const history = useNavigate()
  const [getBlog, setGetBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBlogData();
  }, [search, currentPage, pageSize]);

  const getBlogData = async () => {
    const res = await getRequest(
      `/get-product?search=${search}&pageNumber=${currentPage}&pageSize=${pageSize}`
    );
    const sortedData = res.data.sort((a, b) => {
      const createdAtDateA = new Date(a.createdAt);
      const createdAtDateB = new Date(b.createdAt);
      return createdAtDateB - createdAtDateA;
    });
    setGetBlog(sortedData);
    setTotalPage(res.totalPages);
    setTotalRecord(res.count);
  };

  // Render the pagination buttons dynamically
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <li
          className={`page-item ${i === currentPage ? "active" : ""}`}
          key={i}
        >
          <button  className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <MainLayoutes>
      <div>
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-pencil-alt"></i> Proucts
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
                    name="search"
                    className="form-control"
                    placeholder="Search Post..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>All Posts</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    {getBlog?.length ? (
                      <tbody>
                        {getBlog.map((value, index) => {
                          const createdAtDate = new Date(value.createdAt);
                          // Format createdAtDate to "MMM DD YYYY" format
                          const formattedDate =
                            createdAtDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                          return (
                            <tr>
                              <td>
                                {" "}
                                {(currentPage - 1) * pageSize + index + 1}
                              </td>
                              <td>
                                <img className="img-fluid" src={`${ServerUrl}/ProductImg/${value.productImage}`} style={{width:"2rem"}}/>
                              </td>
                              <td>{value.productName}</td>
                              <td>{value.categoryName}</td>
                              <td>{formattedDate}</td>
                              <td>
                                <button
                                  onClick={()=>history(`/edit-proucts/${value._id}`)}
                                  className="btn btn-secondary"
                                >
                                  <i className="fas fa-angle-double-right"></i>{" "}
                                  Details
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="4">No Post found.</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                  <nav className="ml-4">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <button  className="page-link">
                          Previous
                        </button>
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
      </div>
    </MainLayoutes>
  );
};
export default Products;

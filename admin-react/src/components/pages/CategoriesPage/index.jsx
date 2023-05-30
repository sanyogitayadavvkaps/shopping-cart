import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getRequest } from "../../../Api";
import MainLayoutes from "../../layoutes/MainLayoutes";

const CategoriesPage = () => {
  const [getCategory, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategoryData();
  }, [search, currentPage, pageSize]);

  const getCategoryData = async () => {
    try {
      const res = await getRequest(
        `/get-category?search=${search}&pageNumber=${currentPage}&pageSize=${pageSize}`
      );
      setCategory(res.data);
      setTotalPage(res.totalPages);
      setTotalRecord(res.count);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  placeholder="Search Categories..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-success">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="categories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>All Categories</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  {getCategory?.length ? (
                    <tbody>
                      {getCategory.map((cat, index) => {
                        const createdAtDate = new Date(cat.createdAt);
                        const formattedDate = createdAtDate.toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        );
                        return (
                          <tr key={index}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>
                              <NavLink to={`/show-blogs/${cat._id}`}>{cat.categoryName}</NavLink>
                            </td>
                            <td>{formattedDate}</td>
                            <td>
                              <NavLink
                                to={`/categorie/edit/${cat._id}`}
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-angle-double-right"></i>{" "}
                                Details
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="4">No categories found.</td>
                      </tr>
                    </tbody>
                  )}
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
export default CategoriesPage;

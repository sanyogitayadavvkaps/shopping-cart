import { getRequest, ServerUrl, postRequest, getRequestAuth } from "../../ApiFunctions/index";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
const Cards = () => {

  let user = localStorage.getItem('response')
  user = JSON.parse(user)

  const { register, handleSubmit, reset } = useForm();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [names, setNames] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [allBlogs, setAllBlogs] = useState([]);


  useEffect(() => {
    getData();
    getCategorName();
    getAllBlogs();
  }, []);
  const getData = async () => {
    setLoading(true);
    const res = await getRequest("/get-blog");
    console.log("RES=>", res);
    setData(res.data);
    setLoading(false);
  };

  const handleShowModal = () => {
    setShowPostModal(true);
  };
  const handleHideModal = () => {
    getData();
    setShowPostModal(false);
  };

  const getCategorName = async () => {
    const res = await getRequest("/get-category-name");
    setNames(res.data);
  };
  const addBlogs = async (formData) => {
    console.log("user.isPaid =?",user.isPaid );
    if (data.length <= 5 || user.isPaid == true) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("CategoryId", formData.CategoryId);
      formDataToSend.append("blog", formData.image[0]);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("userName", user._id);

      try {
        const res = await postRequest("/post-blog",formDataToSend);
        if (res.status === 200) {
          // toast.success("Blogs Add successfully");
          setDataCount(dataCount + 1);
          setShowPostModal(false);
          reset()
          getData();
        } else {
          //toast.error("Error Please check..");
        }
      } catch (err) {
        console.log("Blogs Error=>", err);
      }
    }
    else {
      alert("Not add More data")
    }
  }
  const getAllBlogs = async () => {
    ///all-blogs-by-user
    const res = await getRequestAuth("/all-blogs-by-user");
    console.log("GETT=>",res);

    setAllBlogs(res.data)
 
  }

  return (
    <div className="container">
      <Fab color="primary" aria-label="add" onClick={handleShowModal}>
        <AddIcon />
      </Fab>
      <div className="card">
        {loading ? (
          <CircularProgress />
        ) : (
          data?.map((user, index) => {
            console.log("RATe=>", user);

            const { _id, title, CategoryId, description, blogImage } = user;
            return (
              <Card sx={{ maxWidth: 345, margin: "5px" }} key={index}>
                <CardMedia
                  component="img"
                  style={{
                    height: "200px",
                    backgroundColor: "gray",
                    width: "10rem",
                  }}
                  image={`${ServerUrl}/Blogs/${blogImage}`}
                  className="img-fluid"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="h4">{title}</Typography>
                  <Typography gutterBottom variant="h5">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions style={{}}>
                  <Button
                    variant="contained"
                    onClick={() => history(`/view-deatils/${_id}`)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            );
          })
        )}
      </div>
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
                    {allBlogs?.length === 5 && (
                      <Button variant="contained" color="secondary" onClick={()=>history('/buy-now')}>
                        Buy Now
                      </Button>
                    )}
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

export default Cards;

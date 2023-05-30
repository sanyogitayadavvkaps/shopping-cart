import {
  Container,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import "../ViewDeatils/viewpage.css";
import { getRequest, getRequestById, ServerUrl } from "../../ApiFunctions";
import { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
export default function ViewDetails() {
  const [view, setView] = useState([]);
  const { id } = useParams();

  const history = useNavigate();

  useEffect(() => {
    getByIdData();
  }, []);
  const getByIdData = async () => {
    const res = await getRequestById(`/get-blog/by/id/${id}`);
    console.log("RES=>", res);
    setView(res.data);
  };
  return (
    <MainLayout>
      <Container component="main" maxWidth="lg">
        <div className="row" style={{ marginTop: "1rem" }}>
          <div className="col-md-4">
            <div className="pe-1">
              <img
                className="img-fluid rounded-start"
                alt="Image"
                src={`${ServerUrl}/Blogs/${view?.blogImage}`}
              />
            </div>
          </div>
          <div className="col-md-8">
            <Typography variant="h5">Title : {view?.title}</Typography>
            <Typography variant="h5"> Description: {view?.description}</Typography>
            <Typography variant="h5"> Category: {view?.CategoryId?.categoryName}</Typography>

  
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

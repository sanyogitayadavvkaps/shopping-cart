import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import auth from "../middleware/auth.js";
import {
  getBlogByIdController,
  getBlogController,
  postBlogController,
  updateBlogController,
  removeBlogController,
  allBlogByUserController
} from "../Controller/blogController.js";
export const blogRoutes = express.Router();

blogRoutes.use(cors());
const DestinationsFunction = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("../Blogs"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: DestinationsFunction });

blogRoutes.post("/post-blog", upload.single("blog"), postBlogController);
blogRoutes.get("/get-blog", getBlogController);
blogRoutes.get("/get-blog/by/id/:id", getBlogByIdController);
blogRoutes.put("/update-blog/:id",upload.single("blog"), updateBlogController);
blogRoutes.delete("/remove-blog/:id", removeBlogController);
blogRoutes.get("/all-blogs-by-user",auth, allBlogByUserController);





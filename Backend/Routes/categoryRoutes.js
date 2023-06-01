import express from "express";
import cors from "cors";
import {
  getCategoryByIdController,
  getCategoryController,
  getCategoryNameController,
  getCategoryToAllProductController,
  postCategoryController,
  removeCategoryController,
  updateCategoryController,
} from "../Controller/categoryController.js";

export const categoryRoutes = express.Router();
categoryRoutes.use(cors());

categoryRoutes.post("/insert-category", postCategoryController);
categoryRoutes.get("/get-category-name", getCategoryNameController);
categoryRoutes.get("/get-category", getCategoryController);
categoryRoutes.get("/get-category/id/:id", getCategoryByIdController);
categoryRoutes.put("/update-category/:id", updateCategoryController);
categoryRoutes.delete("/remove-category/:id", removeCategoryController);
categoryRoutes.get("/get-all-product-by-category/:id", getCategoryToAllProductController);





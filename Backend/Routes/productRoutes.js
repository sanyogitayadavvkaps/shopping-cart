import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import {
    getProductByIdController,
    getProductController,
    postProuctController,
    ProductPaymentController,
    removeProductController,
    updateBlogController
} from "../Controller/productController.js";
import auth from "../middleware/auth.js";

export const productRoutes = express.Router();

productRoutes.use(cors());
const DestinationsFunction = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("../ProductImg"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: DestinationsFunction
});
//
productRoutes.post("/post-product", upload.single("prouctimg"), postProuctController);
productRoutes.get("/get-product", getProductController);
productRoutes.get("/get-product-by-id/:id", getProductByIdController);
productRoutes.put("/update-product/:id", upload.single("prouctimg"), updateBlogController);
productRoutes.delete("/remove-product/:id", removeProductController);
productRoutes.post("/v1/create-checkout-session",auth, ProductPaymentController);



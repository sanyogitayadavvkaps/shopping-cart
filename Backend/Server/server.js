
import express from "express";
import connectDataBase from "../DataBase/db.js";
import { adminRoutes } from "../Routes/adminRoutes.js";
import { blogRoutes } from "../Routes/blogRoutes.js";
import { categoryRoutes } from "../Routes/categoryRoutes.js";
import { orderRoutes } from "../Routes/orderRoutes.js";
import { userRoutes } from "../Routes/userRoutes.js";
import dotenv from "dotenv";
import { productRoutes } from "../Routes/productRoutes.js";
import { cartRoutes } from "../Routes/cartRutes.js";
import { checkoutRoutes } from "../Routes/checkOutRoutes.js";

dotenv.config();
const app = express();
const PORT = 9000;
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/Blogs", express.static("../Blogs"));
app.use("/api/ProductImg", express.static("../ProductImg"));
app.use("/api", adminRoutes);
app.use("/api", blogRoutes);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", checkoutRoutes);




connectDataBase();


app.listen(PORT, () => {
  console.log(`Server is running PORT:${PORT}`);
});

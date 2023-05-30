import mongoose from "mongoose";
const DB_URL = "mongodb+srv://sanyogitayadav:2SsG2wkXErBuElfu@cluster0.uh0iine.mongodb.net/Blogs_App";

const connectDataBase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err));
};

export default connectDataBase;

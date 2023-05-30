
import mongoose from "mongoose";
import { Categorys } from "./categoryModel.js";
const blogSchemas = mongoose.Schema(
  {
    title: {
      type: String,
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorys",
    },
    blogImage: {
      type: String,
    },
    description: {
      type: String,
    },
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userdetails",
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchemas);

export const postBlogModel = async ({ body, blogImage }) => {
  const { title, CategoryId, description,userName } = body;
  try {
    const res = await Blog.create({
      title,
      CategoryId,
      description,
      userName,
      blogImage,
    });

    const cat = await Categorys.findById(CategoryId);
    cat?.blogsId?.push(res._id)
   await cat?.save()

    return { data: res, message: "Succes", status: 200 };
  } catch (err) {
    console.log("ERR=>",err)
    return { message: err, status: 500 };
  }
};

export const getBlogModel = async (search, pageSize, startIndex) => {
  try {
    const res = await Blog.aggregate([
      {
        $lookup: {
          from: "categorys", // collection name to join with
          localField: "CategoryId",
          foreignField: "_id",
          as: "CategoryData",
        },
      },
      {
        $lookup: {
          from: "userdetails", // collection name to join with
          localField: "userName",
          foreignField: "_id",
          as: "userNameData",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$CategoryData", 0] }, "$$ROOT"],
            $mergeObjects: [{ $arrayElemAt: ["$userNameData", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $match: {
          $or: [
            { categoryName: { $regex: new RegExp(search, "i") } },
            { title: { $regex: new RegExp(search, "i") } },
          ],
        },
      },
      { $skip: startIndex },
      { $limit: pageSize },
      {
        $project: {
          categoryName: 1,
          title: 1,
          blogImage: 1,
          createdAt: 1,
          description: 1,
          userName:1
        },
      },
    ]);
    const count = await Blog.countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    return {
      data: res,
      count,
      totalPages,
      message: "Succes",
      status: 200,
    };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

export const getBlogByIdModel = async (id) => {
  try {
    const res = await Blog.findById(id).populate({
      path: "CategoryId",
      select: "categoryName",
      model: "categorys",
    });
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    console.log("Err=>", err);

    return { message: err, status: 500 };
  }
};

export const updateBlogModel = async (id, { body, blogImage }) => {
  try {
    const res = await Blog.findByIdAndUpdate(
      id,
      { ...body, blogImage },
      { new: true }
    );
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
};

export const removeBlogModel = async (id) => {
  try {
    const res = await Blog.findByIdAndRemove(id);
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    console.log("Err=>", err);

    return { message: err, status: 500 };
  }
};
export const allBlogByUserModel = async (userId) => {
  try {
    const res = await Blog.find({userName:userId})
    return { data: res, message: "Success", status: 200 };
  } catch (err) {
    return { message: err, status: 500 };
  }
}
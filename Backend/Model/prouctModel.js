
import mongoose from "mongoose";
import { Categorys } from "./categoryModel.js";
const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
        },
        CategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categorys",
        },
        productImage: {
            type: String,
        },
        description: {
            type: String,
    },
    price: {
          type:Number
        },
        noOfProucts: {
            type:Number

        }
    
  },
  { timestamps: true }
);
const Products = mongoose.model("product", productSchema);

export const postProductModel = async ({ body, productImage }) => {
    const { productName, CategoryId, description ,price,noOfProucts} = body;
    try {
      const res = await Products.create({
        productName,
        CategoryId,
        description,
        productImage,
        price,
        noOfProucts
      });

    const cat = await Categorys.findById(CategoryId);
    cat?.productId?.push(res._id)
   await cat?.save()

      return { data: res, message: "Succes", status: 200 };
    } catch (err) {
      console.log("ERR=>",err)
      return { message: err, status: 500 };
    }
  };
  
  export const getProductModel = async (search, pageSize, startIndex) => {
    try {
      const res = await Products.aggregate([
        {
          $lookup: {
            from: "categorys", // collection name to join with
            localField: "CategoryId",
            foreignField: "_id",
            as: "CategoryData",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$CategoryData", 0] }, "$$ROOT"],
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
            productName: 1,
            productImage: 1,
            createdAt: 1,
            description: 1,
            noOfProucts: 1,
            price:1
          },
        },
      ]);
      const count = await Products.countDocuments();
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
  

  export const getProuctByIdModel = async (id) => {
    try {
      const res = await Products.findById(id).populate({
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
  
  export const updateProductModel = async (id, { body, productImage }) => {
    try {
      const res = await Products.findByIdAndUpdate(
        id,
        { ...body, productImage },
        { new: true }
      );
      return { data: res, message: "Success", status: 200 };
    } catch (err) {
      return { message: err, status: 500 };
    }
  };
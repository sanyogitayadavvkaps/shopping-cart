import { request } from "express";
import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }, ],
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdetails'
  },],
  totalPrice: {
    type: Number
  },
  quantity: {
    type: Number
  }

}, {
  timestamps: true
});

const CartsData = mongoose.model("cartData", cartSchema);

export const postCartModel = async (body) => {
  const { productId, userId, totalPrice, quantity } = body;

  try {
    let cartEntry = await CartsData.findOne({ userId });

    if (cartEntry) {
      // Check if the productId already exists in the productId array
      const existingProduct = cartEntry.productId.find((id) => id.equals(productId));

      if (existingProduct) {
        // Product already exists, update quantity and totalPrice
        existingProduct.quantity += quantity;
        cartEntry.totalPrice += totalPrice;
      } else {
        // Product does not exist, push the new productId
        cartEntry.productId.push(productId);
        cartEntry.totalPrice += totalPrice;
        cartEntry.quantity += quantity;
      }

      await cartEntry.save();
    } else {
      cartEntry = await CartsData.create({
        productId: [productId],
        userId,
        totalPrice,
        quantity,
      });
    }

    return { data: cartEntry, message: "Success", status: 200 };
  } catch (err) {
    console.log("ERR=>", err);
    return { message: err, status: 500 };
  }
};



export const getCartModel = async () => {
  try {
    const res = await CartsData.aggregate([{
        $lookup: {
          from: "products", // collection name to join with
          localField: "productId",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{
              $arrayElemAt: ["$productData", 0]
            }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          totalPrice: 1,
          // categoryName: 1,
          // productName: 1,
          // productImage: 1,
          createdAt: 1,
          // price: 1,
          quantity: 1,
          productData: 1,
          userId:1
        },
      },
    ]);

    return {
      data: res,
      message: "Succes",
      status: 200,
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
}

export const deleteCartModel = async (productId,userId) => {
  try {
    const cartEntry = await CartsData.findOne({userId: userId}).populate("productId");
    if (!cartEntry) {
      return { message: "Cart entry not found", status: 404 };
    }
    // Find the index of the productId in the productId array
    const index = cartEntry?.productId?.findIndex((prodId) => prodId.equals(productId));
    if (index !== -1) {
      // Remove the productId from the array
      cartEntry.productId.splice(index, 1);
      await cartEntry.save();
      return { data: cartEntry, message: "Success", status: 200 };
    } else {
      return { message: "Product not found in cart", status: 404 };
    }
  } catch (err) {
    console.log("Err=>", err);
    return { message: err, status: 500 };
  }
};

export const getAllCartModel = async (id) => {
  try {
    
    const res = await CartsData.find({ userId: id }).populate('productId')

  return {
    data: res,
    message: "Succes",
    status: 200,
  };
} catch (err) {
  return {
    message: err,
    status: 500
  };
}
  
}
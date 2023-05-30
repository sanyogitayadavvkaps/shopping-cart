import mongoose from "mongoose";
const categorySchemas = mongoose.Schema({
  categoryName: {
    type: String,
  },
  blogsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs"
  }],
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  }]
},
  
  {
  timestamps: true
});

export const Categorys = mongoose.model("categorys", categorySchemas);

export const postCategorysModel = async ({
  body
}) => {
  const {
    categoryName,
    blogsId
  } = body;
  try {
    const res = await Categorys.create({
      categoryName,
      blogsId
    });
    return {
      data: res,
      message: "Succes",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};

export const getCategoryNameModel = async () => {
  try {
    const res = await Categorys.find({}, {
      categoryName: 1
    });
    return {
      data: res,
      message: "Succes",
      status: 200
    };
  } catch (err) {
    console.log("CAte=>", err);
    return {
      message: message.err,
      status: 500
    };
  }
};

export const getCategoryModel = async (search, pageSize, startIndex) => {
  try {
    const res = await Categorys.aggregate([{
        $lookup: {
          from: "blogs", // collection name to join with
          localField: "blogsId",
          foreignField: "_id",
          as: "blogsIdData",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{
              $arrayElemAt: ["$blogsIdData", 0]
            }, "$$ROOT"],
          },
        },
      },
      {
        $match: {
          $or: [{
              categoryName: {
                $regex: new RegExp(search, "i")
              }
            },

          ],
        },
      },
      {
        $skip: startIndex
      },
      {
        $limit: pageSize
      },
      {
        $project: {
          categoryName: 1,
          createdAt: 1,
          productId:1
        },
      },
    ]);
    const count = await Categorys.countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    return {
      data: res,
      count,
      totalPages,
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

export const getCategoryByIdModel = async (id) => {
  try {
    const res = await Categorys.findById(id).populate({
      path: "blogsId"
    }, )
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

export const updateCategoryModel = async (id, {
  body
}) => {
  try {
    const res = await Categorys.findByIdAndUpdate(
      id, {
        ...body,
      }, {
        new: true
      }
    );
    return {
      data: res,
      message: "Success",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
}

export const removeCategoryModel = async (id) => {
  try {
    const res = await Categorys.findByIdAndRemove(id);
    return {
      data: res,
      message: "Success",
      status: 200
    };
  } catch (err) {
    console.log("Err=>", err);

    return {
      message: err,
      status: 500
    };
  }
}
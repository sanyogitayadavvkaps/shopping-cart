import { getCategoryByIdModel, getCategoryModel, getCategoryNameModel, getCategoryToAllProductModel, postCategorysModel, removeCategoryModel, updateCategoryModel } from "../Model/categoryModel.js"

export const postCategoryController = async(req,res) =>{
    const {body} = req
    try{
        const data = await postCategorysModel({body})
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}

export const getCategoryNameController = async(req,res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    try {
      const data = await getCategoryNameModel();
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
}

export const getCategoryController = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  try {
    const { search } = req.query; // Accessing query parameters
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const data = await getCategoryModel(search, pageSize, startIndex); // Pass search parameter to the model function
    res.send(data);
  } catch (err) {
    console.log("ERROR=>", err);
    res.send(err);
  }
};

export const getCategoryByIdController = async(req,res) =>{
  const {id} = req.params
  try{
      const data = await getCategoryByIdModel(id)
      res.send(data)
  }
  catch(err){
      res.send(err)
  }
}

export const updateCategoryController = async(req,res)=>{
  const id = req?.params?.id;
  const {body} = req;
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const data = await updateCategoryModel(id, {body});
    res.send(data);
  } 
  catch (err) {
    res.send(err);
  }

}

export const removeCategoryController = async(req,res)=>{
  const {id} = req.params
  try{
    const data = await removeCategoryModel(id)
    res.send(data)
  }
  catch(err){
    res.send(err)
  }
}

//

export const getCategoryToAllProductController = async(req,res) =>{
  const {id} = req.params
  try{
      const data = await getCategoryToAllProductModel(id)
      res.send(data)
  }
  catch(err){
      res.send(err)
  }
}
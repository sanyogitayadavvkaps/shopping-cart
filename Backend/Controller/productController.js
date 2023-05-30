import { postProductModel,getProductModel, getProuctByIdModel, updateProductModel } from "../Model/prouctModel.js";

 export const postProuctController = async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const body = req?.body;
    const productImage = req?.file?.filename;
  
    try {
      const data = await postProductModel({ body, productImage });
      res.send(data);
    } catch (err) {
      console.log("DATA=>",err)
      res.send(err);
    }
}


export const getProductController = async(req,res) =>{
  const search = req?.query?.search;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    try {
      const data = await getProductModel(search, pageSize, startIndex);
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
}
//getProuctByIdModel

export const  getProductByIdController = async(req,res)=>{
  const {id} = req.params
  try{
      const data = await getProuctByIdModel(id)
      res.send(data)
  }
  catch(err){
      res.send(err)
  }
}

export const updateBlogController = async(req,res)=>{
  const id = req?.params?.id;
  const {body} = req;
  const productImage = req?.file?.filename; 
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const data = await updateProductModel(id, { body, productImage });
    res.send(data);
  } 
  catch (err) {
    res.send(err);
  }
}
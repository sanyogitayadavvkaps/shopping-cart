import { allBlogByUserModel, getBlogByIdModel, getBlogModel, postBlogModel,removeBlogModel,updateBlogModel } from "../Model/blogModel.js";

 export const postBlogController = async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const body = req?.body;
    const blogImage = req?.file?.filename;
  
    try {
      const data = await postBlogModel({ body, blogImage });
      res.send(data);
    } catch (err) {
      console.log("DATA=>",err)
      res.send(err);
    }
}

export const getBlogController = async(req,res) =>{
  const search = req?.query?.search;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    try {
      const data = await getBlogModel(search, pageSize, startIndex);
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
}


export const  getBlogByIdController = async(req,res)=>{
  const {id} = req.params
  try{
      const data = await getBlogByIdModel(id)
      res.send(data)
  }
  catch(err){
      res.send(err)
  }
}

export const updateBlogController = async(req,res)=>{
  const id = req?.params?.id;
  const {body} = req;
  const blogImage = req?.file?.filename; 
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const data = await updateBlogModel(id, {body, blogImage});
    res.send(data);
  } 
  catch (err) {
    res.send(err);
  }
}

export const removeBlogController = async(req,res)=>{
  const {id} = req.params
  try{
    const data = await removeBlogModel(id)
    res.send(data)
  }
  catch(err){
    res.send(err)
  }
}
export const allBlogByUserController = async (req, res) => {
  const userId = req.user._id
  try{
    const data = await allBlogByUserModel(userId)
    res.send(data)
}
catch(err){
    res.send(err)
}
  
}
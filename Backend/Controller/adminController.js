import { adminLoginModel ,admingetIdModel} from "../Model/admiModel.js"

export const admiLoginController = async(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const body = req.body
    try{
        const data = await adminLoginModel({body})
        res.send(data)
    }
    catch(err){
        res.send(err)
    }

}

export const admingetIdController = async(req,res) =>{
    const {id} = req.params
    try{
        const data = await admingetIdModel(id)
        res.send(data)
    }
    catch(err){
        res.send(err)
    }
}
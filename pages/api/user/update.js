import { putUserData } from "../../../server/controller/Users";


export default async function handler(req , res){
    const {values} = req.body
    const {email , username , password , past_password} = values
    console.log({email , username , password});
    const data =await putUserData({email , username , password , past_password})
    if(data.status === "SUCCESS"){
        res.status(200).json(data)
    }else{
        res.status(400).json(data)
    }
}
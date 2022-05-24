import { putUser } from "../../../../server/controller/Users"


export default async function handler(req,res){

    const value = req.body

    const user =await putUser(value)

    res.status(200).json(user)
}
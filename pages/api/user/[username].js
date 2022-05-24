import {getUserData} from "../../../server/controller/Users"

export default async function handler(req,res){

    const {username} = req.query
    // console.log(username)
    const user = await getUserData({username})

    res.status(200).json(user)
}

// /api/user/[username]
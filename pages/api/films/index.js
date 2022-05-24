import { getSliders } from "../../../server/controller/Film"



export default async function handler(req,res){
    if(req.method === "GET"){
        const sliders = await getSliders()
        res.status(200).json(sliders)
    }
}
import { createComment } from "../../../server/controller/Film";

export default async function handler(req, res) {
    if(req.method === "POST"){
        console.log(req.body );
        const comment = await createComment(req.body);
      
        res.status(200).json(comment);
    }
}

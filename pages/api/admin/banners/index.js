import { getBanners } from "../../../../server/controller/Banner";


export default async function handler(req, res) {
    if (req.method === "GET") {
        console.log(req.query)
      const banners = await getBanners(req.query);
      res.status(200).json(banners);
    }
  }
  
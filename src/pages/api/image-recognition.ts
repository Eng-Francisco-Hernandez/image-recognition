import { ImaggaClient } from "@/services/image-recognition/imaggaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      const imaggaClient = new ImaggaClient();
      const uploadedImgId = await imaggaClient.uploadFile(body.imageBase64);
      console.log(uploadedImgId)
      res.status(200).json({ name: "John Doe" });
      break;

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}

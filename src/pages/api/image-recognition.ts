import { ImaggaClient } from "@/services/image-recognition/imaggaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const imaggaClient = new ImaggaClient();
        const uploadedImgResponse = await imaggaClient.uploadFile(
          body.imageBase64
        );
        const imageTags = await imaggaClient.getFileTags(
          uploadedImgResponse.result.upload_id
        );
        await imaggaClient.deleteFile(
          uploadedImgResponse.result.upload_id
        );
        res.status(200).json(imageTags.result);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}

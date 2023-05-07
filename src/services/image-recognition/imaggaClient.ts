const FormData = require("form-data");
import axios from "axios";

export class ImaggaClient {
  protected authToken = process.env.IMAGGA_AUTHORIZATION_TOKEN!;
  protected baseUrl = process.env.IMAGGA_BASE_URL;

  async uploadFile(imageBase64: string) {
    const bodyFormData = new FormData();
    bodyFormData.append("image_base64", imageBase64);
    try {
      const result = await axios({
        method: "post",
        url: `${process.env.IMAGGA_BASE_URL}/uploads`,
        data: bodyFormData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${bodyFormData.getBoundary()}`,
          Authorization: `Basic ${process.env.IMAGGA_AUTHORIZATION_TOKEN}`,
        },
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async getFileTags(imageUploadId: string) {
    try {
      const result = await axios({
        method: "get",
        url: `${process.env.IMAGGA_BASE_URL}/tags`,
        headers: {
          Authorization: `Basic ${process.env.IMAGGA_AUTHORIZATION_TOKEN}`,
        },
        params: {
          image_upload_id: imageUploadId,
        },
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async deleteFile(imageUploadId: string) {
    try {
      const result = await axios({
        method: "delete",
        url: `${process.env.IMAGGA_BASE_URL}/uploads/${imageUploadId}`,
        headers: {
          Authorization: `Basic ${process.env.IMAGGA_AUTHORIZATION_TOKEN}`,
        },
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

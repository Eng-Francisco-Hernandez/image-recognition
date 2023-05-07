const FormData = require("form-data");

export class ImaggaClient {
  protected authToken = process.env.IMAGGA_AUTHORIZATION_TOKEN!;
  protected baseUrl = process.env.IMAGGA_BASE_URL;

  async uploadFile(imageBase64: string) {
    try {
      const formData = new FormData();
      formData.append("image_base64", imageBase64);
      const res = await fetch(`${process.env.IMAGGA_BASE_URL}/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.IMAGGA_AUTHORIZATION_TOKEN}`,
        },
        body: formData,
      });
      const parsedResponse = await res.json();
      return parsedResponse;
    } catch (error) {
      return error;
    }
  }
}

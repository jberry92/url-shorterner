import { IApiResponse } from "@/types";
import axios from "axios";

export class UrlAPI {
  private static baseURL = "http://localhost:3000/api/v1";

  static async getAllUrls() {
    const url = `${this.baseURL}/urls`;
    const response = await axios.get<IApiResponse[]>(url);
    return response.data;
  }

  static async createShortenedURL(fullUrl: string) {
    const url = `${this.baseURL}/create-url`;
    const response = await axios.post<IApiResponse>(url, { fullUrl });
    return response.data;
  }

  static async deleteURL(urlId: string) {
    const url = `${this.baseURL}/delete-url/${urlId}`;
    await axios.delete(url);
    return;
  }
}

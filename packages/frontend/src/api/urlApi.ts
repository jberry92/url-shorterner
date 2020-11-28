import { IApiResponse } from "@/types";
import Axios from "axios";

export class UrlAPI {
  private static urlAxios = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  static async getAllUrls(): Promise<any[]> {
    const url = "/urls";
    const response = await this.urlAxios.get<IApiResponse[]>(url);
    return response.data;
  }

  static async createShortenedURL(fullUrl: string) {
    const url = "/create-url";
    const response = await this.urlAxios.post<IApiResponse>(url, { fullUrl });
    return response.data;
  }

  static async deleteURL(urlId: string) {
    const url = `/delete-url/${urlId}`;
    await this.urlAxios.delete(url);
    return;
  }
}

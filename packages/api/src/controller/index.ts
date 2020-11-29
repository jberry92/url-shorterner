import { Router, Request, Response } from "express";
import { validateBody } from "../middleware/validateBody";
import { UrlShortener } from "../shortener";
export class URLShortenerController {
  public router = Router();
  private urlShortener: UrlShortener;

  constructor(urlShortener: UrlShortener) {
    this.urlShortener = urlShortener;
    this.router.get("/urls", this.getUrls);
    this.router.post(`/create-url`, validateBody, this.createUrl);
    this.router.patch(`/update-url`, validateBody, this.updateUrl);
    this.router.delete(`/delete-url/:urlId`, this.deleteUrl);
  }

  private createUrl = async (request: Request, response: Response) => {
    try {
      const { fullUrl } = request.body;
      const res = await this.urlShortener.createShortenedUrl(fullUrl);
      response.send(res);
    } catch (err) {
      console.log(err);
      response.sendStatus(500);
    }
  };

  private getUrls = async (request: Request, response: Response) => {
    try {
      const urls = await this.urlShortener.retrieveUrls();
      response.send(urls);
    } catch (err) {
      console.log(err);
      response.sendStatus(500);
    }
  };

  private updateUrl = async (request: Request, response: Response) => {
    try {
      const { urlId, newUrl } = request.body;
      const res = await this.urlShortener.updateUrl(urlId, newUrl);
      response.send(res);
    } catch (err) {
      console.log(err);
      response.sendStatus(500);
    }
  };

  private deleteUrl = async (request: Request, response: Response) => {
    const { urlId } = request.params;
    try {
      await this.urlShortener.deleteUrl(urlId);
      response.sendStatus(204);
    } catch (err) {
      console.log(err);
      console.log("Failed to delete the resource.");
      return response.sendStatus(500);
    }
  };
}

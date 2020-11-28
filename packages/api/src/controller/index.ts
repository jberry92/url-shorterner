import { Router, Request, Response } from "express";
import { validateBody } from "../middleware/validateBody";
import { Shortener } from "../shortener";
export class URLShorternerController {
  public router = Router();
  private abstraction: Shortener;

  constructor(abstraction: Shortener) {
    this.abstraction = abstraction;
    this.router.get("/urls", this.getUrls);
    this.router.post(`/create-url`, validateBody, this.createUrl);
    this.router.patch(`/update-url`, validateBody, this.updateUrl);
    this.router.delete(`/delete-url/:urlId`, this.deleteUrl);
  }

  private createUrl = async (request: Request, response: Response) => {
    const { fullUrl } = request.body;
    const res = await this.abstraction.createShortenedUrl(fullUrl);
    response.send(res);
  };

  private getUrls = async (request: Request, response: Response) => {
    const urls = await this.abstraction.retrieveUrls();
    response.send(urls);
  };

  private updateUrl = async (request: Request, response: Response) => {
    const { urlId, newUrl } = request.body;
    const res = await this.abstraction.updateUrl(urlId, newUrl);
    response.send(res);
  };

  private deleteUrl = async (request: Request, response: Response) => {
    const { urlId } = request.params;
    try {
      await this.abstraction.deleteUrl(urlId);
      response.sendStatus(204);
    } catch (err) {
      console.log(err);
      console.log("Failed to delete the resource.");
      return response.sendStatus(500);
    }
  };
}

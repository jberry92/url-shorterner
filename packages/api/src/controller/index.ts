import { Router, Request, Response } from "express";
import { AnAbstraction } from "../abstraction";
export class URLShorternerController {
  public path = "/urls";
  public router = Router();
  private abstraction: AnAbstraction;

  constructor(abstraction: AnAbstraction) {
    this.abstraction = abstraction;
    this.router.get(this.path, this.getUrls);
    this.router.post(`${this.path}/create-url`, this.createUrl);
    this.router.patch(`${this.path}/update-url`, this.updateUrl);
    this.router.delete(`${this.path}/delete-url/:urlId`, this.deleteUrl);
  }

  private createUrl = async (request: Request, response: Response) => {
    const { fullUrl } = request.body;
    const res = await this.abstraction.createShortenedUrl(
      fullUrl
    );
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
      const { urlId } = request.params
      await this.abstraction.deleteUrl(urlId)
      response.send('Successfully deleted');
  };
}

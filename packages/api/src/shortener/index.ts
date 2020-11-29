import { IDatabase } from "../db/db-interface";
import { customAlphabet } from "nanoid";
import { nolookalikes } from "nanoid-dictionary";

export class UrlShortener {
  private db: IDatabase;
  private nanoid = customAlphabet(nolookalikes, 8);
  constructor(db: IDatabase) {
    this.db = db;
  }

  public async retrieveUrls() {
    const results: {
      _id: string;
      fullUrl: string;
    }[] = await this.db.getAll();

    const formattedResults = results.map((result) => this.buildObject(result));
    return formattedResults;
  }

  public async createShortenedUrl(fullUrl: string) {
    const urlId = this.createUrlId();
    await this.db.insert(urlId, { fullUrl });
    return this.buildObject({ _id: urlId, fullUrl });
  }

  public async updateUrl(urlId: string, newUrl: string) {
    await this.db.update(urlId, newUrl);
    return this.buildObject({_id: urlId, fullUrl: newUrl});
  }

  public async deleteUrl(urlId: string) {
    await this.db.delete(urlId);
    return;
  }

  private createUrlId(): string {
    return this.nanoid();
  }

  private buildObject({
    _id,
    fullUrl,
  }: {
    _id: string;
    fullUrl: string;
  }) {
    return {
      id: _id,
      shortUrl: `https://pbid.io/${_id}`,
      fullUrl,
    };
  }
}

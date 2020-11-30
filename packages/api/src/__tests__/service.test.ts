import request from "supertest";
import { createApp } from "../app";
import { MongoClient } from "mongodb";
import { Express } from "express";

const mockMongoMethods = {
  insertOne: jest.fn(),
  find: jest.fn(),
  deleteOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

const mongoMock = {
  db: () => ({
    collection: () => mockMongoMethods,
  }),
};
jest.mock("nanoid", () => ({
  customAlphabet: () => () => "12345",
}));
jest
  .spyOn(MongoClient, "connect")
  .mockImplementation((uri, options) => Promise.resolve(mongoMock));

describe("service", () => {
  let app: Express;
  beforeAll(async () => {
    app = await createApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should return 200 and  urls stored in mongo", async () => {
      const mockDbResult = {
        _id: "123456",
        fullUrl: "foo",
        shortUrl: "https://pbid.io/123456",
      };

      mockMongoMethods.find.mockImplementationOnce(() => ({
        toArray: () => [mockDbResult],
      }));

      const res = await request(app).get("/api/v1/urls");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: "123456", fullUrl: "foo", shortUrl: "https://pbid.io/123456" },
      ]);
    });

    it("should return 500 if an error is thrown from mongo", async () => {
      mockMongoMethods.find.mockImplementationOnce(() => ({
        toArray: () => new Error("An error"),
      }));

      const res = await request(app).get("/api/v1/urls");
      expect(res.status).toBe(500);
    });
  });

  describe("post", () => {
    it("should return 200 and return the created object if the body is valid", async () => {
      mockMongoMethods.insertOne.mockResolvedValueOnce({});

      const res = await request(app)
        .post("/api/v1/create-url")
        .send({ fullUrl: "https://www.google.co.uk" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: "12345",
        fullUrl: "https://www.google.co.uk",
        shortUrl: "https://pbid.io/12345",
      });
    });

    it("should return 400 when the body is malformed", async () => {
      const res = await request(app)
        .post("/api/v1/create-url")
        .send({ fullUrl: "google" });

      expect(res.status).toBe(400);
    });

    it("should return 500 if an error is thrown from mongo", async () => {
      mockMongoMethods.insertOne.mockRejectedValueOnce(new Error("An Error"));

      const res = await request(app)
        .post("/api/v1/create-url")
        .send({ fullUrl: "https://www.google.co.uk" });

      expect(res.status).toBe(500);
    });
  });

  describe("patch", () => {
    it("should return 200 and the new value if the body is valid", async () => {
      const requestBody = { urlId: "12345", newUrl: "https://www.test.com" };
      mockMongoMethods.findOneAndUpdate.mockResolvedValueOnce({
        value: { fullUrl: requestBody.newUrl, _i: requestBody.urlId },
      });

      const res = await request(app)
        .patch("/api/v1/update-url")
        .send(requestBody);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: "12345",
        fullUrl: "https://www.test.com",
        shortUrl: "https://pbid.io/12345",
      });
    });

    it("should return 400 if the body is invalid", async () => {
      const res = await request(app)
        .patch("/api/v1/update-url")
        .send({ invalid: "very invalid" });

      expect(res.status).toBe(400);
    });

    it("should return 500 if an error is thrown from mongo", async () => {
      const requestBody = { urlId: "12345", newUrl: "https://www.test.com" };
      mockMongoMethods.findOneAndUpdate.mockRejectedValueOnce(new Error('An error'))

      const res = await request(app)
        .patch("/api/v1/update-url")
        .send(requestBody);

      expect(res.status).toBe(500);

    });
  });

  describe("delete", () => {
    it("should return 204 if the resource is deleted", async () => {
      mockMongoMethods.deleteOne.mockResolvedValueOnce(true);

      const res = await request(app).delete("/api/v1/delete-url/12345");
      expect(res.status).toBe(204);
    });

    it("should return 500 if the delete fails", async () => {
      mockMongoMethods.deleteOne.mockRejectedValue({});

      const res = await request(app).delete("/api/v1/delete-url/12345");
      expect(res.status).toBe(500);
    });
  });
});

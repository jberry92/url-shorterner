export const config: { [key: string]: Config } = {
  testing: {
    db: {
      url: "mongodb://localhost:27017",
      collection: "shortenedUrls",
      name: "urls",
    },
    listeningPort: 3001,
  },
  dev: {
    db: {
      url: "mongodb://urldb:27017",
      collection: "shortenedUrls",
      name: "urls",
    },
    listeningPort: 3000,
  },
};

type Config = {
  db: {
    url: string;
    collection: string;
    name: string;
  };
  listeningPort: number;
};

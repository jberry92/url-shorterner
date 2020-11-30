import { createApp } from "./app";

createApp().then((app) =>
  app.listen(process.env.LISTENING_PORT || 3000, () =>
    console.log(`Server started. Listening on ${process.env.LISTENING_PORT}.`)
  )
);

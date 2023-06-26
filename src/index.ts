import express from "express";
import session from "express-session";
import { usersRouter } from "./routers/usersRouter";
import { postsRouter } from "./routers/postsRouter";
import { commentsRouter } from "./routers/commentsRouter";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import cookies from "cookie-parser";

import MongoDBStore from "connect-mongodb-session";
import { config } from "./config";

const app = express();
const port = config.port;

const MongoDBStoreSession = MongoDBStore(session);
const store = new MongoDBStoreSession({
  uri: `${config.mongoDBUri}/sessions`,
  collection: "sessions",
});

app.use(helmet({ contentSecurityPolicy: false }));
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookies());

app.use(
  session({
    secret: config.jwtSecretKey,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 3600000,
      secure: false,
    },
  })
);

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

mongoose
  .connect(`${config.mongoDBUri}/socialMedia`)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

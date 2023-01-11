import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./api/authors/index.js";
import articles from "./api/articles/index.js";
import filesRouter from "./api/files/index.js";
import {
  genericErrorHandler,
  notFound,
  forbidden,
  catchAllErrorHandler,
} from "./errorHandlers.js";

const server = express();

const port = process.env.PORT;
const whitelist = [process.env.FE_DEV_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    if (whitelist.indexOf(origin) !== -1) {
      corsNext(null, true);
    } else {
      corsNext(`Origin ${origin} is not in the whitelist`);
    }
  },
};

server.use(cors(corsOpts));
server.use(express.json());

// ******************* ENDPOINTS *********************

server.use("/authors", authorsRouter);
server.use("/articles", articles);
server.use("/files", filesRouter);

// ******************* ERROR HANDLERS *********************

server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server us running on port: ", port);
});

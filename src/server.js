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

const port = 3001;
server.use(express.json());
server.use(cors());

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

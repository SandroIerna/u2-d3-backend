import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import articles from "./api/articles/index.js";

const server = express();

const port = 3001;
server.use(express.json());
server.use(cors());
server.use("/articles", articles);
server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server us running on port: ", port);
});

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const articlesJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "articles.json"
);

console.log("TARGET--->", articlesJSONPath);

const articlesRouter = express.Router();

// // 1 POST
articlesRouter.post("/", (req, res) => {
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));

  const newAuthor = {
    ...req.body,
    createdAt: new Date(),
    _id: uniqid(),
    cover: "https://picsum.photos/seed/mountain/1920/1080",
    readTime: {
      value: 2,
      unit: "minute",
    },
  };

  articlesArray.push(newAuthor);
  fs.writeFileSync(articlesJSONPath, JSON.stringify(articlesArray));
  res.status(200).send({ id: newAuthor._id });
});

// 2 GET
articlesRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(articlesJSONPath);
  const articles = JSON.parse(fileContent);
  res.send(articles);
});

// // 3 SINGLE AUTHOR GET
articlesRouter.get("/:articleId", (req, res) => {
  const articleID = req.params.articleId;
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));
  const foundArticle = articlesArray.find(
    (article) => article.id === articleID
  );
  res.send(foundArticle);
});

// // 4 PUT
articlesRouter.put("/:articleId", (req, res) => {
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));
  const index = articlesArray.findIndex(
    (article) => article.id === req.params.articleId
  );
  const updatedArticle = { ...oldArticle, ...req.body, updatedAt: new Date() };
  articlesArray[index] = updatedArticle;
  fs.writeFileSync(articlesJSONPath, JSON.stringify(articlesArray));
  res.send(updatedArticle);
});

// // 5 DELETE
articlesRouter.delete("/:articleId", (req, res) => {
  const articlesArray = JSON.parse(fs.readFileSync(articlesJSONPath));
  const remainingArticles = articlesArray.filter(
    (article) => article._id !== req.params.articleId
  );
  fs.writeFileSync(articlesJSONPath, JSON.stringify(remainingArticles));
  res.status(204).send();
});

export default articlesRouter;

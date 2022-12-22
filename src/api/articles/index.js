import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { checksArticleSchema } from "./validator.js";

const articlesJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "articles.json"
);

const articlesRouter = express.Router();

const getArticles = () => JSON.parse(fs.readFileSync(articlesJSONPath));
const writeArticles = (articlesArray) =>
  fs.writeFileSync(articlesJSONPath, JSON.stringify(articlesArray));

// // 1 POST
articlesRouter.post("/", checksArticleSchema, (req, res, next) => {
  try {
    const articlesArray = getArticles();
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
    writeArticles(articlesArray);
    res.status(200).send({ id: newAuthor._id });
  } catch (error) {
    next(error);
  }
});

// 2 GET
articlesRouter.get("/", (req, res, next) => {
  try {
    const fileContent = fs.readFileSync(articlesJSONPath);
    const articles = JSON.parse(fileContent);
    res.send(articles);
  } catch (error) {
    next(error);
  }
});

// // 3 SINGLE AUTHOR GET
articlesRouter.get("/:articleId", (req, res, next) => {
  try {
    const articleID = req.params.articleId;
    const articlesArray = getArticles();
    const foundArticle = articlesArray.find(
      (article) => article.id === articleID
    );
    if (!foundArticle) {
      res.status(404).send({ message: "not found" });
    } else {
      res.send(foundArticle);
    }
  } catch (error) {
    next(error);
  }
});

// // 4 PUT
articlesRouter.put("/:articleId", (req, res, next) => {
  try {
    const articlesArray = getArticles();
    const index = articlesArray.findIndex(
      (article) => article.id === req.params.articleId
    );
    const updatedArticle = {
      ...oldArticle,
      ...req.body,
      updatedAt: new Date(),
    };
    articlesArray[index] = updatedArticle;
    writeArticles(articlesArray);
    res.send(updatedArticle);
  } catch (error) {
    next(error);
  }
});

// // 5 DELETE
articlesRouter.delete("/:articleId", (req, res, next) => {
  try {
    const articlesArray = getArticles();
    const remainingArticles = articlesArray.filter(
      (article) => article._id !== req.params.articleId
    );
    writeArticles(remainingArticles);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default articlesRouter;

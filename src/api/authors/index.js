import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import multer from "multer";
import fse from "fs-extra";

const { readJSON, writeFile } = fse;
const publicFolderPath = join(process.cwd(), "./public/img/users");
console.log("----------->", publicFolderPath);

const saveUsersAvatars = (fileName, contentAsABuffer) =>
  writeFile(join(publicFolderPath, fileName), contentAsABuffer);

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);

const authorsRouter = express.Router();

// 1 POST
authorsRouter.post("/", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));
  const alreadyUsed = authorsArray.includes(req.email);

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };

  authorsArray.push(newAuthor);
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));
  res.status(200).send({ id: newAuthor.id });
  res.send(console.log(alreadyUsed));
});

// 2 GET
authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath);
  const authors = JSON.parse(fileContent);
  res.send(authors);
});

// 3 SINGLE AUTHOR GET
authorsRouter.get("/:authorId", (req, res) => {
  const authorID = req.params.authorId;
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));
  const foundAuthor = authorsArray.find((author) => author.id === authorID);
  res.send(foundAuthor);
});

// 4 PUT
authorsRouter.put("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));
  const index = authorsArray.findIndex(
    (author) => author.id === req.params.authorId
  );
  const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };
  authorsArray[index] = updatedAuthor;
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));
  res.send(updatedAuthor);
});

// 5 DELETE
authorsRouter.delete("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));
  const remainingAuthors = authorsArray.filter(
    (author) => author.id !== req.params.authorId
  );
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));
  res.status(204).send();
});

/************************************** AVATAR SECTION **************************************** */

authorsRouter.post(
  "/:authorId/uploadAvatar",
  multer().single("avatar"),
  async (req, res, next) => {
    try {
      const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));
      const index = authorsArray.findIndex(
        (author) => author.id === req.params.authorId
      );
      console.log("FILE: ", req.file);
      const fileName = req.params.authorId + ".gif";
      await saveUsersAvatars(fileName, req.file.buffer);
      // const url = `http://localhost:3001/img/users/${fileName}`;
      // const updatedAuthor = {
      //   ...oldAuthor,
      //   avatar: url,
      //   updatedAt: new Date(),
      // };
      // authorsArray[index] = updatedAuthor;
      // fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));
      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default authorsRouter;

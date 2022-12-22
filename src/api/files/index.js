import express from "express";
import multer from "multer";

const filesRouter = express.Router();

filesRouter.post(
  "/single",
  multer().single("avatar"),
  async (req, res, next) => {
    try {
      console.log("FILE: ", req.file);
      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.post("/multiple", multer().array()),
  async (req, res, next) => {
    try {
      console.log("FILE: ", req.file.buffer);
      res.send("File uploaded");
    } catch (error) {
      next(error);
    }
  };

export default filesRouter;

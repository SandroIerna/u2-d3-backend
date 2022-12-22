import { checkSchema } from "express-validator";

const articleSchema = {
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is a mandatory field and needs to be a string!",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field and needs to be a string!",
    },
  },
  cover: {
    in: ["body"],
    isString: {
      errorMessage: "Cover is a mandatory field and needs to be a string!",
    },
  },
  "readTime.value": {
    in: ["body"],
    isString: {
      errorMessage:
        "Read Time Value is a mandatory field and needs to be a string!",
    },
  },
  "readTime.unit": {
    in: ["body"],
    isString: {
      errorMessage:
        "Read Time Unit is a mandatory field and needs to be a string!",
    },
  },
  "author.name": {
    in: ["body"],
    isString: {
      errorMessage:
        "Author Name is a mandatory field and needs to be a string!",
    },
  },
  "author.avatar": {
    in: ["body"],
    isString: {
      errorMessage:
        "Author Avatar is a mandatory field and needs to be a string!",
    },
  },

  content: {
    in: ["body"],
    isString: {
      errorMessage: "Content is a mandatory field and needs to be a string!",
    },
  },
  createdAt: {
    in: ["body"],
    isString: {
      errorMessage: "Date is a mandatory field and needs to be a string!",
    },
  },
};

export const checksArticleSchema = checkSchema(articleSchema);
export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Blog post validation is failed");
    error.status = 400;
    error.errors = errors.array();
    next(error);
  }
  next();
};

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
  readTime: {
    value: {
      in: ["body.author"],
      isInt: {
        errorMessage: "Value is a mandatory field and needs to be a string!",
      },
    },
    unit: "minute",
  },
  author: {
    name: {
      in: ["body.author"],
      isString: {
        errorMessage:
          "Author name is a mandatory field and needs to be a string!",
      },
    },
    avatar: {
      in: ["body.author"],
      isString: {
        errorMessage:
          "Author avatar is a mandatory field and needs to be a string!",
      },
    },
  },
  content: "HTML",
  createdAt: "NEW DATE",
};

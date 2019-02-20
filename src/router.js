const {
  homeHandler,
  publicHandler,
  errorHandler,
  handelAdd,
  handelSignIn,
  handelProfilePage,
  handelSignUp
} = require("./handlers");

const fs = require("fs");
const path = require("path");

const router = (req, res) => {
  const endPoint = req.url;

  if (endPoint === "/") {
    homeHandler(req, res);
  } else if (endPoint === "/get-posts") {
    handelProfilePage(req, res);
  } else if (endPoint.includes("/public/")) {
    publicHandler(req, res);
  } else if (endPoint === "/add-post") {
    handelAdd(req, res);
  } else if (endPoint === "/signin") {
    handelSignIn(req, res);
  } else if (endPoint === "/signup") {
    handelSignUp(req, res);
  } else {
    errorHandler(res);
  }
};

module.exports = router;

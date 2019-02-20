const {
  homeHandler,
  publicHandler,
  errorHandler,
  handelAdd,
  handelSignIn,
  handelSignUp
} = require("./handlers");

const fs = require("fs");
const path = require("path");

const router = (req, res) => {
  const endPoint = req.url;

  if (endPoint === "/") {
    if (req.headers.cookie) {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "html",
        "landing-page.html"
      );
      fs.readFile(filePath, (err, file) => {
        if (err) {
          res.writeHead(500, { "content-type": "text/html" });
          res.end("<h1>Server Error</h1>");
        } else {
          res.writeHead(200, { "content-type": "text/html" });
          res.end(file);
        }
      });
    } else {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "html",
        "landing-page.html"
      );
<<<<<<< HEAD
      fs.readFile(filePath, (err, response) => {
=======
      fs.readFile(filePath, (err, file) => {
>>>>>>> fcd37d0bca2c6015a3f855306c5f3941aac04b97
        if (err) {
          res.writeHead(500, { "content-type": "text/html" });
          res.end("<h1>Server Error</h1>");
        } else {
          res.writeHead(200, { "content-type": "text/html" });
<<<<<<< HEAD
          res.end(response);
=======
          res.end(file);
>>>>>>> fcd37d0bca2c6015a3f855306c5f3941aac04b97
        }
      });
    }
  } else if (endPoint.includes("/public/")) {
    publicHandler(req, res);
  } else if (endPoint === "/add-post") {
    handelAdd(req, res);
<<<<<<< HEAD
  } else if (endPoint === '/sign-in') {
    handelSignIn(req,res);
  }
  else if (endPoint === '/sign-up') {
    handelSignUp(req,res);
  }
  else {
=======
  } else if (endPoint === "/signin") {
    handelSignIn(req, res);
  } else if (endPoint === "/signup") {
    handelSignUp(req,res);
  } else {
>>>>>>> fcd37d0bca2c6015a3f855306c5f3941aac04b97
    errorHandler(res);
  }
};

module.exports = router;

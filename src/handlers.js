const { readFile } = require("fs");
const path = require("path");
const queryString = require("querystring");
const { postD, postsignIn, postsignUp } = require("./queries/addPost.js");
const { parse } = require("cookie");
const { getUserData, checkUser, getUserId } = require("./queries/getPosts");
const addPost = require("./queries/addPost");
require("env2")("./config.env");

const homeHandler = (req, res) => {
  let cookie;
  try {
    cookie = parse(req.headers.cookie);
  } catch (error) {}
  if (cookie && !isNaN(cookie.user_id)) {
    const filepath = path.join(
      __dirname,
      "..",
      "public",
      "html",
      "profile.html"
    );
    readFile(filepath, (err, file) => {
      if (err) serverError(res);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    });
  } else {
    const filepath = path.join(
      __dirname,
      "..",
      "public",
      "html",
      "landing-page.html"
    );
    readFile(filepath, (err, file) => {
      if (err) serverError(res);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(file);
    });
  }
};
const handelSignUp = (req, res) => {
  const filepath = path.join(
    __dirname,
    "..",
    "public",
    "html",
    "landing-page.html"
  );
  readFile(filepath, (err, file) => {
    if (err) serverError(res);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(file);
  });

  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    const convertedData = queryString.parse(allData);
    req.on("end", () => {
      const convertedData = JSON.parse(allData);

      usersignUp(
        convertedData.username,
        convertedData.pass,
        (error, response) => {
          if (error) {
            res.writeHead(500, { "content-type": "text/html" });
            res.end("<h1>Server/Database Error</h1>");
          } else {
            res.writeHead(302, { location: "/" });
            res.end();
          }
        }
      );
    });
  });
};
const handelSignIn = (req, res) => {
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    const convertedData = queryString.parse(allData);
    checkUser(
      convertedData["signin-username"],
      convertedData.password,
      (error, response) => {
        if (error) {
          res.writeHead(500, { "content-type": "text/html" });
          res.end("<h1>Server/Database Error</h1>");
        } else {
          if (response.length !== 0) {
            res.writeHead(302, {
              location: "/",
              "Set-Cookie": `user_id=${response[0].user_id}`
            });
            res.end();
          } else {
            res.writeHead(302, { location: "/" });
            res.end();
          }
        }
      }
    );
  });
};
const serverError = res => {
  res.writeHead(500, { "Content-Type": "text/html" });
  res.end("<h1>Sorry, there was a problem loading the homepage</h1>");
};
const publicHandler = (req, res) => {
  const filepath = path.join(__dirname, "..", req.url);
  readFile(filepath, (err, file) => {
    if (err) return serverError(res);
    const extension = path.extname(req.url).split(".")[1];
    const extensionType = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      ico: "image/x-icon"
    };
    res.writeHead(200, { "content-type": extensionType[extension] });
    res.end(file);
  });
};

const handelAdd = (req, res) => {
  let allData = "";
  req.on("data", chunk => {
    allData += chunk;
  });
  req.on("end", () => {
    //   const userID =
    const convertedData = queryString.parse(allData);
    addPost(convertedData, (error, response) => {
      if (error) {
        res.writeHead(500, { "content-type": "text/html" });
        res.end("<h1>Server/Database Error</h1>");
      } else {
        res.writeHead(302, { location: "/" });
        res.end();
      }
    });
  });
};

const errorHandler = response => {
  response.writeHead(404, { "content-type": "text/html" });
  response.end("<h1>404 Page Requested Cannot be Found</h1>");
};

const handelProfilePage = (req, res) => {
  getUserData((err, result) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>Server Error</h1>");
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(result));
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  errorHandler,
  handelAdd,
  handelSignIn,
  handelProfilePage,
  handelSignUp
};

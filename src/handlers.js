const { readFile } = require("fs");
const path = require("path");
const queryString = require("querystring");
const { addPost, usersignUp } = require("./queries/addPost.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sign, verify } = require('jsonwebtoken');
const { parse } = require("cookie");
const {
  getUserData,
  checkUser,
  checkUserFound
} = require("./queries/getPosts");

require("env2")("./config.env");

const hashFunction = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) cb(err);
    bcrypt.hash(password, salt, cb);
  });
};

const homeHandler = (req, res) => {
  let cookie;
  try {
    cookie = parse(req.headers.cookie);
  } catch (error) {}
  if (cookie && cookie.jwt !== 'none') {
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

const handelSignUp = (request, res) => {
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
  request.on("data", chunk => {
    allData += chunk;
  });
  request.on("end", () => {
    const convertedData = JSON.parse(allData);

    checkUserFound(convertedData.username, (err, foundRsult) => {
      if (foundRsult.length === 0) {
        hashFunction(convertedData.pass, (err, result) => {
          if (err) {
            res.writeHead(500, { "content-type": "text/html" });
            res.end("<h1>Server Error</h1>");
          } else {
            usersignUp(convertedData.username, result, (error, response) => {
              if (error) {
                res.writeHead(500, { "content-type": "text/html" });
                res.end("<h1>Server/Database Error</h1>");
              } else {
                res.writeHead(200, { location: "/" });
                res.end();
              }
            });
          }
        });
      } else {
        console.log("this user already exists");
        res.writeHead(200, {
          "content-type": "text/html",
          location: "/signup"
        });
        res.end("this user already exists");
      }
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
            const signedData = jwt.sign(
              JSON.stringify({ user_id: response[0].user_id }),
              process.env.SECRET
            );
            res.writeHead(302, {
              location: "/",
              "Set-Cookie": `jwt=${signedData}`
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
    const convertedData = queryString.parse(allData).post;
    const jwt = parse(req.headers.cookie).jwt;
    let userId ='';
    verify(jwt, process.env.SECRET, (err, jwt) => userId=jwt. user_id);
    addPost(convertedData,userId, (error, response) => {
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

const handellogout =(req,res)=>{

  res.writeHead(
    302,
    {
      'Set-Cookie': 'jwt=none; Max-Age=0',
      location: "/" ,
      'content-type':'text/html'
    }
  );
  res.end();
};

module.exports = {
  homeHandler,
  publicHandler,
  errorHandler,
  handelAdd,
  handelSignIn,
  handelProfilePage,
  handelSignUp,
  handellogout
};

const {
  homeHandler,
  publicHandler,
  errorHandler,
  handelAdd,
  handelSignIn,
  handelProfilePage,
  handellogout,
  handelSignUp
} = require("./handlers");



const router = (req, res) => {
  const endPoint = req.url;

  if (endPoint === "/") {
    homeHandler(req, res);
  } else if (endPoint === "/get-posts"&& (req.headers.cookie)) {
    handelProfilePage(req, res);
  } else if (endPoint.includes("/public/")) {
    publicHandler(req, res);
  } else if (endPoint === "/add-post"&& (req.headers.cookie)) {
    handelAdd(req, res);
  } else if (endPoint === "/signin") {
    handelSignIn(req, res);
  } else if (endPoint === "/signup") {
    handelSignUp(req, res);
  }else if (endPoint === "/logout" && (req.headers.cookie))
  handellogout(req,res);
  else {
    errorHandler(res);
  }
};

module.exports = router;
const {
    homeHandler,
    publicHandler,
    errorHandler,
    handelAdd,
    handelProfilePage,
    handelSignIn,
    handelSignUp
  } = require("./handlers");
  
  const router = (req, res) => {
    const endPoint = req.url;
  
    if (endPoint === "/" ) {
      handelSignIn(req,res);
    }
    else if (endPoint === "/get-posts" && req.headers.cookie && req.headers.cookie.jwt){
      handelProfilePage = (req,res);
    }
    else if (endPoint.includes("/public/")) {
      publicHandler(req, res);
    } 
    else if(endPoint === '/add-post'){
       handelAdd(req,res);
    }
    else if(endPoint === '/signin'){
        handelSignIn(req,res);

    }
    else if(endPoint === '/signup'){
        handelSignUp(req,res);

    }

     else {
      errorHandler(res);
    }
  };
  
  module.exports = router;
  
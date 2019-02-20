const {
    homeHandler,
    publicHandler,
    errorHandler,
    handelAdd,
    handelSignIn,
    handelSignUp
  } = require("./handlers");
  const router = (req, res) => {
    const endPoint = req.url;
<<<<<<< HEAD
    if (endPoint === "/") {
      homeHandler(req, res);
=======
  
    if (endPoint === "/" && req.method==='POST') {
      handelSignIn(req,res);
>>>>>>> 19f7506328bf00959863e1e967245f50887d0a9a
    } else if (endPoint.includes("/public/")) {
      publicHandler(req, res);
    } 
    else if(endPoint === '/add-post'){
       handelAdd(req,res);
    }
<<<<<<< HEAD
    else if(endPoint === '/signin'){
        handelSignIn(req.res);
    }
    else if(endPoint === '/signup'){
        handelSignUp(req.res);
=======
    // else if(endPoint === '/signin'){
    //     handelSignIn(req,res);

    }
    else if(endPoint === '/signup'){
        handelSignUp(req,res);

>>>>>>> 19f7506328bf00959863e1e967245f50887d0a9a
    }
     else {
      errorHandler(res);
    }
  };
  
  module.exports = router;
  
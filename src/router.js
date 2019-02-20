const {
    homeHandler,
    publicHandler,
    errorHandler,
    handelAdd,
    handelSignIn,
    handelSignUp
  } = require("./handlers");
const fs = require('fs');
const path = require('path');


  const router = (req, res) => {
    const endPoint = req.url;
  
    if (endPoint === "/") {
        if(req.headers.cookie){
            const filePath = path.join(__dirname,'..','public','html','landing-page.html');
            fs.readFile(filePath,(err,res)=>{
                if(err){
                    res.writeHead(500,{'content-type':'text/html'});
                    res.end('<h1>Server Error</h1>');
                }
                else {
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(res);
                }
            })
          }
          else {
            const filePath = path.join(__dirname,'..','public','html','landing-page.html');
            fs.readFile(filePath,(err,res)=>{
                if(err){
                    res.writeHead(500,{'content-type':'text/html'});
                    res.end('<h1>Server Error</h1>');
                }
                else {
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(res);
                }
            })
          }
    //   handelSignIn(req,res);
    } else if (endPoint.includes("/public/")) {
      publicHandler(req, res);
    } 
    else if(endPoint === '/add-post'){
       handelAdd(req,res);
    }
    // else if(endPoint === '/signin'){
    //     handelSignIn(req,res);

   // }
    else if(endPoint === '/signup'){
        handelSignUp(req,res);

    }

     else {
      errorHandler(res);
    }
  };


  module.exports = router;
  
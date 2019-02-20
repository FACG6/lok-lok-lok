const { readFile } = require('fs');
const path = require('path');
const queryString = require('querystring');
const { postD, usersignUp } = require('./queries/addPost.js');
const { checkUser } = require('./queries/getPosts');


const homeHandler = (req, res) => {
    if (req.headers.cookie) {
        const filepath = path.join(__dirname, '..', 'public', 'html', 'profile.html');
        readFile(filepath, (err, file) => {
            if (err) serverError(res);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(file);
        });
    }
    else {
        const filepath = path.join(__dirname, '..', 'public', 'html', 'landing-page.html');
        readFile(filepath, (err, file) => {
            if (err) serverError(res);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(file);
        });
    }
};
const handelSignUp = (req, res) => {
    const filepath = path.join(__dirname, '..', 'public', 'html', 'landing-page.html');
    readFile(filepath, (err, file) => {
        if (err) serverError(res);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
    });

    let allData = '';
    req.on('data', (chunk) => {
        allData += chunk;
    });
    req.on('end', () => {
        const convertedData = queryString.parse(allData);
        usersignUp(convertedData, (error, response) => {
            if (error) {
                res.writeHead(500, { 'content-type': 'text/html' });
                res.end('<h1>Server/Database Error</h1>');
            } else {
                res.writeHead(302, { location: '/' });
                res.end();
            }
        });
    });
};
const handelSignIn = (req, res) => {
    let allData = '';
    req.on('data', (chunk) => {
        allData += chunk;
    });
    req.on('end', () => {
        const convertedData = queryString.parse(allData);
        console.log(convertedData);
        checkUser(password, user, (error, response) => {
            if (error) {
                res.writeHead(500, { 'content-type': 'text/html' });
                res.end('<h1>Server/Database Error</h1>');
            } else {
                if (password == response.pas) {
                    const filepath = path.join(__dirname, '..', 'public', 'html', 'profile.html');
                    readFile(filepath, (err, file) => {
                        if (err) serverError(res);
                        res.writeHead(200, { 'Content-Type': 'text/html', 'Set-Cookie': 'logged_in=true' });
                        res.end(file);
                    });

                }
            }
        });

    })
}
const serverError = res => {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Sorry, there was a problem loading the homepage</h1>');
};
const publicHandler = (req, res) => {
    const filepath = path.join(__dirname, '..', req.url);
    readFile(filepath, (err, file) => {
        if (err) return serverError(res);
        const extension = path.extname(req.url).split('.')[1];
        const extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
        };
        res.writeHead(200, { 'content-type': extensionType[extension] });
        res.end(file);
    });
};


const handelAdd = (req, res) => {
    let allData = '';
    req.on('data', (chunk) => {
        allData += chunk;
    });
    req.on('end', () => {
        const convertedData = queryString.parse(allData);
        postD(convertedData, (error, response) => {
            if (error) {
                res.writeHead(500, { 'content-type': 'text/html' });
                res.end('<h1>Server/Database Error</h1>');
            } else {
                res.writeHead(302, { location: '/' });
                res.end();
            }
        });
    });
};




const errorHandler = (response) => {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>404 Page Requested Cannot be Found</h1>');
};



module.exports = {
    homeHandler,
    publicHandler,
    errorHandler,
    handelAdd,
    handelSignIn,
    handelSignUp

}
const { readFile } = require('fs');
const path = require('path');
const queryString = require('querystring');
const { postD, postsignIn, postsignUp, usersignUp } = require('./queries/addPost.js');
const { getUserData, checkUser, getUserId } = require('./queries/getPosts');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'fg!efd4g4gh*efgDF4#T3YDF';


const hashFunction = (password, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) cb(err);
        bcrypt.hash(password, salt, cb)
    })
}

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
const handelSignUp = (request, res) => {
    const filepath = path.join(__dirname, '..', 'public', 'html', 'landing-page.html');
    readFile(filepath, (err, file) => {
        if (err) serverError(res);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(file);
    });
    let allData = '';
    request.on('data', (chunk) => {
        allData += chunk;
    });
    request.on('end', () => {
        const convertedData = JSON.parse(allData);
        hashFunction(convertedData.pass, (err, result) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/html' });
                res.end('<h1>Server Error</h1>');
            }
            else {
                usersignUp(convertedData.username, result, (error, id, response) => {
                    if (error) {
                        res.writeHead(500, { 'content-type': 'text/html' });
                        res.end('<h1>Server/Database Error</h1>');
                    } else {
                        console.log(5555544444444444444, id);
                        const signedData = jwt.sign(JSON.stringify({ user_id: id }), secret);
                        console.log(signedData);
                        res.writeHead(302, { 'location': '/', 'set-cookie': `jwt=${signedData}` });
                        res.end();
                    }
                });
            }
        })
    });
};
const handelSignIn = (req, res) => {
    let allData = '';
    req.on('data', (chunk) => {
        allData += chunk;
    });
    req.on('end', () => {
        const convertedData = queryString.parse(allData);
        checkUser(convertedData['signin-username'], convertedData.password, (error, response) => {
            if (error) {
                res.writeHead(500, { 'content-type': 'text/html' });
                res.end('<h1>Server/Database Error</h1>');
            } else {
                const filepath = path.join(__dirname, '..', 'public', 'html', 'profile.html');
                readFile(filepath, (err, file) => {
                    if (err) serverError(res);
                    res.writeHead(200, { 'Content-Type': 'text/html', 'Set-Cookie': 'logged_in=true' });
                    res.end(file);
                });


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
        const convertedData = JSON.parse(allData);
        postsignUp(convertedData, (error, response) => {
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
};

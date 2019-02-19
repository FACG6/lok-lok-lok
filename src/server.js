const http = require('http');
const port = process.env.PORT || 5000;
const router = require('./router');
const server = http.createServer(router);

server.listen(port, ()=>{ console.log(`Server is running on port ${port}`) })
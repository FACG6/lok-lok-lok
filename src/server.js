const http = require('http');
const router = require('./router');

const port = process.env.PORT || 5000;
const server = http.createServer(router);
server.listen(port, () => console.log(`server running on ${port} port`));

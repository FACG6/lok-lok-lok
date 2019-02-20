const http = require('http');
const router = require('./router');

const port = process.env.PORT || 7425;
const server = http.createServer(router);
server.listen(port, () => console.log(`server running on ${port} port`));

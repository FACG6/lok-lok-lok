const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env')
let dbURL = process.env.database_url;
if (!dbURL) throw new Error ('there is no url');
const params = url.parse(dbURL);
const [userName, password] = params.auth.split(':');
const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTION || 2,
  user: userName,
  password,
  ssl: process.env.hostname !== 'localhost',
};
module.exports = new Pool(options);

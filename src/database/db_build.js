const path = require("path");
const fs = require("fs");
const dbConnection = require("./db_connection");

const sql = fs.readFileSync(path.join(__dirname, "db_build.sql")).toString();

const runDbBuild = () => {
  dbConnection.query(sql, () => console.log("Database was built succesfully"));
};

module.exports = runDbBuild;

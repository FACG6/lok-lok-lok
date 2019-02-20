const dbConnection = require("../database/db_connection");

const addPost = (postContent, user_key, cb) => {
  const sql = `INSERT INTO posts (post_content,user_key) VALUES ($1,$2)`;
  const values = [postContent, user_key];
  dbConnection.query(sql, values, (err, res) => {
    if (err) cb(err);
    cb(null, "Successfully added");
  });
};
module.exports = addPost;
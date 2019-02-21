const dbConnection = require("../database/db_connection");
const bcrypt = require("bcryptjs");

const getUserData = cb => {
  dbConnection.query(
    `SELECT user_name, post_content from users join posts on user_key = user_id`,
    (err, res) => {
      if (err) cb(err);
      cb(null, res.rows);
    }
  );
};

const checkUser = (username, password, cb) => {
  dbConnection.query(
    `SELECT user_id, user_name, user_password from users where user_name = '${username}'`,
    (err, res) => {
      if (err) cb(err);
      else {
        bcrypt.compare(password, res.rows[0].user_password, (error,result)=>{
            if (error) throw new Error ('error in comparing password');
            cb(null, res.rows);
        });
      }
    }
  );
};

const checkUserFound = (username, cb) => {
    dbConnection.query(`SELECT * from users where user_name = '${username}'`, (err, res) => {
            if (err) cb(err);
            else {
                cb(null, res.rows);
            }
        }
    );
};

const getUserId = (username, cb) => {
  dbConnection.query(
    `select user_id from users where user_name = '${username}'`,
    (err, res) => {
      if (err) cb(err);
      cb(null, res.rows);
    }
  );
};

module.exports = { getUserData, checkUser, getUserId ,checkUserFound };

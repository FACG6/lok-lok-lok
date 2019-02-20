const dbConnection = require('../database/db_connection');

const getUserData = (user_id,cb) => {
    dbConnection.query(`SELECT user_name, post_content from users join posts on user_key = user_id where user_key =${user_id}`, (err, res) => {
        if (err) cb(err);
        cb(null, res.rows);
    });
}

const checkUser = (username, password, cb) => {
    dbConnection.query(`SELECT user_name, user_password from users where user_name = '${username}' AND user_password = '${password}'`, (err, res) => {
        if (err) cb(err);
        else {
            cb(null,res.rows);
        }
    })
}

const getUserId = (cb) => {
    dbConnection.query('SELECT user_id from users ', (err, res) => {
        if (err) cb(err);
        cb(null, res.rows);
    })
}

module.exports = { getUserData, checkUser, getUserId };
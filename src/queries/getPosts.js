const dbConnection = require('../database/db_connection');

const getUserData = (cb) => {
    dbConnection.query('SELECT user_name, post_content from users join posts on user_key = user_id', (err, res) => {
        if (err) cb(err);
        cb(null, res);
    });
}

const checkUser = (user_name, password, cb) => {
    dbConnection.query(`SELECT user_name, user_password from users where user_name = '${user_name}' AND user_password = '${password}'`, (err, res) => {
        if (err) cb(err);
        else {
            cb(null, 'user does exist');
        }
    })
}
const getUserId = (user_id, cb) => {
    dbConnection.query(`select user_id from users where user_id = '${user_id}'`, (err, res) => {
        if (err) cb(err);
        cb(null, res.rows);
    })
}

module.exports = { getUserData, checkUser, getUserId };

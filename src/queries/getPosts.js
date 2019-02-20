const dbConnection = require("../database/db_connection");

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
        `SELECT user_id, user_name, user_password from users where user_name = '${username}' AND user_password = '${password}'`,
        (err, res) => {
            if (err) cb(err);
            else {
                cb(null, res.rows);
            }
        }
    );
};

// const checkUserFound = (username, cb) => {
//     console.log(username);
//     dbConnection.query(`SELECT * from users where user_name = '${username}'`, (err, res) => {
//             if (err) cb(err);
//             else {
//                 console.log(55555555555555555, res);
//                 cb(null, res);
//             }
//         }
//     );
// };

const getUserId = (username, cb) => {
    dbConnection.query(
        `select user_id from users where user_name = '${username}'`,
        (err, res) => {
            if (err) cb(err);
            cb(null, res.rows);
        }
    );
};

module.exports = { getUserData, checkUser, getUserId };

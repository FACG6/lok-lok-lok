const dbConnection = require("../database/db_connection");

const addPost = (postContent, user_key, cb) => {
    const sql = `INSERT INTO posts (post_content,user_key) VALUES ($1,$2)`;
    const values = [postContent, user_key];
    dbConnection.query(sql, values, (err, res) => {
        if (err) cb(err);
        cb(null, "Successfully added");
    });
};

const usersignUp = (userName, password, cb) => {
    const sql = `INSERT INTO users (user_name,user_password) VALUES ($1,$2)`;
    const values = [userName, password];
    dbConnection.query(sql, values, (err, res) => {
        if(err) cb(err);
        cb(null,'Signed up successfully');
    });
}

module.exports = { addPost, usersignUp };
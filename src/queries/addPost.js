
const dbConnection = require('../database/db_connection');

const addPost = (postContent,username,cb)=>{
    const sql = `INSERT INTO posts (post_content,user_key) VALUES ($1,$2)`
    const values = [postContent,(`SELECT user_id FROM users WHERE user_name = '${username}'`)];
    dbConnection.query(sql,values,(err,res)=>{
        if(err) cb(err);
        cb(null,'Successfully added');
    });
}
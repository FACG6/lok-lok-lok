const dbConnection = require('../database/db_connection');

const getUserData = (cb) =>{
    dbConnection.query('SELECT user_name, post_content from users join posts on user_key = user_id', (err,res)=>{
        if(err) cb(err);
        cb(null,res);
    });
}
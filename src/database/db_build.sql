BEGIN;

DROP TABLE IF EXISTS users ,posts;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    user_password VARCHAR NOT NULL
    );

CREATE TABLE posts(
    post_id SERIAL PRIMARY key,
    post_content TEXT NOT NULL,
     user_key INTEGER REFERENCES users(user_id)
);
INSERT INTO users (user_name,user_password)
    values('anies','123456K'),
    ('jamalat','456789a'),
    ('nareman','aaaa'),
    ('ahmed','hhhh');


INSERT INTO posts (post_content, user_key) 
VALUES ('صمتي لغتي',1),
       ('اسيرة الاحزان',2),
      ('عائلتي مملكتي',3),
      ('الانسان كالبني ادم اذا توفي مات',4);

    
COMMIT;

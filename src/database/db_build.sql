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
    values('anies','$2a$10$5whX4h3IxCLHT1UH2aQ04.JtupEGuCnz/40U.1N/kxBsBoFrDp97.'),
    ('jamalat','$2a$10$aSpYt7zpAa5rjJxgoj3px.wcXOff4nZl0s2X.HP5BpFWTbePVbqzW'),
    ('nareman','$2a$10$FFGsGVEfPDhrPuXPjpuTeeYypu4GCAQqI/RvJ/GLhWT0XArzqdAiu'),
    ('ahmed','$2a$10$ujVAoHFWk8.98BWq5XK4MOndql6uANucqEkCnUfVQuwXBHX9CHLKq');


INSERT INTO posts (post_content, user_key) 
VALUES ('صمتي لغتي',1),
       ('اسيرة الاحزان',2),
      ('عائلتي مملكتي',3),
      ('الانسان كالبني ادم اذا توفي مات',4);

    
COMMIT;

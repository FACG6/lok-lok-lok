const tape = require('tape');
const  runDbBuild = require('../src/database/db_build');
const { getUserData, checkUser, getUserId } = require('../src/queries/getPosts');
const addPost=require('../src/queries/addPost');

tape('test getUserData function ', (t) => {
  runDbBuild((err, res) => {
    if (err) t.error(err, 'Error');
    const expected = [ { user_name: 'anies', post_content: 'صمتي لغتي' } ];
    getUserData(1,(err, result) => {
      if (err) t.error(err);
      t.deepEqual(result, expected, 'test  getUserData is done');
      t.end();
    });
  });
});

tape('test checkUser function ', (t) => {
    runDbBuild((err, res) => {
      if (err) t.error(err, 'Error');
      const expected =  [ { user_name: 'anies', user_password: '123456K' } ];
      checkUser('anies', '123456K', (err, result) => {
        if (err) t.error(err);
        t.deepEqual(result, expected, 'test  checkUser is done');
        t.end();
      });
    });
  });
  tape('test getUserId  function ', (t) => {
    runDbBuild((err, res) => {
      if (err) t.error(err, 'Error');
      const expected = [ { user_id: 1 }, { user_id: 2 }, { user_id: 3 }, { user_id: 4 } ];
      getUserId ((err, result) => {
        if (err) t.error(err);
        t.deepEqual(result, expected, 'test  getUserId  is done');
        t.end();
      });
    });
  });
  
  tape('test addPost function ', (t) => {
    runDbBuild((err, res) => {
      if (err) t.error(err, 'Error');
      const expected = 'Successfully added';
      addPost ('withoutbbbb',1,(err, result) => {
        if (err) t.error(err);
        t.deepEqual(result, expected, 'test  addPost  is done');
        t.end();
      });
    });
  });

tape.onFinish(() => {
  process.exit(0);
});
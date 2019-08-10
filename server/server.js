var express = require('express');
var app = express();
var Users = require('../db.js');
var userGenerator = require('./userGenerator.js');
var AWS = require('aws-sdk');
var path = require('path');

app.use('/', express.static(path.resolve(__dirname, './../public/dist')));

// Below function used to populate 100 records with one Post Request to /users
app.post('/users', (req, res) => {
  var records = 0;
  setInterval(() => { // had to delay 4s -> to generate unique imgs from the img gallery api
    userGenerator();
    records++;
    if (records > 100) {
      clearInterval();
      res.send('Finished');
    }
  }, 4000);
});

// Below funciton used to post MongoDB data to AWS S3
// app.post('/aws', (req, res) => {
//   var s3 = new AWS.S3();
//   Users.find().then((data) => {
//     s3.putObject({ // takes an object with these param, then a callback
//       Bucket: 'soundcloudusers',
//       Key: 'ALL_USERS_ARRAY',         // name of file
//       Body: JSON.stringify(data),
//       ContentType: 'application/json'
//     }, (err, data) => {
//       if (err) { console.log(err) } else { console.log('Successful AWS putObject:', data) }
//       res.end();
//     });
//   });
// });

// To generate an array of usernames
// app.get('/usernames', (req, res) => {
//   Users.find({}, 'username').then((data) => {
//     var arr = [];
//     data.forEach((e) => {
//       arr.push(e.username);
//     });
//     console.log('List of Usernames:', arr)
//     res.end();
//   });
// });

// .env = put the port number and sensitive info and .gitignore

app.listen(3004, () => { console.log('listening on 3004') });
var express = require('express');
var app = express();
var Users = require('../db.js');
var userGenerator = require('./userGenerator.js');
var AWS = require('aws-sdk');
var path = require('path');
var request = require('request');

app.use('/', express.static(path.resolve(__dirname, './../public/dist')));

app.get('/users', (req, res) => {
  Users.find()
    .then((results) => {
      res.send(results)
    });
});

app.get('/mainTrack', (req, res) => { // from Alastair's data
  request('http://localhost:3001/tracks/:artist/:track', (err, result) => {
    var data = { artist: req.params.artist,
                 track: req.params.track,
                 songfile: result.cdn_url,
                 image: result.FILL_ME_IN        // TODO
               };
    res.send(data);
  });
});

app.get('/related', (req, res) => { // from Abraham's data
  request('http://localhost:3003/related-tracks', (err, result) => {
    var data = { related1: {}, // songName // (songImg) TODO
                 related2: {}, // songName // (songImg) TODO
                 related3: {}  // songName // (songImg) TODO
               };
    res.send(data);
  });
});

// Below function used to populate 100 records with one Post Request to /users
// app.post('/users', (req, res) => {
//   var records = 0;
//   setInterval(() => { // had to delay 4s -> to generate unique imgs from the img gallery api
//     userGenerator();
//     records++;
//     if (records > 100) {
//       clearInterval();
//       res.send('Finished');
//     }
//   }, 4000);
// });

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
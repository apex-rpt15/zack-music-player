var express = require('express');
var app = express();
var Users = require('../db.js');
var userGenerator = require('./userGenerator.js');

app.get('/users', (req, res) => {
  Users.find().then((results) => { console.log('results', results); res.send(results) })
});

// Below funciton used to populate 100 records with one Post Request
app.post('/users', (req, res) => {
  var records = 0;
  setInterval(() => { // had to delay -> to generate unique imgs from the img gallery api
    userGenerator();
    records++;
    if (records >= 100) {
      clearInterval();
      res.send('Finished');
    }
  }, 4000);
});

app.listen(3004, () => { console.log('listening on 3004') });
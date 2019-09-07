var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1/soundcloudusers', {useNewUrlParser: true})
mongoose.connect('mongodb://database/soundcloudusers', {useNewUrlParser: true}) // modified for Docker-compose
  .then(() => {console.log('Connected to MongoDB')})
  .catch((err) => {console.log('MongoDB connection error', err)});

var usersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  photo: String,
  followers: Number,
  tracks: Number,
  description: String,
  location: String
});
usersSchema.path('username').index({unique: true});

module.exports = mongoose.model('Users', usersSchema);
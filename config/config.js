require('dotenv').config();
module.exports = {
  port: process.env.PORT||5001,
  mongodb_uri: process.env.MONGODB_URI||'mongodb://localhost:27017/mydatabase',  
  // Add other configuration options here
};
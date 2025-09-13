require('dotenv').config();
const mongoose = require('mongoose')
const client = process.env.CONNECTION_STRING

const mongooseConnect = async () => {
if (mongoose.connection.readyState == 1)return
try {
  await mongoose.connect(client)
  console.log("mongoDB connected");
} catch (e) {
  console.error('Failed to connect mongoDB server')
}
};

module.exports = { mongooseConnect }  


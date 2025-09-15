const mongoose = require("mongoose")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const jwtpass = "mysecret"
app.use(express.json())
mongoose.connect("")

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});

const user = mongoose.model('User', userSchema);

user.create([
  { name: 'Aryan', username: 'aryan@gmail.com', password: 'password1' }, 
  { name: 'Aiman', username: 'aiman@gmail.com', password: 'password2' }, 
  { name: 'Anni', username: 'aniket@gmail.com', password: 'password3' }
])
.then(docs => console.log("Created users:", docs))

app.post("/signin", async (req, res) => {
const username = req.body.username
const password = req.body.password

const exists = await userexists(username, password);
if(!exists){
  return res.status(403).json({
    msg : "User does not exist in the db"
  })}
var token = jwt.sign({ username: username }, jwtpass);
  return res.json({
  token,
  })
});

async function userexists(username, password){
  const userexists = await user.findOne({ username: username, password: password });
  return userexists
}

app.listen(3000)
const express = require("express")
const app = express() 
const jwt  = require("jsonwebtoken")
const jwtpass = "mysecret"
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:NLQGcCEhI9r7mk1F@cluster0.svazehb.mongodb.net/")

app.use(express.json())
const user = [
  {
    username: "aryan@gmail.com",
    password: "password1",
    name : "Aryan"
  },
  {
    username: "Aniket@gmail.com",
    password: "password2",
    name : "Anni"
  },
  {
    username: "Aiman@duckduckgo.com",
    password: "password3",
    name : "Aiman"  
  }
]

function userexists(username, password){
  let userexists = false
  for(let i=0; i<user.length; i++){
    if(user[i].username == username && user[i].password == password){
      userexists = true
    }
  }
  return userexists
}


app.post("/signin", (req, res) => {
const username = req.body.username
const password = req.body.password

if(!userexists(username, password)){
  return res.status(403).json({
    msg : "User does not exist in the db"
  })

}
var token = jwt.sign({ username: username }, jwtpass);
  return res.json({
  token,
  })
});


app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtpass);
  const username = decoded.username;
  res.json(user);
});


app.listen(3000)
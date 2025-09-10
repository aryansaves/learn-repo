const express = require("express")
const app = express() 
const jwt  = require("jsonwebtoken")
const jwtpass = "mysecret"


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

}


app.post("/signin", (req, res) => {
const username = req.query.username
const password = req.query.password

if(!userexists(username, password)){
  return res.status(403).json({
    msg : "User does not exist"
  })

}
var token = jwt.sign({ username: username }, "shhhhhh");
  return res.json({
  token,
  })
});


app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtpass);
    const username = decoded.username;
  }
  catch(err) {
    return res.status(403).json({
      msg : "Invalid token"
    });
  }
  });
app.listen(3000)
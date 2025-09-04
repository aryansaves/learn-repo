const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


app.post('/gooncave', function (req, res) {
    const json = req.body
    console.log(json)
    res.status(200).send("DONE!!")
});

app.get('/goonget',(req,res)=>{
  const n = req.query.n
  res.send(n*10)
})
app.listen(port, function()  {
  console.log(`Example app listening on port ${port}`)
})

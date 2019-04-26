const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');


const app = express()
app.listen(8083, () => console.log('Example app listening on port 8083!'))


app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.post('/upload',(req,res,next)=>{
	console.log(req.body);
	res.send('test');
})
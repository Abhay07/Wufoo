const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const config = require('../config');
const key = config.secret;


const app = express()
app.listen(8083, () => console.log('Example app listening on port 8083!'))


app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post('/upload',(req,res,next)=>{
	const headers = {
		'autopilotapikey':key,
		'Content-Type':'application/json'
	}
	const data={
		"contact":{
			"FirstName":req.body.Field1,
			"Lastname":req.body.Field2,
			"Email":req.body.Field10
		}
	}
	axios.post('https://api2.autopilothq.com/v1/contact',data,{headers:headers})
	.then((response)=>{
		console.log(response.data);
	})
	.catch((error)=>{
		console.log(error);
	})
	res.send('test');
})
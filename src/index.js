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
	console.log(req.body);
	const data={
		"contact":{
			"Company":req.body.Field1,
			"Lastname":req.body.Field3,
			"Firstname":req.body.Field2,
			"Email":req.body.Field10,
			"Phone":req.body.Field11,
			"custom":{
				"string--Notes":req.body.Field22,
				"string--Management-Fee":req.body.Field131,
				"string--Total--Number--of--Campaigns":req.body.Field21,
				"boolean--Lead--Generation--Incenitve?--":(req.body.Field129 === 'Lead Generation Incenitve?'),
				"boolean--Contests?--":(req.body.Field129 === 'Lead Generation Incenitve?'),
				"boolean--BOF--Direct--Catalog--Sales--":(req.body.Field129 === 'Lead Generation Incenitve?'),
				"boolean--BOF--Lead--Capture--":(req.body.Field129 === 'BOF Lead Capture'),
				"boolean--Traffic--to--Landing--Page--(Lead--Gen)--":(req.body.Field129 === 'Traffic to Landing Page (Lead Gen)'),
				"boolean--TOF--Engagement--Ads--":(req.body.Field129 === 'TOF Engagement Ads'),
				"boolean--TOF--Traffic--Ads--(Brand--Awareness)--":(req.body.Field129 === 'TOF Traffic Ads (Brand Awareness)'),
				"boolean--TOF--Traffic--Ads--(Conversion--Event--for--Action)--":(req.body.Field129 === 'TOF Traffic Ads (Conversion Event for Action)'),
				"string--Services--Offered--in--Scope--of--Work--Email":req.body.Field20,
				"boolean--Organic--Content--Management--":(req.body.Field30 === 'Organic Content Management'),
				"boolean--Brand--Awareness--/--Traffic--":(req.body.Field29 === 'Brand Awareness \\/ Traffic'),
				"boolean--B2b--Sales--":(req.body.Field32 === 'B2b Sales'),
				"boolean--B2c--Sales--":(req.body.Field31 === 'B2c Sales'),
				"boolean--B2b--Lead--Generation--":(req.body.Field28 === 'B2b Lead Generation '),
				"boolean--B2c--Lead--Generation--":(req.body.Field27 === 'B2c Lead Generation '),
				"string--Services--Offered":req.body.Field12
			},
			"_autopilot_list":"#contactlist_72E57C91-3889-46EA-A304-0703CD9C64EE"
		}
	}
	axios.post('https://api2.autopilothq.com/v1/contact',data,{headers:headers})
	.then((response)=>{
	})
	.catch((error)=>{
		console.log(error);
	})
	res.send('test');
})
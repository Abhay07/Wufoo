const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express()
app.listen(8080, () => console.log('Example app listening on port 3000!'))


app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))


app.get('/getCourseInfo',(req,res,next)=>{
	let courseIds = req.query.courseIds;
	if(courseIds === undefined){
		courseIds = '238934';
	}
	courseIds = courseIds.split(",");
	let getCourses = courseIds.map(n=>{
		const url = `https://www.udemy.com/api-2.0/courses/${Number(n)}?fields[course]=title,num_subscribers,avg_rating`
		return axios.get(url);
	})
	Promise.all(getCourses).then(infos=>{
		let body = infos.map(n=>n.data);
		const response = [];
		body.forEach(n=>{
			response.push({"text":n.title,"icon":"i22143"});
			response.push({"text":String(n.avg_rating),"icon":"i22143"});
			response.push({"text":String(n.num_subscribers),"icon":"i22143"});
		})
		body = {
			"frames":response
		}
		res.send(body);
	})
	.catch(err=>{
		next(err);
	})
})
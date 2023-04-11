
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const Bug = require('./models/bugmodel')
const bcrypt = require('bcrypt') 
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
app.use(cors())
app.use(express.json())

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
  };
  mongoose.connect(uri, options)
	.then(() => console.log('mongodb connect success'))
	.catch(error => console.log('mongodb connect error'));
  
app.post('/api/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		const	{password, ...others} = user._doc;
		res.json({ status: 'ok', data: others }) 
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	
	if (!user || user === null) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}
		
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)
	console.log(isPasswordValid);
	if (isPasswordValid) {
		return res.json({ status: 'ok' })
	} else {
		return res.json({ status: 'error'})
	} 
})

app.get('/api/bugs',async(req,res)=>{
	const bugs = await Bug.find()
	if(!bugs || bugs ===null)
		return res.json({
			status: "ok",
			bug: null,
		})
	else{
		return res.json({
			status: "ok",
			bug: bugs
		})
	}
})

app.post ('/api/bugs', async (req, res) => {
	try{
		const newBug = await Bug.create({
			title: req.body.title,
			description: req.body.description,
			priority: req.body.priority,
			status: req.body.status,
			assigned: req.body.assigned
		})
		res.json({ status: 'added', bug: newBug })
	}
	catch(err){
		console.log(err);
	}
} 
)

app.delete('/api/bugs/:id', async (req, res) => {
	await Bug.findByIdAndDelete(req.params.id);
	res.json({ status: 'ok' })
})

app.listen(port, () => {
	console.log('Server started on ' + port);
})
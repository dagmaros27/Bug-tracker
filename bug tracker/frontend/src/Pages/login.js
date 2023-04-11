import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import "../styles/login.css"
import axios from "../axios"

function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
		e.preventDefault();
	
		const body = {
			email,
			password
		};
	
		axios.post('/login', body)
		  .then(res => {
			if(res.data.status === 'error')
				alert("invalid input");
			else if(res.data.status === 'ok') {
				alert("logged successfully")
				navigate('/dashboard', { replace: true })
			}
			setEmail("")
			setPassword("")
		  })
		  .catch(err => console.log(err));
	  };
	

	return (
		<div className='container'>
		<div className='login'>
			<h1 className='title'>Login</h1>
			<form onSubmit={handleSubmit}>
			<div className='inputs'>
				<label>Email</label>	
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
			</div>
			<div className='inputs'>
				<label>Password</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
			</div>
			<div className='btn'>
				<button className='sameBtn' type='submit'>Log In</button>
				<a href='/register'><Link to="/register">Don't Have an accout? create one</Link></a>
			</div>
			</form>
			</div>
		</div>
	)
}

export default Login

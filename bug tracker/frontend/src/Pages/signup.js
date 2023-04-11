import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import axios from "../axios"
import "../styles/signup.css"

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password  
    };
    axios.post('/register', newUser)
      .then(res => {
        if(res.data.status === "ok")
              alert("successfully registered")
          setName("");
          setEmail("");
          setPassword("");
          navigate('/', { replace: true })
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
    <div className='signup'>
      <h1 className='title'>Register</h1>
      <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
      </div>
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
        <button className='sameBtn' type='submit'>Sign Up</button>
        <a href='/login'><Link to="/login">Already have an account? Sign in</Link></a>
      </div>
      </form>
    </div>
    </div>
  )
}

export default Signup

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/signup'
import Dashboard from './Pages/dashboard'

const App = () => {
	return (
		<div>
			<BrowserRouter>
        <Routes> 
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
        </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App

import React, { useState, useEffect } from 'react';
import axios from '../axios';
import "../styles/dashboard.css"

const Dashboard = () => {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assigned, setAssigned] = useState('');
  
  function toggler1(){
    var div1 = document.getElementsByClassName("div1")[0];
    var div2 = document.getElementsByClassName("div2")[0];
    div1.classList.add("visible");
    div2.classList.remove("visible");

  }
  function toggler2(){
    var div1 = document.getElementsByClassName("div1")[0];
    var div2 = document.getElementsByClassName("div2")[0];
    div2.classList.add("visible");
    div1.classList.remove("visible");

  }


  useEffect(() => {
    axios.get('/bugs')
      .then(res => {
        setBugs(res.data.bug)
        if(res.data.status === 'added')
        alert("Bug added successfully")
})
      .catch(err => console.log(err));
  }, []);
  const handleSubmit = e => {
    e.preventDefault();

    const newBug = {
      title,
      description,
      priority,
      status,
      assigned
    };

    axios.post('/bugs', newBug)
      .then(res => {
        setBugs([...bugs, res.data.bug]);
        setTitle('');
        setDescription('');
        setPriority('');
        setStatus('');
        setAssigned('');
        alert("bug added successfully");
      })
      .catch(err => console.log(err));
  };
    
  const handleDelete = id => {
    axios.delete(`/bugs/${id}`)
      .then(res => {
        setBugs(bugs.filter(bug => bug._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='wrapper'>
    <div className="dashContainer">
      <h1 className='title'>Bug Tracker</h1>
        <nav>
          <ul className='lists'>
            <li className='link'>
              <button  className='togglers' onClick={toggler1}>Dashboard</button>
            </li>
            <li>
            <button className='togglers' onClick={toggler2}>Add Bug</button>
            </li>
          </ul>
        </nav>
       
            <div className='div1 visible'>
            <div className='wrapper'>
             <form className='form' onSubmit={handleSubmit}>
              <div className='input'>
                <label>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className='input'>
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div className='input'>
                <label>Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className='input'>
                <label>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className='input'>
                <label>Assigned to</label>
                <select value={assigned} onChange={e => setAssigned(e.target.value)}>
                  <option value="">Select assigned to</option>
                  <option value="Open">James</option>
                  <option value="In Progress">Thomas</option>
                  <option value="Closed">Samuel</option>
                </select>
              </div>
              <div className='btnDiv'>
              <button className='sameBtn' type="submit">Add Bug</button>
              </div>
            </form>
            </div>
            </div>
            <div className='div2 '>
          <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned to</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                    {bugs.map(bug => (
                      <tr key={bug._id}> 
                        <td>{bug.title}</td>
                        <td>{bug.description}</td>
                        <td>{bug.priority}</td>
                        <td>{bug.status}</td>
                        <td>{bug.assigned}</td>
                        <td>
                          <button className='dashBtn' onClick={() => handleDelete(bug._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
              </tbody>

             </table>
            </div>
            </div>
             </div>
  )
                    }

export default Dashboard
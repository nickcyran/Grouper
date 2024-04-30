import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import '../styles/Login.css'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault()

    const body = { params: { username, password } }

    axios.get('http://localhost:9000/getUser/', body)
      .then(res => {
        if (res.username === body.username && res.password === body.password) {
          localStorage.setItem('userID', res.data._id)
          navigate('/')
        }
      })
      .catch((err) => {
        alert('Wrong Credentials')
      });
  }

  return (
    <div className="Begin">

      <div className="BeginTitle">
        Log In
      </div>

      <form className='BeginForm'>
        <div className="BeginInput">
          <span> User ID:</span><br />
          <input type="text" name="Username" placeholder="Enter your username" onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div className="BeginInput">
          <span> Password:</span><br />
          <input type="password" name="Password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className='BeginButton shadow' onClick={(e) => handleLogin(e)}>
          Login
        </button>
      </form>

      <div className="BeginLink">Don't have an account? <Link className='link' to="/SignUp"> SignUp</Link></div>
      

    </div>
  );
}

export default Login;
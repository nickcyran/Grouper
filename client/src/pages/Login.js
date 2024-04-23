import { Link, useNavigate } from 'react-router-dom';
import { getUser } from "../controllers"
import { useState } from 'react';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault()

    if (getUser({ params: { username, password } }) === true) {
      navigate('/')
    }
  }

  return (
    <div className="Login">
      <header className='Login-header'>
        <br />
        Log In
        <form className='Login-form'>
          <label className='inputs'>
            User ID:  <br />  <input type="text" name="Username" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <br />

          <label className='inputs'>
            Password: <br /><input type="text" name="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <br />
          <button className='LoginButton' onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </form>
        <br />

        <Link className='Signup-link' to="/SignUp"> SignUp</Link>
      </header>
    </div>
  );
}

export default Login;
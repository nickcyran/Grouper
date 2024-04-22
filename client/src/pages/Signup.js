import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUser } from "../controllers/user"
import { useState } from "react";

function SignUp(){
    const [f_name, setf_name] = useState()
    const [l_name, setl_name] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()
        if(createUser({f_name, l_name, username, password})){
            navigate('/Login')
        }

    }

    return(
        <div className = "Signup">
            <header className='Signup-header'>    
            <br/>        
            Sign Up
            <form className="Signup-form">
                <label className="inputs">
                    First Name: <input type = "text" name = "f_name" onChange={(e) => setf_name(e.target.value)}/>
                </label>
                <br/>
                <label className="inputs">
                    Last Name: <input type = "text" name = "l_name" onChange={(e) => setl_name(e.target.value)}/>
                </label>
                <br/>
                <label className="inputs">
                    User ID: <input type = "text" name = "Username" onChange={(e) => setUserName(e.target.value)}/>
                </label>
                <br/>
                <label className="inputs">
                    Password: <input type = "password" name = "Password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <br/>
                <button className= "SignupButton" onClick={(e) => handleSignUp(e)}>
                    Sign Up
                </button>
            </form>
            <br/>
            <Link className="Login-link" to="/"> LogIn</Link>
            </header>
        </div>
    );
}


export default SignUp;

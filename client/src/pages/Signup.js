import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUser } from "../controllers/user"
import { useState } from "react";
import {Begin_phone} from '../assets'


const SignUp = () => {
    return(
        <div className="BeginScreen">
            <div className="BeginTitleCard">
            <div className="PROJTITLE">GROUPER</div>

                <div className="BeginDesign">
                    <div className="BeginCircle BeginShadow" />

                    <div className="PhoneBox">
                        <img  src={Begin_phone} alt="phone gif"/>
                    </div>
                </div>
            </div>

            <div className="BeginFormBasis">
                <Signededup />
            </div>
        </div>
    )
}


function Signededup() {
    const [f_name, setf_name] = useState()
    const [l_name, setl_name] = useState()
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()

        if (createUser({ f_name, l_name, username, password })) {
            navigate('/Login')
        }

    }

    return (
        <div className="Begin">
            <div className="BeginTitle">
                Sign Up
            </div>

            <form className='BeginForm'>
                <div className="BeginInput">
                    <span> First Name:</span>
                    <input type="text" name="f_name" placeholder="first name" onChange={(e) => setf_name(e.target.value)} />
                </div>

                <div className="BeginInput">
                    <span> Last Name:</span>
                    <input type="text" name="l_name" placeholder="last name" onChange={(e) => setl_name(e.target.value)} />
                </div>

                <div className="BeginInput">
                    <span>  User ID: </span>
                    <input type="text" name="Username" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div className="BeginInput">
                    <span>   Password:  </span>
                    <input type="password" name="Password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className='BeginButton shadow' onClick={(e) => handleSignUp(e)}>
                    Sign Up
                </button>
            </form>

            <div className="BeginLink">Already have an account? <Link className="link" to="/Login"> LogIn</Link></div>
        </div>
    );
}


export default SignUp;

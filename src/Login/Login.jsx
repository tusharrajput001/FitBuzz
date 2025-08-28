import React from "react";
import './Login.css'

const Login = () =>{
    return(
        <div className="Login">
            <div className="login-container">
                <h2>Login</h2>
                <div>
                    <input placeholder="Enter Email"/>
                </div>
                <div>
                    <input placeholder="Enter Password"/>
                </div>
                <button>Login</button>
            </div>
        </div>
    )
}

export default Login;
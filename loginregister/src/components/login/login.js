import React,{useState} from "react"
import "../login/login.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = ({setLogin}) => {

    const navigate = useNavigate()

    const [user, setUser]=useState({
        email:"",
        password:"",
    })

    const handleChange = e => {
        const{name,value} = e.target
        setUser({
            // will only update specific input and will keep saving other as it is
            ...user,[name]:value
        })
    }

    const login = () => {
        axios.post("https://loginregistrationbackend.onrender.com/login",user)
        .then(res => {
            alert(res.data.message)
            setLogin(res.data.user)
            navigate("/")
        })
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" />
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={()=>navigate("/register")}>Register</div>
        </div>
    )
}

export default Login
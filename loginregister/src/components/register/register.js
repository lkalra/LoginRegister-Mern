import React,{useState} from "react"
import "../register/register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [user, setUser]=useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

    const handleChange = e => {
        const{name,value} = e.target
        setUser({
            // will only update specific input and will keep saving other as it is
            ...user,[name]:value
        })
    }

    const register = () => {
        const {name, email, password, reEnterPassword} = user
        if(name && email && password && (password===reEnterPassword)){
            axios.post("https://loginregistrationbackend.onrender.com/register",user)
            .then(res => {
                alert(res.data.message)
                navigate("/login")
            })
        }else{
            if(password!==reEnterPassword){
                alert("Passwords do NOT match")
            }else{
                alert("Invalid Type")
            }
        }
    }
    
    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}/>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}/>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}/>
            <div className="button" onClick={register}>Register</div>
            <div>Or</div>
            <div className="button" onClick={()=>navigate("/login")}>Login</div>
        </div>
    )
}

export default Register
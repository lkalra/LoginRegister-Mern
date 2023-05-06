import React from "react"
import "../homepage/homepage.css"
import {useNavigate} from "react-router-dom"

const Homepage = (setLogin) => {
    const navigate = useNavigate()
    return(
        <div className="homepage">
            <h1>Hi!, </h1>
            {/* <div className="button" onClick = {() => {setLogin: setLogin({})}}>Logout</div> */}
            <div className="button" onClick={()=>navigate("/login")}>Logout</div>
        </div>
    )
}

export default Homepage
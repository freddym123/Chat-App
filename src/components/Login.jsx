import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { socket } from "../socket";

export default function LoginForm({user, loggedIn, setContacts, setLoggedInUser, setUserFriendRequest}){
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, seterrMsg] = useState('')

    async function formsubmit(e){
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password:password})
            
        }
        const res = await fetch('http://localhost:4000/verify', options)
        const data = await res.json();
        console.log(data);
        if(data.message === "Failed to Login"){
            seterrMsg('Incorrect Field')
        }else{
            sessionStorage.setItem("loggedInUser", data._id);
            console.log(sessionStorage.getItem("loggedInUser"));
            navigate("/home")
        }

    }

    return(
        <>
            <div className="wrapper">
                <h1>Welcome to Messenger</h1>
                <div className="formContainer">
                    <form onSubmit={formsubmit}>
                        <input type="text" id='username' placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} value={username}></input>
                        <br></br>
                        <input type="password" id='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
                        <br></br>
                        <button type="submit">Continue</button>
                        {errMsg != '' && <span className="errText">{errMsg}</span>}
                        <div className="otherOptions">
                            <div><Link to='/forgot'>Forgot Password?</Link></div>
                            <div><Link to='/register'>I don't have an account</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
        
        
    )
}
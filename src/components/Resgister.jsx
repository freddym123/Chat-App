import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function NewUserForm({submitedForm}){
    

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, seterrMsg] = useState('')

    function submitForm(e){
        e.preventDefault();
        let valid = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        if (!valid){
            seterrMsg((errMsg)=> {return 'Invalid Email Address'})
        }else if(username == '' || password == '' || email == ''){
            seterrMsg((errMsg)=>{return 'Field Required'})
        }else{
            submitedForm();
            navigate('/newuser/confirm');
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password, email: email})
            }
            fetch('http://localhost:4000/register', requestOptions).then((res)=>{
                console.log(res)
            })
        }
        
        

    }

    return(
        <div className="wrapper">
                <h1>Begin Messenger Journey</h1>
                <div className="formContainer">
                    <form onSubmit={submitForm}>
                        <input type="text" id='newUsername' placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} value={username}></input>
                        <input type='text' placeholder='example@yahoo.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
                        <br></br>
                        <input type="password" id='newPassword' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
                        <br></br>
                        <button type="submit">Continue</button>
                        {errMsg != '' && <span className="errText">{errMsg}</span>}
                        
                    </form>
                </div>
        </div>
    )
}
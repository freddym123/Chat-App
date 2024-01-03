import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Update({setValidSubmition}){
    const navigate = useNavigate()
    const [errMsg, seterrMsg] = useState('')
    const [email, setEmail] = useState('')

    function submitForm(e){
        e.preventDefault();
        let valid = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        if (!valid){
            seterrMsg((errMsg)=> {return 'Invalid Email Address'})
        }else if(email == ''){
            seterrMsg((errMsg)=>{return 'Field Required'})
        }else{
            setValidSubmition()
            navigate('/forgot/confirmreset')
            // To do after backend
        }
    } 

    return(
        <div className="wrapper">
                <h1>Reset Password</h1>
                <div className="formContainer">
                    <form onSubmit={submitForm}>
                        <input type='text' placeholder='example@yahoo.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
                        <button type="submit">Continue</button>
                        {errMsg != '' && <span className="errText">{errMsg}</span>}
                        
                    </form>
                </div>
        </div>
    )
}
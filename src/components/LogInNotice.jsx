import { Link } from "react-router-dom"

export default function LogInNotice(){
    return(
        <div className="wrapper">
                <div className="messageContainer">
                    <div>
                        
                    </div>
                    <h2>You are not logged in...</h2>
                    <p>
                        Need to loggin in order to see messages.
                    </p>
                    <div className="button"><Link to='/'>Mind Trying it Again</Link></div>
                </div>
                
        </div>
    )
}
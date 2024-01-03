import { Link } from "react-router-dom"
export default function ConfirmReset({proper}){
    if(!proper){
        return (
            <div className="wrapper">
                <div className="messageContainer">
                    <div>
                        
                    </div>
                    <h2>Something went wrong...</h2>
                    <p>
                        Looks like we couldn't validate form submition.
                    </p>
                    <div className="button"><Link to='/forgot'>Mind Trying it Again</Link></div>
                </div>
                
            </div>)
    }
    return (
        <div className="wrapper">
                <div className="messageContainer">
                    <div>

                    </div>
                    <h2>Reset Link Sent To Email</h2>
                    <p>
                        In order to reset password you need access to email
                    </p>
                    <div className="button"><Link to='/'>Log In</Link></div>
                </div>
                
        </div>
    )
}
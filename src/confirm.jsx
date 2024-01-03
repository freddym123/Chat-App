import { Link } from "react-router-dom"
export default function Confirm({formSubmit}){
    if (!formSubmit){
        return (
        <div className="wrapper">
            <div className="messageContainer">
                <div>
                    
                </div>
                <h2>Something went wrong...</h2>
                <p>
                    Looks like we couldn't validate form submition.
                </p>
                <div className="button"><Link to='/register'>Mind Trying it Again</Link></div>
            </div>
            
        </div>)
    }
    return(
        <>
            <div className="wrapper">
                <div className="messageContainer">
                    <div>

                    </div>
                    <h2>Thank you for creating an account with Messenger</h2>
                    <p>
                        You are ready to start chatting with friends and family.
                    </p>
                    <div className="button"><Link to='/'>Log In</Link></div>
                </div>
                
            </div>
        </>
    )
}
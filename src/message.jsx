export default function Message({message}){
    let className = message.sender_id == sessionStorage.getItem("loggedInUser") ? 'me' : 'other'; 
    return(
        <>
            <div className={`textWrapper ${className}`}>
                <div className={`textContainer ${className}`}>{message.text}</div>
            </div>
        </>
        
        
    )
}
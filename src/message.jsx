export default function Message({message}){
    let className = message.sender_id == sessionStorage.getItem("loggedInUser") ? 'me' : 'other'; 
    function validJSON(string){
        try{
            const object = JSON.parse(string)
            console.log(string)
            console.log(object)
            if(object && typeof object == "object"){
                return object
            }

        }catch(e){
            return false
        }
        
    }
    
    const response = validJSON(message.text)

    if(response){
        return (
            <div className={`textWrapper ${className}`}>
                <img src={`http://localhost:4000/photos/${response.image}`}></img>
            </div>
        )
    }

    return(
        
        <>
            <div className={`textWrapper ${className}`}>
                <pre className={`textContainer ${className}`}>{message.text}</pre>
            </div>
        </>
        
        
    )
}
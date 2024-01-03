import { useEffect, useState } from "react"
import CurrentTalk from "../currenttalk"
import Message from "../message"
import { socket } from "../socket"





export default function ChatArea({hideChat, openModal, currentChat, user, messages}){
    const [newTextValue, setTextValue] = useState('')
    const [newTextAreaHeight, setTextAreaHeight] = useState(25)
    const [animationName, setAnimationName] = useState('1fr 50%')
    const [leftAnimation, setLeftAnimation] = useState('1fr 0')
    const [rightAnimation, setRightAnimation] = useState('1fr 0')



    function lineCount(string){
        let count = 0
        for(let i = 0; i < string.length; i++){
            if(newTextValue[i] == '\n'){
                count++;
            }
        }
        console.log(count)
        return count;
    }

    function hideAnimation(){
        setTextAreaHeight(25)
        setAnimationName('1fr 50%')
        setLeftAnimation('1fr 0')
        setRightAnimation('1fr 0')
    }

    function setValue(e){
        console.log(e.target.value)
        if(animationName === '1fr 50%'){
            setAnimationName('max-content 90%')
            setLeftAnimation('0 1fr')
            
        }
        setTextValue(()=>e.target.value)
        if(e.target.value === ''){
            setRightAnimation('1fr 0')
        }else{
            setRightAnimation('1fr max-content')
        }
        

        
    }

    function sendMessage(){
        socket.emit("send_message", {sender: sessionStorage.getItem("loggedInUser"), reciever: sessionStorage.getItem("currentChat"), message: newTextValue});
        setTextValue('');
    }

    

    function checkNewLine(e){
        let currentRow = lineCount(e.target.value)
        console.log(currentRow)
        if(currentRow < 6) {
            setTextAreaHeight((oldHeight)=>(currentRow)*10 + 25)
        }else{
            
        }
    }

    return(
        <div className="chatArea" >
            <CurrentTalk hideChat={hideChat} openModal={openModal} currentChat={currentChat}></CurrentTalk>
            {
                currentChat === 'No chat opened'?
                <div className="chatAreaNoChat">
                    <div>
                        <p>{currentChat}</p>
                        <p>Open a chat or add a friend</p>
                    </div>      
                </div>
                : <>
                    <div className="messageAreaContainer">
               
                
               {
                   messages.map((message)=>{
                       return <Message message={message} key={message._id}></Message>
                   })
               }
               
           
           
       </div>
       <div className="toChat" style={{gridTemplateColumns: animationName}}>
           <div className="leftBtns" style={{gridTemplateColumns:leftAnimation}}>
               <div className="chatBtns">
                   <div  className="textAddBtn"><i className="fa-solid fa-file"></i></div>
                   <div  className="textAddBtn"><i className="fa-solid fa-camera"></i></div>
               </div>
               
               <div className="closeText" onClick={hideAnimation}>{'>'}</div>
           </div>
           
           <div className="rightBtns" style={{gridTemplateColumns: rightAnimation}}>
               <textarea style={{height: newTextAreaHeight + 'px'}} onKeyUpCapture={checkNewLine} onChange={setValue} rows={1} value={newTextValue} placeholder="Enter Message"></textarea>
               <button onClick={sendMessage}>Send</button>
           </div>
           
       </div>
                </>
                
            }
            
        </div>
    )
}
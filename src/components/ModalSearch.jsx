import { useState, useEffect, useRef, useCallback } from "react"
import ModalSearchUser from "./modalSearchUser"
import _debounce from 'lodash/debounce'
import { socket } from "../socket"



export default function ModalSearch({close, userselect, modalContentStyle, contacts}){
    const [userSearch, setUserSearch] = useState('')
    const [socketToAdd, setSocketToAdd] = useState('none')
    const [userSearchResult, setUserSearchResult] = useState([{username: 'MiketheGoat', _id: 1234}, {username: 'Jose', _id: 4523}])
    console.log(userSearchResult)

    let timeout = null

    const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), [])

    function handleDebounceFn(inputValue) {
        

        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({search: inputValue, id: sessionStorage.getItem("loggedInUser")})
        }

        
        fetch('http://localhost:4000/users', options).
        then(res=>res.json()).then(data=>{setUserSearchResult(data);})
    
    }

    function sendFriendRequest(){
        let search = contacts.find(contact=>contact.username == userSearch);
        if(search){
            return;
        }
        let senderId = sessionStorage.getItem("loggedInUser")
        console.log(senderId, socketToAdd)
        socket.emit("friend_request", {
            from: senderId,
            to: socketToAdd
        })
    }

    function handleChange (event) {
        setUserSearch(event.target.value);
        setSocketToAdd('none')
        debounceFn(event.target.value);
    };



    function handleClick(e){
        setSocketToAdd(e.currentTarget.id)
        const childs = document.querySelectorAll('.modalSearchItem')
        childs.forEach((child)=>{
            child.classList.remove('current')
        })

        e.currentTarget.classList.add('current')
    }

    return(
        <div className="modaloption modalsearch" style={{display:(modalContentStyle)?'block':'none'}}>
            <h2>Add New Contact</h2>
            <form>
                <input type='text' placeholder="username" value={userSearch} onChange={handleChange}></input>
            </form>
            <div className="userResult">
                {
                    (userSearchResult.length == 0) 
                    ? <div className="noUserDisplay">No User</div> 
                    : userSearchResult.map((user)=>{return <ModalSearchUser key={user._id} userObject={user} setCurrent={handleClick} currentClass="modalSearchItem"></ModalSearchUser>})
                }
            </div>
            <div className="modalBtns">
                <button type="submit" disabled={socketToAdd==='none'?'disabled': null} onClick={sendFriendRequest}>Send Friend Request</button>
                <button type='button' onClick={close}>Cancle</button>
            </div>    
        </div>
    )
    
}
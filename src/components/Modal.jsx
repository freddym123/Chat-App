import User from "../user"
import { useState } from "react"
import ModalSearch from "./ModalSearch"
import ModalFriendRequestSection from "./ModalFriendRequest"

export default function Modal({close, modalstyle, userselect, addContact, socket, friendRequests, setUserFriendRequests, contacts}){
    console.log("Modal: ", addContact);
    const [userSearch, setModalStyle] = useState(true)

    function displaySearchUsers(){
        setModalStyle('block')
    }
    function displayFriendRequest(){
        setModalStyle('none')
    }

    return(
        <div className="myModal" style={{transform: modalstyle}}>
                <div className="modal-content-wrapper">
                    <div className="closeModal" onClick={close}>X</div>
                    <div className="modaloptions">
                        <div className={userSearch?'selected':''} onClick={()=>{setModalStyle(true)}}>Search for user</div>
                        <div className={userSearch?'':'selected'} onClick={()=>{setModalStyle(false)}}>Friend Request</div>
                    </div>

                    <div className="modalOptionContainer">
                        <ModalSearch close={close} userselect={userselect} modalContentStyle={userSearch} socket={socket} contacts={contacts}></ModalSearch>
                        <ModalFriendRequestSection addContact={addContact} socket={socket} friendRequests={friendRequests} setUserFriendRequests={setUserFriendRequests}></ModalFriendRequestSection>
                    
                    </div>
                    
                    
                    
                </div>
            </div>
    )
}
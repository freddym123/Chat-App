import Contacts from "../contact"
import ChatArea from "./chatarea"
import User from "../user"
import Modal from "./Modal"
import { useState, useEffect } from "react"
import { socket } from "../socket"
import {Link} from "react-router-dom"


import { json } from "react-router-dom"
import { update } from "lodash"

export default function HomeContent({user, setContacts ,contacts, addContact,friendRequests, setUserFriendRequests, messages, setCurrentMessage}){
    console.log("Home: ", user)
    console.log(sessionStorage.getItem("loggedInUser"));

    const [displayContact, setdisplayContact] = useState('20vw 1fr')
    
    const [userToAdd, setUserToAdd] = useState('none')
    const [currentChat, setCurrentChat] = useState('No chat opened')
    const [modalScale, setModalScale] = useState('scaleY(0)')

    

    useEffect(()=>{

        const fetchData = async ()=>{
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: sessionStorage.getItem("loggedInUser")})
                
            }
    
            const res = await fetch('http://localhost:4000/userinfo', options)
            const data = await res.json();
            console.log(data);
            socket.emit('update_socket', {_id: data._id})
            setContacts(data.contacts)
            setUserFriendRequests(data.friendRequests)
        }

        fetchData()
        
    }, [])


    function openModal(){
        setModalScale('scaleY(1)')
    }
    function closeModal(){
        setModalScale('scaleY(0)')
    }
    

    function setChat(user){
        setCurrentChat(user)
    }


    

    function toDisplayContacts(){
        if(displayContact === '20vw 1fr'){
            setdisplayContact('0 1fr')
        }else{
            setdisplayContact('20vw 1fr')
        }
    }
    
    
    return(
        <>
            <Modal close={closeModal} modalstyle={modalScale} addContact={addContact} userToAdd={userToAdd} socket={socket} friendRequests={friendRequests} setUserFriendRequests={setUserFriendRequests} contacts={contacts}></Modal>
            
            <div className="homeWrapper" style={{gridTemplateColumns: displayContact}}>
                <Contacts userPress={setChat} currentChat={currentChat} contacts={contacts} setMessages={setCurrentMessage}></Contacts>
                <ChatArea hideChat={toDisplayContacts} openModal={openModal} currentChat={currentChat} user={user} messages={messages}></ChatArea>
            </div>
        </>
        
    )
}
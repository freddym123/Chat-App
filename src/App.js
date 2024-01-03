import { useState, useEffect} from "react";
import LoginForm from "./components/Login";
import {Route, Routes} from 'react-router-dom'

import Register from "./components/Resgister";
import Confirm from "./confirm";
import ResetPassword from "./components/ResetPassword";
import ConfirmReset from "./confirmreset";
import Home from "./components/Home";
import { socket } from "./socket";
import Header from "./components/Header";

export default function App(){
  const [contacts, setUserContacts] = useState([])
  const [friend_requests, setFriendRequests] = useState([])
  const [messages, setMessages] = useState([]);
  const [submitNewUserForm, setSubmitNewUserForm] = useState(false);

  useEffect(()=>{
    socket.connect()
  }, [])

  useEffect(()=>{
    socket.on("new_friend_request", (data)=>{
      console.log("data: ", data);
      const newList = friend_requests.concat(data)
      setFriendRequests(newList);
    })

    socket.on("accepted_friend_request", (data)=>{
      console.log("newcontact: ", data)
      setUserContacts(oldContacts => [...oldContacts, data]);
    })

    socket.on("arrived_message", data=>{
      let foundUser1 = data.members.find((memberId)=>memberId === sessionStorage.getItem("loggedInUser"));
      let foundUser2 = data.members.find((memberId)=>memberId === sessionStorage.getItem("currentChat"));
      console.log(foundUser1);
      console.log(foundUser2);
      console.log(data.messages);
      if(foundUser1 && foundUser2){
        console.log("Should Update");
        setMessages(data.messages);
      }
    })
  }, [socket])

  function changeSubmitNewUserForm(){
    setSubmitNewUserForm(true);
  }

  function setCurrentMessage(messages){
    setMessages(messages);
  }

  function setcontacts(newcontacts){
    setUserContacts(newcontacts);
  }

  function updateContacts(contact){
    const newList = contacts.concat(contact);
    setUserContacts(newList);
  }

  function setUserFriendRequests(friendRequests){
    setFriendRequests(friendRequests)
    console.log(friend_requests);
  }

  

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<LoginForm setUserFriendRequest={setUserFriendRequests}></LoginForm>}></Route>
        <Route path='/register' element={<Register submitedForm={changeSubmitNewUserForm}></Register>}></Route>
        <Route path='/forgot' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/home' element={<Home setContacts={setcontacts} contacts={contacts} addContact={updateContacts} socket={socket} friendRequests={friend_requests} setUserFriendRequests={setUserFriendRequests} messages={messages} setCurrentMessage={setCurrentMessage}></Home>}></Route>
        <Route path='/newuser/confirm' element={<Confirm formSubmit={submitNewUserForm}></Confirm>}></Route>
      </Routes>
    </>
      
      
        
    )
}
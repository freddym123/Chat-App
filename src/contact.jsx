import User from "./user"
import { useState, useEffect} from "react"

export default function Contacts({userPress, currentChat, contacts, setMessages}){
    const [searchValue, setSearchValue] = useState('')
    const [currentId, setCurrentId] = useState('')
    console.log(currentChat)

    
    

    async function clickHandler(e){

        const childs = document.querySelectorAll('.contact-container')
        childs.forEach((child)=>{
            child.classList.remove('current')
        })

        e.currentTarget.classList.add('current')
        sessionStorage.setItem("currentChat", e.currentTarget.id);
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({member1: sessionStorage.getItem("loggedInUser"), member2:e.currentTarget.id})
            
        }
        console.log(e.currentTarget.id);
        console.log(e.currentTarget.children);
        userPress(e.currentTarget.children[1].textContent)
        setSearchValue('')
        const res = await fetch('http://localhost:4000/messages', options)
        const data = await res.json();
        console.log(data.messages);
        setMessages(data.messages);


        
    }

    return (
        <div className='contactArea'>
            <div className="contactFunctions">
                <input type='text' placeholder="Search" className='search' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
            </div>
            
            <div className="overflow">
            <ul className="contactContainer">
                {searchValue == ''?
                    contacts.map((userObject)=>{
                        return ( 
                            (currentChat === userObject.username)?
                            <User user={userObject} key={userObject.contact_id} setCurrent={clickHandler} currentClass='current contact-container' ></User>:
                            <User user={userObject} key={userObject.contact_id} setCurrent={clickHandler}></User>)
                        })
                
                : contacts.filter((userObject)=>{return userObject.username.toLowerCase().startsWith(searchValue.toLowerCase())}).map(userObject=>{
                    return (
                        (currentChat === userObject.username)?
                        <User user={userObject} key={userObject._id} setCurrent={clickHandler} currentClass='current contact-container' ></User>:
                        <User user={userObject} key={userObject._id} setCurrent={clickHandler}></User>)
                    }) 
                }
                
            
            </ul>
            </div>
        
        </div>
    )
}
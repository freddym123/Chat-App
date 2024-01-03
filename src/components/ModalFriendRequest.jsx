import FriendRequest from "./FriendRequest"
import { useEffect, useState } from "react"
import { socket } from "../socket";

export default function ModalFriendRequestSection({addContact, friendRequests, setUserFriendRequests}){
    console.log("Modal Friend Request: ", addContact);


    for(let i = 0; i < friendRequests.length; i++){
        console.log(friendRequests[i]);
    }
    function handleRemove(id){
        const newList = friendRequests.filter((item)=> item._id !== id)
        setUserFriendRequests(newList);
    }

    function handleAdd(id){
        const newList = friendRequests.filter((item)=> item._id != id)
        const contactToAdd = friendRequests.find(item=>item._id == id)
        setUserFriendRequests(newList);
        socket.emit("accept_friend_request", {request_id: id})
        console.log(contactToAdd)
        addContact({username: contactToAdd.username, contact_id: contactToAdd.sender})
    }

    
    

    return (

        <div className="friendRequestContainer modaloption">
            <h2>Friend Request</h2>
            <div className="friendrequestwrapper">
                
                <ul className="friendRequestList">
                    {
                        friendRequests.length == 0?
                        <div>No Friend Request</div>
                        :friendRequests.map(object=> {
                            console.log(object)
                            return <FriendRequest friendRequestObject={object} key={object._id} removeFriendRequest={handleRemove} addFriend={handleAdd}></FriendRequest>
                        })
                    
                    }
                </ul>
            </div>
        </div>
    )
}
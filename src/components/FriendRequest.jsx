import profilePic from '../img/nonprofile.png'

export default function FriendRequest({friendRequestObject, removeFriendRequest, addFriend}){
    return (
        <li className='friendRequestContainer'>
            <div className='friendRequest-user'>
                <img src={profilePic}></img>
                <span>{friendRequestObject.username}</span>
            </div>
            <div className='friendRequest-btns'>
                <button className='add' onClick={()=>{addFriend(friendRequestObject._id)}}><i className="fa-solid fa-user-plus"></i></button>
                <button className='reject'><i className="fa-solid fa-user-xmark" onClick={()=>{removeFriendRequest(friendRequestObject._id)}}></i></button>
            </div>
            
        </li>
    )
}
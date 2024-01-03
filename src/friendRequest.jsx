import profilePic from './img/nonprofile.png'


export default function FriendRequest({username, userid}){
    return(
        <li data-id={userid}>
            <img src={profilePic}></img>
            <span>{username}</span>
            <div className="friend-request-btns">
                <div>+</div>
                <div>X</div>
            </div>
        </li>
    )
}
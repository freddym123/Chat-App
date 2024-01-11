import profilepic from './img/nonprofile.png'
export default function CurrentTalk({hideChat, openModal, currentChat, numberOfFriendRequest}){
    return(
        <div className='currentTalk'>
            <div className='currentLeft'>
                <div onClick={hideChat}><i className="fa-solid fa-bars"></i></div>
                {
                    currentChat === 'No chat opened'?
                    <div className='currentTalkNoChat'>{currentChat}</div>:
                    <div className='currentProfile'>
                    <img src={profilepic}></img>
                    <div>{currentChat}</div>
                </div>
                }
                
            </div>
            
            <div className={`addPerson${numberOfFriendRequest > 0 ? " notificationBubble" : ""}`} onClick={openModal} data-friendrequest={numberOfFriendRequest}>
                <i className="fa-solid fa-user-plus"></i>
            </div>
        </div>
    )
}
import profilePic from '../img/nonprofile.png'
export default function ModalSearchUser({userObject, setCurrent, currentClass='contact-container'}){
    console.log(userObject._id)
    return(
        <li className={currentClass} id={userObject._id} onClick={setCurrent}>
            <img src={profilePic}></img>
            <span>{userObject.username}</span>
        </li>
        
    )
}
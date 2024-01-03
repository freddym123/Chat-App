import profilePic from './img/nonprofile.png'
export default function User({user, useClass, setCurrent, currentClass='contact-container'}){
    return(
        <li className={currentClass} onClick={setCurrent} id={user.contact_id}>
            <img src={profilePic}></img>
            <span>{user.username}</span>
        </li>
        
    )
}
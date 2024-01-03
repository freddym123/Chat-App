import HomeContent from "./HomeContent"
import LogInNotice from "./LogInNotice"
export default function Home({user, setContacts ,contacts, addContact,friendRequests, setUserFriendRequests, messages, setCurrentMessage}){
    return (sessionStorage.getItem("loggedInUser") === null ? <LogInNotice/> : <HomeContent user={user} setContacts={setContacts} contacts={contacts} addContact={addContact} friendRequests={friendRequests} setUserFriendRequests={setUserFriendRequests} messages={messages} setCurrentMessage={setCurrentMessage}></HomeContent>)
    
}
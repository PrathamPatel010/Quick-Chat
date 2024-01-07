import RegisterLogin from "./RegisterLogin.jsx";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import ChatPage from './ChatPage.jsx';

export default function Routes(){
    const {username,id} = useContext(UserContext);
    if(username){
        return <ChatPage/>;
    }

    return(
        <RegisterLogin/>
    )
}
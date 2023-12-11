import RegisterLogin from "./RegisterLogin.jsx";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Routes(){
    const {username,id} = useContext(UserContext);
    if(username){
        return `logged in as ${username}`;
    }

    return(
        <RegisterLogin/>
    )
}
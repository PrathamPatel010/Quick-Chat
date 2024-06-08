import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}){

    useEffect(() => {
        async function getInfo(){
            const response = await axios.get('api/v1/user/profile');
            setId(response.data.userId);
            setUsername(response.data.username);
        }
        getInfo();
    },  []);

    const [username,setUsername] = useState(null);
    const [id,setId] = useState(null);
    return(
        <UserContext.Provider value={{username,setUsername,id,setId}}>
            {children}
        </UserContext.Provider>
    )
}
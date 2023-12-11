import './App.css';
import axios from "axios";
import {UserContextProvider} from "./UserContext.jsx";
import Routes from "./Routes.jsx";

function App() {
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
    axios.defaults.withCredentials=true;
  return (
    <>
        <UserContextProvider>
            <Routes/>
        </UserContextProvider>
    </>
  )
}

export default App;

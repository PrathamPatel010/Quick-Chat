import './App.css';
import RegisterLogin from "./RegisterLogin.jsx";
import axios from "axios";

function App() {
    axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
    axios.defaults.withCredentials=true;
  return (
    <>
        <RegisterLogin/>
    </>
  )
}

export default App;

import {Stack} from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"
import Description from "./components/Description"
import ContactsGrid from "./components/ContactsGrid"
import Login from './components/Login'
import Register from './components/Register'
import Footer from "./components/Footer"
import { useState } from "react"
import { Navigate } from 'react-router-dom'
import bgImage from './assets/tlo.png'

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api"
function App(){
    const [contacts,setContacts]=useState([]);
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [isLogged,setIsLogged]=useState(()=>{
        const token=localStorage.getItem("token")
        return token ? true:false
    });
    const [currentUser,setCurrentUser]=useState(()=>{
      return localStorage.getItem("username")||null
    });
    const originalWarn = console.warn;
    
    //Ignorowaniue ostrzezen o przyszłym update
    console.warn = (...args) => {
        if (
            args[0].includes("React Router Future Flag") ||
            args[0].includes("v7_startTransition") ||
            args[0].includes("v7_relativeSplatPath")
        ) {
            return; 
        }
        originalWarn(...args);
    };

    return(
        <Router>
            <Stack 
              minH={"100vh"} 
              backgroundImage={`url(${bgImage})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
            >
                <Toaster />
                <Routes>
                    <Route path="/api/register" element={<Register  setUsername={setUsername} setPassword={setPassword} />}/>
                    <Route 
                        path="/api/kontakty" 
                        element={
                            isLogged ? (
                              <>
                                  <Navbar setContacts={setContacts} setIsLogged={setIsLogged} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                                  <Description text={"Twoje Kontakty"}/>
                                  <ContactsGrid contacts={contacts} setContacts={setContacts}/>
                              </>        
                            ):(
                                  <Navigate to="/api/login"/>
                            )
                        } 
                    />                    
                    <Route path="/api/login" element={<Login setUsername={setUsername} setPassword={setPassword} setIsLogged={setIsLogged} setCurrentUser={setCurrentUser}/>}/>
                </Routes>
                <Footer />
            </Stack>
        </Router>
    )
}

export default App

import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvdider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(()=>{
    if (token){
      getProfileData(token);
    } else{
      setUserData(null);
    }
  }, [token]);

  function handleLogout(){
    localStorage.removeItem("token");
    setToken(null);
  }
  async function getProfileData(token) {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            token: token,
          },
        }
      );
      if(data.message =="success"){
        console.log("data", data);
        setUserData(data.user);
      } else if(data.error){
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, handleLogout, userData, getProfileData }}>
      {children}
    </AuthContext.Provider>
  );
}

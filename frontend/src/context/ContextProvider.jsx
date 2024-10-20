import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react"
import { base_url } from "../../public/api";

const authContext = createContext()

  const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const login = (user) =>{
        setUser(user);
    }
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }
    useEffect(() => {
     const verifyUser = async () => { 
      try {
        const res = await axios.get(`${base_url}auth/verify`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (res.data.success) {
          setUser(res.data.user);
        }else{
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        
      }}
      verifyUser();
    },[])
  return (
    <authContext.Provider value={{user, login, logout}}>
        {children}
    </authContext.Provider  >

  )
}

export const useAuth = () => useContext(authContext);
export default ContextProvider;

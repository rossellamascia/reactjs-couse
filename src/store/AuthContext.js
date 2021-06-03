import React, { useEffect, useState } from 'react';


const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout: () => {},
    onLogin: (email, password) => {}
})

export default AuthContext;

export const AuthContextProvider = (props) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const storedUserLoggedInInformation = localStorage.getItem('isLogged')
        storedUserLoggedInInformation === '1' && setIsLoggedIn(true) 
    },[]);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLogged', '1')
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.clear('isLogged')
        setIsLoggedIn(false);
      };
    return (
    <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}> 
        {props.children}
    </AuthContext.Provider>
    )
}
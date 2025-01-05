import { createContext, useState } from 'react';

const AuthContext = createContext();
const AuthProvider = (props) => {
   const [auth, setAuth] = useState({ loggedIn: !!localStorage.getItem('authToken'), token: localStorage.getItem('authToken'), user: null });

   const setUser = ({ user }) => {
      setUser({ loggedIn: !!localStorage.getItem('authToken'), token: localStorage.getItem('authToken'), user });
   };

   const contextValue = {
      auth,
      setUser,
   };

   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;

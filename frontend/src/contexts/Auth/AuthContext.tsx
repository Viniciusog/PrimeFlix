

import { createContext, useState, useContext} from 'react';
import {useCallback, useMemo, useEffect} from 'react';
import API from '../../../source/axios'


interface IAuthContextData {
    isAuthenticated: boolean;
  }
  
  
  const AuthContext = createContext({} as IAuthContextData);
  
  
  interface IAuthProviderProps {
    children: React.ReactNode;
  }
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('ACCESS_TOKEN') || "");
   
    useEffect(() => {
      if (accessToken) {
        console.log("Setando is authenticated como true")
        setIsAuthenticated(true)
      } else {
        console.log("setando is athenticated como false")
        setIsAuthenticated(false);
      }
    }, [accessToken]);

    //const isAuthenticated = useMemo(() => accessToken != null, [accessToken]);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated}}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuthContext = () => useContext(AuthContext);
import React, {Dispatch, SetStateAction, useContext, useEffect} from 'react';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {ReactNode, createContext, useState} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {HubCallback} from '@aws-amplify/core';

type UserType = CognitoUser | null | undefined;
type AuthContextType = {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
});
const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        setUser(authUser);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
    };
    const cancelListener = Hub.listen('auth', listener);
    return cancelListener;
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);

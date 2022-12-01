import React, {createContext, useEffect, useState} from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const register = (name, email, password) => {
    
        axios
          .post(`http://localhost:5000/api/users/register`, {
            name,
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            // setUserInfo(userInfo);
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // setIsLoading(false);
            console.log(userInfo);
          })
          .catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
          });
      };
    return (
      <AuthContext.Providervalue value={{  register }}>
        {children}
      </AuthContext.Providervalue>
    );
  };
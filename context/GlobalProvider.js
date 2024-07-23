import React, { createContext, useContext, useEffect, useState } from "react";

import { currentUser } from '../api/user_api';
import { allPoll } from '../api/poll_api'

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    currentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    allPoll()
      .then((res) => {
        if (res) {
          setPolls(res);
        } else {
          setPolls(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  
  // console.log('this is the poll data comign form global :', polls);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        polls,
        setPolls,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
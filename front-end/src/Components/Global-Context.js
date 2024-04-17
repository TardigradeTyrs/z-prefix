import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const loggedInContext = createContext();


export const LoggedInProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(0);
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  const [ individualItem, setIndividualItem ] = useState({})
  const navigate = useNavigate()
  const handleItemClick = (item) => {
   setIndividualItem(item)
   navigate('/itemview')
  }
  return (
    <loggedInContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        refreshToggle,
        setRefreshToggle,
        individualItem,
        setIndividualItem,
        handleItemClick
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};


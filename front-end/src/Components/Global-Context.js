import React, { createContext, useState } from "react";

export const loggedInContext = createContext();


export const LoggedInProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(0);
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  const [ individualItem, setIndividualItem ] = useState({})

  return (
    <loggedInContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        refreshToggle,
        setRefreshToggle,
        individualItem,
        setIndividualItem
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};


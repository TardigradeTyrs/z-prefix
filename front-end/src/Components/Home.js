import React, { useContext } from 'react'
import { loggedInContext } from "./Global-Context"

export const Home = () => {
  const { loggedInUser } =
  useContext(loggedInContext);

  return(
    <>
    <h2>Welcome {loggedInUser !== 0 ? "Inventory Manager!" : "Guest!" } </h2>
    </>
  )
}
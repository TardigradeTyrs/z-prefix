import React, {useContext} from 'react';
import './App.css';
import { UserLogin } from './Components/login_feature'
import { MyInventory, AllInventory, IndividualItem } from './Components/inventory'
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Components/Home'
import { loggedInContext } from "./Components/Global-Context"
import { useNavigate } from "react-router-dom";

function App() {
  const { loggedInUser, setLoggedInUser } =
  useContext(loggedInContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    setLoggedInUser(0)
    navigate('/')
  }

  return (
    <div className="App">
      <h1>"Business Name" Inventory</h1>
      {loggedInUser === 0 ? <button onClick={()=> navigate('/login')}>Login</button> : <button onClick={() => handleLogOut()}>Log Out</button>}
      <nav>
      <div className = 'navbarcontainer'>
          <ul className = 'navbar' style={{ listStyleType: "none" }} >
            <li style={{marginRight: '10px'}} ><Link to="/">Home</Link></li>
            <li style={{marginRight: '10px' }} ><Link to="/inventory">Inventory</Link></li>
            {loggedInUser === 0 ? [] :
            <li style={{marginRight: '10px' }} ><Link to="/myinventory">My Inventory</Link></li>
            }
        </ul>
        </div>
      </nav>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<UserLogin />} />
    <Route path='/myinventory' element={<MyInventory />} />
    <Route path='/inventory' element={<AllInventory />} />
    <Route path='/itemview' element={<IndividualItem />} />
  </Routes>
    </div>
  );
}

export default App;

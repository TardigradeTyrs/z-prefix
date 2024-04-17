import logo from './logo.svg';
import './App.css';
import { UserLogin } from './Components/login_feature'
import { MyInventory, AllInventory } from './Components/inventory'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <div>working...</div>
      </nav>
  <Routes>
    <Route path='/login' element={<UserLogin />} />
    <Route path='/myinventory' element={<MyInventory />} />
    <Route path='/inventory' element={<AllInventory />} />
  </Routes>
    </div>
  );
}

export default App;

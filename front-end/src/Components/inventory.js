import React, { useState, useEffect, useRef, useContext } from "react";
import { loggedInContext } from "./Global-Context"

export const Inventory = () => {
const {loggedInUser, refreshToggle, setRefreshToggle} = useContext(loggedInContext);
const [ inventory, setInventory ] = useState([]);
const [ additem, setAddItem ] = useState(false)
const [ newItem, setNewItem ] = useState({})
const pageRendered = useRef(false);

useEffect(() => {
  fetch(`http://localhost:8080/inventory`)
    .then(res => res.json())
    .then(resJson => resJson.filter((item) => item.UserId === loggedInUser))
    .then(inventory => setInventory(inventory))
} , [loggedInUser, refreshToggle])

useEffect(() => {
  if (pageRendered.current) {
  fetch('http://localhost:8080/inventory', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  }).then(res => {
    if(res.status === 201){
      setRefreshToggle(!refreshToggle)
      setAddItem(false)
    } else{
      console.log("failed")
    }
  })
}
pageRendered.current = true
}, [newItem])

const handleNewItem = (e) => {
  e.preventDefault();
  setNewItem({
    UserId: loggedInUser,
    Item_Name: document.getElementById('item_name').value,
    Description: document.getElementById('item_description').value,
    Quantity: document.getElementById('quantity').value
  })
}

const handleEdit = (index) => {
  let list = document.getElementById(`item${index}`)
  list.contentEditable = true;
}

return (
  <>
  {inventory.length === 0 ?
  <p>No Inventory to show!</p>
:
  inventory.map((eitem, index) => {
    return(<ul id={`item${index}`}>Item:{index+1}
      <li id={`name${index}`}>Name:{eitem.Item_Name}</li>
      <li id={`Quantity${index}`}>Quantity:{eitem.Quantity}</li>
      <li id={`Description${index}`}>Description:{eitem.Description.substring(0,100)}</li>
      <button id={`Edit${index}`} onClick={(e) => handleEdit(index)}>Edit</button>
    </ul>)
  })
}
{additem === false ?
<button onClick={() => setAddItem(true)}>Add Item</button>
:
<form>
  <label>Item Name:</label>
  <input type="text" id="item_name"/>
  <label>Description:</label>
  <input type="text" id="item_description"/>
  <label>Quantity:</label>
  <input type="number" id="quantity" />
  <button onClick={(e) => handleNewItem(e)}>Submit</button>
  <button onClick={() => setAddItem(false)}>Cancel</button>
</form>
}
  </>
)
}
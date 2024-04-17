import React, { useState, useEffect, useRef, useContext } from "react";
import { loggedInContext } from "./Global-Context";
import { useNavigate } from "react-router-dom";

export const MyInventory = () => {
  const { loggedInUser, refreshToggle, setRefreshToggle, setIndividualItem } =
    useContext(loggedInContext);
  const [inventory, setInventory] = useState([]);
  const [additem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({});
  const pageRendered = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/inventory`)
      .then((res) => res.json())
      .then((resJson) => resJson.filter((item) => item.UserId === loggedInUser))
      .then((inventory) => setInventory(inventory));
  }, [loggedInUser, refreshToggle]);

  useEffect(() => {
    if (pageRendered.current) {
      fetch("http://localhost:8080/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      }).then((res) => {
        if (res.status === 201) {
          setRefreshToggle(!refreshToggle);
          setAddItem(false);
        } else {
          console.log("failed");
        }
      });
    }
    pageRendered.current = true;
  }, [newItem]);

  const handleNewItem = (e) => {
    e.preventDefault();
    setNewItem({
      UserId: loggedInUser,
      Item_Name: document.getElementById("item_name").value,
      Description: document.getElementById("item_description").value,
      Quantity: document.getElementById("quantity").value,
    });
  };

  const handleEdit = (index) => {
    let list = document.getElementById(`item${index}`);
    list.contentEditable = true;
  };

  const handleDelete = async (e, item, name) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      fetch("http://localhost:8080/inventory", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: item }),
      }).then((res) => {
        if (res.status === 202) {
          window.alert(`${name} Deleted!`);
          setRefreshToggle(!refreshToggle);
        }
      });
    }
  };

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Description</th>
          <th></th>
        </tr>

        {inventory.length === 0 ? (
          <tr>
            <td>No Inventory to show!</td>
            <td></td>
            <td></td>
          </tr>
        ) : (
          inventory.map((eitem, index) => {
            return (
              <tr>
                <td id={`name${index}`}>{eitem.Item_Name}</td>
                <td id={`Quantity${index}`}>{eitem.Quantity}</td>
                <td id={`Description${index}`}>
                  {eitem.Description.substring(0, 100)}
                </td>
                <td>
                  <button
                    id={`Edit${index}`}
                    onClick={(e) => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, eitem.Id, eitem.Item_Name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </table>
      {additem === false ? (
        <button onClick={() => setAddItem(true)}>Add Item</button>
      ) : (
        <form>
          <label>Item Name:</label>
          <input type="text" id="item_name" />
          <label>Description:</label>
          <input type="text" id="item_description" />
          <label>Quantity:</label>
          <input type="number" id="quantity" />
          <button onClick={(e) => handleNewItem(e)}>Submit</button>
          <button onClick={() => setAddItem(false)}>Cancel</button>
        </form>
      )}
    </>
  );
};

export const AllInventory = () => {
  const { refreshToggle, setIndividualItem } = useContext(loggedInContext);
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/inventory`)
      .then((res) => res.json())
      .then((inventory) => setInventory(inventory));
  }, [refreshToggle]);

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Description</th>
        </tr>
        {inventory.length === 0 ? (
          <tr>
            <td>No Inventory to show!</td>
            <td></td>
            <td></td>
          </tr>
        ) : (
          inventory.map((eitem, index) => {
            return (
              <tr id={`item${index}`}>
                <td id={`name${index}`}>{eitem.Item_Name}</td>
                <td id={`Quantity${index}`}>{eitem.Quantity}</td>
                <td id={`Description${index}`}>
                  {eitem.Description.substring(0, 100)}
                </td>
              </tr>
            );
          })
        )}
      </table>
    </>
  );
};

export const IndividualItem = () => {



}
import React, { useState, useEffect, useRef, useContext } from "react";
import { loggedInContext } from "./Global-Context";

export const MyInventory = () => {
  const { loggedInUser, refreshToggle, setRefreshToggle, handleItemClick } =
    useContext(loggedInContext);
  const [inventory, setInventory] = useState([]);
  const [additem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({});
  const pageRendered = useRef(false);

  useEffect(() => {
    fetch(`http://localhost:8080/inventory`)
      .then((res) => res.json())
      .then((resJson) => resJson.filter((item) => item.UserId === loggedInUser))
      .then((inventory) => setInventory(inventory));
  }, [loggedInUser, refreshToggle]);

  useEffect(() => {
    if (pageRendered.current) {
      console.log("NewItem Running");
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

  const handleEdit = (index, item) => {
    let button = document.getElementById(`Edit${index}`);
    if (button.innerHTML === "Edit") {
      let list = document.getElementById(`item${index}`);
      list.contentEditable = true;
      button.innerHTML = "Save";
    } else {
      handleItemUpdate(index, item);
      button.innerHTML = "Edit";
    }
  };

  const handleItemUpdate = (index, item) => {
    let { Id } = item;
    fetch("http://localhost:8080/inventory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id: Id,
        Item_Name: document.getElementById(`name${index}`).innerHTML,
        Description: document.getElementById(`Description${index}`).innerHTML,
        Quantity: document.getElementById(`Quantity${index}`).innerHTML,
      }),
    }).then((res) => {
      if (res.status !== 202) {
        window.alert("There was an issue with updaing this item.");
      }
    });
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
              <tr key={`item${index}`} id={`item${index}`}>
                <td id={`name${index}`}>{eitem.Item_Name}</td>
                <td id={`Quantity${index}`}>{eitem.Quantity}</td>
                <td id={`Description${index}`}>
                  {eitem.Description.substring(0, 100) +
                    (eitem.Description.length > 100 ? "..." : "")}
                </td>
                <td>
                  <button onClick={() => handleItemClick(eitem)}>View</button>
                  <button
                    id={`Edit${index}`}
                    onClick={(e) => handleEdit(index, eitem)}
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
  const { refreshToggle, handleItemClick } = useContext(loggedInContext);
  const [inventory, setInventory] = useState([]);

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
              <tr onClick={() => handleItemClick(eitem)} key={`item${index}`}>
                <td id={`name${index}`}>{eitem.Item_Name}</td>
                <td id={`Quantity${index}`}>{eitem.Quantity}</td>
                <td id={`Description${index}`}>
                  {eitem.Description.substring(0, 100) +
                    (eitem.Description.length > 100 ? "..." : "")}
                </td>
                <td>
                  <button onClick={() => handleItemClick(eitem)}>View</button>
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
  const { individualItem } = useContext(loggedInContext);

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Description</th>
      </tr>
      <tr key={individualItem.id}>
        <td id={individualItem.Item_Name}>{individualItem.Item_Name}</td>
        <td id={individualItem.Quantity}>{individualItem.Quantity}</td>
        <td id={individualItem.Description}>{individualItem.Description}</td>
      </tr>
    </table>
  );
};

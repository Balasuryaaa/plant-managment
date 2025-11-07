import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: "", type: "", price: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedPlants = JSON.parse(localStorage.getItem("plants")) || [];
    setPlants(savedPlants);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const handleAddPlant = () => {
    if (!newPlant.name || !newPlant.type || !newPlant.price) return;
    if (editIndex !== null) {
      const updatedPlants = [...plants];
      updatedPlants[editIndex] = newPlant;
      setPlants(updatedPlants);
      setEditIndex(null);
    } else {
      setPlants([...plants, newPlant]);
    }
    setNewPlant({ name: "", type: "", price: "" });
  };

  const handleEdit = (index) => {
    setNewPlant(plants[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setPlants(plants.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>🌿 Plant Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Plant Name"
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newPlant.type}
          onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPlant.price}
          onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
        />
        <button onClick={handleAddPlant}>
          {editIndex !== null ? "Update Plant" : "Add Plant"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>Type</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, index) => (
            <tr key={index}>
              <td>{plant.name}</td>
              <td>{plant.type}</td>
              <td>{plant.price}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

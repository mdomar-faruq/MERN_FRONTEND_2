import './App.css';
import Axios from 'axios';
import { useState, useEffect } from "react";
function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    if (!name || !age) {
      alert("Please fill out all fields!");
      return;
    }

    Axios.post('http://localhost:3001/addfriend', { name, age })
      .then(() => {
        setListOfFriends([...listOfFriends, { name: name, age: age }]);
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
  };

  const updateFriend = async (id) => {
    try {
      const newAge = prompt("Enter new age: ");
      if (!newAge || isNaN(newAge)) {
        console.error("Invalid age entered. Please enter a numeric value.");
        return;
      }
  
      const response = await Axios.put('http://localhost:3001/update', {
        newAge: newAge,
        id: id
      }).then(()=>{
        setListOfFriends(listOfFriends.map((val)=>{
          return val._id == id ? {_id: id, name: val.name, age: newAge} : val;
        }))
      });
  
      console.log("Friend updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating friend:", error.message);
    }
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input type='text'
          placeholder='Friend Name...'
          onChange={(event) => { setName(event.target.value) }}
        />
        <input type='number' placeholder='Friend Age...' onChange={(event) => { setAge(event.target.value) }} />

        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className='listOfFriends'>
        {listOfFriends.map((val) => {
          return (
              <div className='friendContainer'>
                <div className='friend'>
                  <h3> <b>Name:</b>{val.name}</h3>
                  <h3> <b>Age:</b>{val.age}</h3>
                </div>
                <button onClick={()=>{updateFriend(val._id)}}>Update</button>
                <button id="removeBtn">X</button>
              </div>
          );
        })};

      </div>
    </div>
  );
}

export default App;

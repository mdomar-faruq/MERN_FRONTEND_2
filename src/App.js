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
        setListOfFriends([...listOfFriends,{name:name,age:age}]);
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
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

      {listOfFriends.map((val, index) => {
        return <div key={index}> {val.name} {val.age} </div>;
      })}

    </div>
  );
}

export default App;

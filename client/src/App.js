import Chat from './Components/Chat'
import { useState } from 'react';
import io from 'socket.io-client'
import './App.css';


const socket = io.connect("http://localhost:8080")

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat,setShowChat] = useState(false)

  const joinRoom = ()=>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        
          <div className='inputBox'>
            <h2>Lets join to our Chat</h2>
              <input type="text" placeholder='Your Name...' onChange={(event)=>{setUsername(event.target.value)}}/>
              <input type="text" placeholder='Room ID...' onChange={(event)=>{setRoom(event.target.value)}}/>
              <button onClick={joinRoom}>Join</button>
          </div>)
  : (
      <Chat socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default App;

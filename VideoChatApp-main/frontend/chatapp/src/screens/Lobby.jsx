import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const navigate=useNavigate()

  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room-join", { email: email, room: room });
    },
    [email, room, socket]
  );
  const handleJoinRoom=useCallback((data)=>{
    const{email,room}=data;
    navigate(`/room/${room}`);
  },[navigate])

  useEffect(()=>{
    socket.on('room-join',handleJoinRoom)
    return ()=>{
    socket.on('room-join',handleJoinRoom)
    socket.off('room-join',);
    }
  },[handleJoinRoom, socket])

  
  return (
    <div>
      <h1>Lobby Screen</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="roomId">Room Id</label>
        <input
          type="text"
          id="roomId"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default LobbyScreen;

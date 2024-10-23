import { Route, Routes } from "react-router-dom";
import { SocketProvider } from "./providers/Socket";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
//import RoomPage from "./pages/Room";
function App() {
  return (
    <>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<LobbyScreen/>} />
          <Route path="/room/:roomId" element={<RoomPage/>} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App;

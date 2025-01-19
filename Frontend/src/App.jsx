import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";
import Map from "./pages/Map";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:userId" element={<ProfileDetails />} />
      <Route path="/map/:userId" element={<Map />} />
      <Route path="/add-user" element={<AddUser />} />
    </Routes>
  );
}

export default App;
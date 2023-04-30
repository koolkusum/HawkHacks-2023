import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import StudentPage from './components/StudentPage';
import './PixelArtBackground.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path = "/Signup" element = {<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path = "/StudentPage" element={<StudentPage />} />

    </Routes>
    </BrowserRouter>

  );
}

export default App;

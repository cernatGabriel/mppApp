// Import necessary modules
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Register from './components/Register';
import Login from './components/Login';

import AlbumManagement from './components/AlbumManagement';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Define the App component
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/albums/:artistId" element={<AlbumManagement/>} />
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component
export default App;

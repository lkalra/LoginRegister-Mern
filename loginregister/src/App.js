import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import{ BrowserRouter, Routes, Route} from "react-router-dom"
import {useState} from 'react'

function App() {

  const [user, setLogin] = useState({})
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user && user._id ?<Homepage/>:<Login setLogin={setLogin}/>}></Route>
          <Route path="/login" element={<Login setLogin={setLogin}/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

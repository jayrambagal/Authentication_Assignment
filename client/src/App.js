import './App.css';
import Login from './components/login';
import {Routes, Route} from "react-router-dom";
import Register from './components/register';
import  Home from './components/Home'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='SignUp' element={<Register/>} />
      <Route path='/users/:id' element={<Home/>} />
    </Routes>
     <Login />
    </div>
  );
}

export default App;

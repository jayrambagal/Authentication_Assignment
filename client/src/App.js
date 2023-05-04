import './App.css';
import Login from './components/login';
import {Routes, Route} from "react-router-dom";
import Register from './components/register';
import  Home from './components/Home'
import Reset from './components/Reset';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route exact path='SignUp' element={<Register/>} />
      <Route exact path='/users/:id' element={<Home/>} />
      <Route exact path='reset' element={<Reset/>} />
    </Routes>
     <Login />
    </div>
  );
}

export default App;

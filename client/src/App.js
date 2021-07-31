import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router'
import LoginForm from './components/Form';
import Home from './components/Home';
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie';


function App() {
  const [permission,setPermission] = useState(false)
  useEffect(() =>{
    if(Cookies.get('permission')){
      setPermission(true)
    }
    else{
      setPermission(false)
    }
  },[])
  return (
    <div className="App">

    <Router>
      {
        permission
        ?<Home setPermission={setPermission} path="/home"/>
        :<LoginForm setPermission={setPermission} path="/"/>
      }
    </Router>

    </div>
  );
}

export default App;

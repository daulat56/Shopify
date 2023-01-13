import './App.css';
import Nav from "./components/Nav";
import Footer from "./components/Footer"
import Signup from './components/Signup';
import PvtCom from './components/PvtCom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import UpdateProduct from './components/UpdateProduct';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">

      {/* BrowserRouteris used to wrap to make link active */}
      <BrowserRouter> 
      <Nav/>
      
      <Routes>
    {/* whichever com to make pivate use under route pvecom in element form */}
        <Route element={<PvtCom/>}> 

          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          <Route path="/logout" element={<h2> logout component</h2>}/>
          <Route path="/profile" element={<h2> profile component</h2>}/>

          </Route>
          {/* signup is routed here */} 
          <Route path="/signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

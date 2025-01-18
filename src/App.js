import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <Header />
        
        <div  className="pages-container">
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            <Route path="/Products" element={<Products />}></Route>
            <Route path="/Users" element={<Users />}></Route>
            <Route path="/Settings" element={<Settings />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

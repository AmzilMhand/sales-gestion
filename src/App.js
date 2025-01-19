import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/SalesForm/SalesForm";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";
import SalesList from "./pages/SalesList/SalesList";
import SalesForm from "./pages/SalesForm/SalesForm";

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
            <Route path="/sellers" element={<Users />}></Route>
            <Route path="/sales" element={<SalesList />}></Route>
            <Route path="/sales-form" element={<SalesForm />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

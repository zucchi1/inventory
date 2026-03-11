
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import AddShop from "./Pages/AddShop";
import AddInventory from "./Pages/AddInventory";
import ShowInventory from "./Pages/ShowInventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product"element={<AddProduct/>}/>
        <Route path="/shop"element={<AddShop/>}/>
        <Route path="/inventory"element={<AddInventory/>}/>
        <Route path="/table" element={<ShowInventory />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

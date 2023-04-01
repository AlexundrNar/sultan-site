import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Card from "../pages/Card";
import Catalog from "../pages/Catalog";
import Checkout from "../pages/Checkout"

const Routers: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/card/:id" element={<Card />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  );
};

export default Routers;

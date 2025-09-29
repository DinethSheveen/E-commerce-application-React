import axios from "axios";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage cartProducts={cart} />} />
        <Route
          path="checkout"
          element={<Checkout cartProducts={cart} loadCart={loadCart} />}
        />
        <Route path="orders" element={<Orders cartProducts={cart} />} />
        <Route path="tracking" element={<Tracking cartProducts={cart} />} />
      </Routes>
    </>
  );
}

export default App;

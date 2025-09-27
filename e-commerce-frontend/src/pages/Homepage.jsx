import axios from "axios";
import "./Homepage.css";
import Header from "../assets/components/Header";
import Product from "../assets/components/Product"
import { useEffect, useState } from "react"


function Homepage(props) {
  const [products, setProducts] = useState([]);

  //FETCHING DATA FROM THE BACKEND  (ASYNC CODE - TAKES SOME TIME TO FINISH)
  useEffect(() => {
    const loadProducts = async () => {
      let response = await axios.get("/api/products");
      setProducts(response.data);
    };
    loadProducts();
  }, []);

  return (
    <>
      <title>E Commerce Website</title>
      <Header cartProducts={props.cartProducts} />
      <div>
        <div className="home-page">
          <div className="products-grid">
            {products.map((product, index) => {
              return (
                <Product key={index} product={product}/>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

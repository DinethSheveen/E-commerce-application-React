import React from "react";
import "./header.css";
import "./Homepage.css";
import Header from "./Header";
import { products } from "../assets/data/products";

function Homepage() {

  //FETCHING DATA FROM THE BACKEND  (ASYNC CODE - TAKES SOME TIME TO FINISH)
  fetch("http://localhost:3000/api/products").then((response)=>{      //RETURNS A PROMISE
    return response.json();
  }).then((data)=>{
    console.log(data);
    
  })

  return (
    <>
      <title>E Commerce Website</title>
      <Header />
      <div>
        <div className="home-page">
          <div className="products-grid">
            {products.map((product, index) => {
              return (
                <div className="product-container" key={index}>
                  <div className="product-image-container">
                    <img className="product-image" src={product.productImage} />
                  </div>

                  <div className="product-name limit-text-to-2-lines">
                    {product.productName}
                  </div>

                  <div className="product-rating-container">
                    <img
                      className="product-rating-stars"
                      src={`images/ratings/rating-${
                        product.productRating.stars * 10
                      }.png`}
                    />
                    <div className="product-rating-count link-primary">
                      {product.productRating.count}
                    </div>
                  </div>

                  <div className="product-price">
                    &pound;
                    {`${(product.productPrice / 100).toFixed(2)}`}
                  </div>

                  <div className="product-quantity-container">
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div className="product-spacer"></div>

                  <div className="added-to-cart">
                    <img src="images/icons/checkmark.png" />
                    Added
                  </div>

                  <button className="add-to-cart-button button-primary">
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

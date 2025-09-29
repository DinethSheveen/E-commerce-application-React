import React, { useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../../public/utils/formatCurrency";

function Product({product}) {
  //A STATE TO MANAGE THE QUANTITY OF A PRODUCT
  const [quantity, setQuantity] = useState(1);
  //A STATE TO SHOW THE ADDED MESSAGE TO THE USER WHEN A PRODUCT IS ADDED
  const[message,setMessage] = useState(false)

  const addToCart = async()=>{
        await axios.post("/api/cart-items", {
            productId: product.id,
            quantity: quantity,
    });

    setTimeout(()=>{
       setMessage(true)
    },500)

    setTimeout(()=>{
      setMessage(false)
    },3000)
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        &pound;
        {`${formatCurrency(product.priceCents)}`}
      </div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
        >
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

      <div className="added-to-cart" style={{opacity: message?1 : 0}}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;

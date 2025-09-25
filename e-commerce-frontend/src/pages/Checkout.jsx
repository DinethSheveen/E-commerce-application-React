import axios from "axios"
import {useState,useEffect} from "react"
import "./Checkout.css";
import "./Checkout-header.css";
import { Link } from "react-router";
import dayjs from "dayjs"

function Checkout(props) {
  const cartProducts = props.cartProducts;
  const [deliveryOptions,setDeliveryOptions] = useState([])

  useEffect(()=>{
    axios.get("/api/delivery-options?expand=estimatedDeliveryTime").then((response)=>{
      setDeliveryOptions(response.data)
    })
  },[])  

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/" className="header-link">
              E Commerce Website
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartProducts.map((cartProduct) => {   
              
              const selectedDeliveryDate = deliveryOptions.find((deliveryOption)=>{
                return deliveryOption.id === cartProduct.deliveryOptionId
              })
              
              return (
                <div key={cartProduct.product.id} className="cart-item-container">
                  <div className="delivery-date">
                    {`Delivery Date : ${dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format("dddd, MMMM D")}`}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={`${cartProduct.product.image}`}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartProduct.product.name}
                      </div>
                      <div className="product-price">&pound;{(cartProduct.product.priceCents/100).toFixed(2)}</div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartProduct.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption)=>{
                        let deliverPrice = "FREE Shipping";

                        if(deliveryOption.priceCents > 0){
                          deliverPrice = `${(deliveryOption.priceCents/100).toFixed(2)} - Shipping` 
                        }

                        return (
                            <div key={deliveryOption.id} className="delivery-option">
                              <input
                                type="radio"
                                checked = {deliveryOption.id === cartProduct.deliveryOptionId}
                                className="delivery-option-input"
                                name= {`delivery-option-${cartProduct.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {deliverPrice}
                                </div>
                              </div>
                            </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">&pound;42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">&pound;4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">&pound;47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">&pound;4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">&pound;52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;

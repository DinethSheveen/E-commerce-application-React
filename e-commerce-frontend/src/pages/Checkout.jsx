import axios from "axios";
import { useState, useEffect } from "react";
import "./Checkout.css";
import "./Checkout-header.css";
import { Link } from "react-router";
import dayjs from "dayjs";
import { calculateTotalProducts } from "../../public/utils/calcTotalProducts";
import { formatCurrency } from "../../public/utils/formatCurrency";

function Checkout(props) {
  const cartProducts = props.cartProducts;
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  useEffect(() => {
    const loadCheckout = async () => {
      let response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(response.data);
      
      response = await axios.get("/api/payment-summary")
      setPaymentSummary(response.data);
    };

    loadCheckout()
  }, [cartProducts]);

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
              {`${calculateTotalProducts(props)} items`}
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
            {deliveryOptions.length > 0 &&
              cartProducts.map((cartProduct) => {
                const selectedDeliveryDate = deliveryOptions.find(
                  (deliveryOption) => {
                    return deliveryOption.id === cartProduct.deliveryOptionId;
                  }
                );

                return (
                  <div
                    key={cartProduct.product.id}
                    className="cart-item-container"
                  >
                    <div className="delivery-date">
                      {`Delivery Date : ${dayjs(
                        selectedDeliveryDate.estimatedDeliveryTimeMs
                      ).format("dddd, MMMM D")}`}
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
                        <div className="product-price">
                          &pound;
                          {formatCurrency(cartProduct.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartProduct.quantity}
                            </span>
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
                        {deliveryOptions.map((deliveryOption) => {
                          let deliverPrice = "FREE Shipping";

                          if (deliveryOption.priceCents > 0) {
                            deliverPrice = `${formatCurrency(deliveryOption.priceCents)} - Shipping`;
                          }

                          const updateDeliveryOptions = async() => {
                            await axios.put(`/api/cart-items/${cartProduct.productId}`,{
                              deliveryOptionId : deliveryOption.id
                            })

                            props.loadCart()
                          }

                          return (
                            <div
                              onClick={updateDeliveryOptions}
                              key={deliveryOption.id}
                              className="delivery-option"
                            >
                              <input
                                onChange={()=>{}}
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartProduct.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartProduct.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {deliverPrice}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {paymentSummary && (
            <>
              <div className="payment-summary">
                <div className="payment-summary-title">Payment Summary</div>

                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    &pound;{formatCurrency(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    &pound;{formatCurrency(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    &pound;
                    {formatCurrency(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    &pound;{formatCurrency(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    &pound;{formatCurrency(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;

import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import "./Orders.css";
import Header from "../assets/components/Header";
import { Link } from "react-router";
import dayjs from "dayjs"
import { formatCurrency } from "../../public/utils/formatCurrency";

function Orders(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async()=>{
      const response = await axios.get("/api/orders?expand=products")
      setOrders(response.data)
    }

    loadOrders()
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cartProducts = {props.cartProducts}/>
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {dayjs(order.orderTimeMs).format("MMMM  DD")}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>&pound;{formatCurrency(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.productId}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image}/>
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM d")}
                          </div>
                          <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                        </div>

                        <div className="product-actions">
                          <Link to="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Orders;

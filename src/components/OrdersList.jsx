import React from "react";
import "../styles/components/ordersList.css";
import { BsFillCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { LoaderElipsis } from "../components/loaders/loaderElipsis.jsx";
const OrdersList = ({
  order,
  buttoms,
  handleCart,
  cart,
  dispathOrdersHistory,
  handleOrderStatus,
  changeStatus,
  userState,
  statusOption,
  loadingUpdate,
  deleteOrder,
}) => {
  return (
    <li className="cardOrder_item">
      <div className="orderHistory_shopCard-total">
        <p>total:</p>
        <span>${order.totalPrice}</span>
      </div>
      <div className="cardOrder_item-title">
        <h3>{order.timestamp}</h3>
        <div className="cardOrder_item-code">
          <p>codigo de transaccion:</p>
          <span>{order.orderId}</span>
        </div>
        <div className="ordersAdmin">
          {buttoms === "admin" && !loadingUpdate ? (
            <>
              <select
                className="ordersAdmin-Select"
                value={statusOption.status}
                name="status"
                onChange={handleOrderStatus}
              >
                <option name="entregado">entregado</option>
                <option name="enviado">enviado</option>
                <option name="pago-confirmado">pago-confirmado</option>
                <option name="revision">revision</option>
                <option name="error">error</option>
              </select>
              <button
                className="ordersAdmin-Btn "
                onClick={() => changeStatus(order.orderId)}
              >
                cambiar
              </button>
            </>
          ) : (
            loadingUpdate && <LoaderElipsis />
          )}
        </div>
        <div className="cardOrder_item-status">
          <div className="cardOrder_item-statusDelivery">
            <p>
              {!!order.countryState & !!order.address
                ? `${order.envio}:`
                : `${order.envio}`}
            </p>
            <span>
              {!!order.countryState & !!order.address
                ? `${order.countryState}-${order.address}`
                : undefined}
            </span>
          </div>
          <div className="cardOrder_item-statusCheck">
              <p>{order.status}</p>
              {order.status === "entregado" ? (
                <BsCheckCircleFill size={20} color={"#39c4a1"} />
              ) : order.status === "enviado" ? (
                <RiSendPlaneFill size={20} color={"#39c4a1"} />
              ) : order.status === "pago-confirmado" ? (
                <BsFillCircleFill size={20} color={"#39c4a1"} />
              ) : order.status === "revision" ? (
                <BsFillCircleFill size={20} color={"orange"} />
              ) : (
                <BsFillCircleFill size={20} color={"#FF7272"} />
              )}
           
          </div>
        </div>
      </div>
      <div className="cardOrder_item-info">
        <ul>
          <li>
            <p>nombre</p>
            <span>{order.name}</span>
          </li>
          <li>
            <p>email</p>
            <span>{order.email}</span>
          </li>
          <li>
            <p>metodo de pago:</p>
            <span>{order.paidMethod}</span>
          </li>
        </ul>
      </div>
      <div className="cardOrder_shopCard">
        {order.shop.map((item) => (
          <div key={`shop-${item.id}`} >
            <ul>
              <li className="cardOrder_shopCard-imgWrapper">
                <img
                  style={{ maxWidth: "100px" }}
                  src={item.img}
                  alt={`foto producto-${item.name}`}
                />
              </li>
              <li>
                <p>Articulo:</p>
                <span>{item.name}</span>
              </li>
              <li>
                <p>precio:</p>
                <span>${item.price}</span>
              </li>
              <li>
                <p>cantidad:</p>
                <span>{item.quantity}</span>
              </li>
              <li> 
                {buttoms === "buyer" && (
                  <button
                    className="cardOrder_shopCard-btn-buy"
                    onClick={() => {
                      handleCart(item);
                    }}
                  >
                    {cart.cart.map((i) => i.id).includes(item.id) === item.id
                      ? "añadido"
                      : "volver a comprar"}
                  </button>
                )}
              </li>
            </ul>
          </div>
        ))}
        <ul>
          <li className="cardOrder_shopCard-btn">
              <button className="cardOrder_shopCard-btn-Delete"
              onClick={() => deleteOrder(order.orderId)}
              disabled={(userState.db.admin || order.status === 'entregado' )=== true ? false : true}
            >
              <AiFillDelete size={32} />
            </button>
           
          </li>
        </ul>
      </div>
    </li>
  );
};

export { OrdersList };

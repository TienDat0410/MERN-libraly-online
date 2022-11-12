import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCallCart, removeItemFromCart } from "../../redux/actions/callcard/callCardAction";


const Cart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { callCardItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCallCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCallCart(id, newQty));
  };

  const checkoutHandler = () => {
    history("/shipping");
  };

  return (
    <Fragment>
      {callCardItems.length === 0 ? (
        <h2 style={{ marginTop: "200px" }}>Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 style={{ marginTop: "200px" }}>
            Your Cart: <b>{callCardItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {callCardItems.map((item) => (
                <Fragment>
                  <hr />

                  <div className="cart-item" key={item._id}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.book_img}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item._id}`}>
                          {item.book_name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>

                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item._id, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item._id,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          style={{color: "white"}}
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item._id)}
                        >Remote</i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {callCardItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {callCardItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.unitPrice,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;

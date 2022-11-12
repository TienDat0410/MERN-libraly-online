import React, { Fragment } from 'react'
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from './CheckoutSteps'

import { useSelector } from 'react-redux'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';



const stripePromise = loadStripe('pk_test_51M2RnIJWdYJbdc7DSlRkynwVzE1WCeqAtHMAMfiKNpuwrk5rLynWLZ90M68YWmOyzaZeRjNJZ6uTCY93GiIGv9B800vVgCD44D');
const ConfirmOrder = () => {
    const history = useNavigate();

    const { callCardItems, loanInfo } = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Order Prices
    const itemsPrice = callCardItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const totalPrice = (itemsPrice + shippingPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            totalPrice,
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data));

        history('/payment');
    }

    return (
        <Fragment>
            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Loan Info</h4>
                    <p><b>Name:</b> {userInfo && userInfo.username}</p>
                    <p><b>Phone:</b> {loanInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${loanInfo.address}, ${loanInfo.city}, ${loanInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {callCardItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item._id}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.book_img} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item._id}`}>{item.book_name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x {item.unitPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} = <b>{(item.quantity * item.unitPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                     {/* <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements> */}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{itemsPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></p>
                        <p>Shipping: <span className="order-summary-values">{shippingPrice}VND</span></p>


                        <hr />

                        <p>Total: <span className="order-summary-values">{totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}VND</span></p>

                        <hr />
                       
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder

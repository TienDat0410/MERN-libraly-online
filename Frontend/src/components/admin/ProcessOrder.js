import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrderDetails, updateOrder } from '../../redux/actions/order/orderAction';
import { UPDATE_ORDER_RESET } from '../../redux/actions/actionsTypes';
import Sidebar from './Sidebar';
import Loader from '../layout/Loader';


const ProcessOrder = () => {

	const history = useNavigate();
	const [status, setStatus] = useState('');

	const dispatch = useDispatch();

	const { loading, order = {} } = useSelector(state => state.orderDetails)
	const { loanInfo, callCardItems, paymentInfo, user, totalPrice, orderStatus } = order
	const { error, success } = useSelector(state => state.order)

	// const orderId = match.params.id;
	const { id } = useParams();

	useEffect(() => {

		dispatch(getOrderDetails(id))

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}


		if (success) {
			alert('Order updated successfully');
			dispatch({ type: UPDATE_ORDER_RESET })			
		}

	}, [dispatch, alert, error, success, id])


	const updateOrderHandler = (id) => {

		const formData = new FormData();
		formData.set('status', status);

		dispatch(updateOrder(id, formData));
		history('/auth');
	}

	const loanDetails = loanInfo && `${loanInfo.address}, ${loanInfo.city}, ${loanInfo.postalCode}, ${loanInfo.country}`
	const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

	return (
		<Fragment>
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<Fragment>
						{loading ? <Loader /> : (
							<div className="row d-flex justify-content-around">
								<div className="col-12 col-lg-7 order-details">

									<h2 className="my-5">Order # {order._id}</h2>

									<h4 className="mb-4">Shipping Info</h4>
									<p><b>Name:</b> {user && user.username}</p>
									<p><b>Phone:</b> {loanInfo && loanInfo.phoneNo}</p>
									<p className="mb-4"><b>Address:</b>{loanDetails}</p>
									<p><b>Amount:</b> ${totalPrice}</p>

									<hr />

									<h4 className="my-4">Payment</h4>
									<p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

									<h4 className="my-4">Stripe ID</h4>
									<p><b>{paymentInfo && paymentInfo.id}</b></p>

									<h4 className="my-4">Order Status:</h4>
									<p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



									<h4 className="my-4">Order Items:</h4>

									<hr />
									<div className="cart-item my-1">
										{callCardItems && callCardItems.map(item => (
											<div key={item.book} className="row my-5">
												<div className="col-4 col-lg-2">
													<img src={item.book_img} alt={item.book_name} height="45" width="65" />
												</div>

												<div className="col-5 col-lg-5">
													<Link to={`/products/${item.product}`}>{item.book_name}</Link>
												</div>


												<div className="col-4 col-lg-2 mt-4 mt-lg-0">
													<p>${item.unitPrice}</p>
												</div>

												<div className="col-4 col-lg-3 mt-4 mt-lg-0">
													<p>{item.quantity} Piece(s)</p>
												</div>
											</div>
										))}
									</div>
									<hr />
								</div>

								<div className="col-12 col-lg-3 mt-5">
									<h4 className="my-4">Status</h4>

									<div className="form-group">
										<select
											className="form-control"
											name='status'
											value={status}
											onChange={(e) => setStatus(e.target.value)}
										>
											<option value="Processing">Processing</option>
											<option value="Shipped">Shipped</option>
											<option value="Delivered">Delivered</option>
										</select>
									</div>

									<button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
										Update Status
									</button>
								</div>

							</div>
						)}
					</Fragment>
				</div>
			</div>

		</Fragment>
	)
}

export default ProcessOrder;

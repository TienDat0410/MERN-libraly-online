import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import Loading from '../Loading/loading'
import { allOrders, clearErrors, myOrders, deleteOrder } from '../../redux/actions/order/orderAction'
import Loader from '../layout/Loader'

const OrdersList = () => {
	// const { id } = useParams();
	const history = useNavigate();

	//Get the book details and fill it in the form
	// const { loading, error, orders } = useSelector((state) => state.myOrders);
	const { loading, error, orders } = useSelector((state) => state.allOrders);


	const dispatch = useDispatch();
	//

	useEffect(() => {
		// dispatch(myOrders());
		dispatch(allOrders());


		if (error) {
			alert(error);
			// dispatch(clearErrors());
		};
	}, [dispatch, alert, error]);

	const deleteOrderHandler = (id) => {
		dispatch(deleteOrder(id));
		history('/auth');
	}



	const setOrders = () => {
		const data = {
			columns: [
				{
					label: "Order ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Amount",
					field: "amount",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
					sort: "asc",
				},
			],
			rows: [],
		};

		// orders.forEach((order) => {
		// 	data.rows.push({
		// 		id: order._id,
		// 		numOfItems: order.callCardItems.length,
		// 		amount: `$${order.totalPrice}`,
		// 		status:
		// 			order.orderStatus &&
		// 				String(order.orderStatus).includes("Delivered") ? (
		// 				<p style={{ color: "green" }}>{order.orderStatus}</p>
		// 			) : (
		// 				<p style={{ color: "red" }}>{order.orderStatus}</p>
		// 			),
		// 		actions: (
		// 			<Link to={`/order/auth/${order && order._id}`} className="btn btn-primary">
		// 				<i className="fa fa-eye"></i>
		// 			</Link>
		// 		),
		// 	});
		// });
		orders.forEach(order => {
			data.rows.push({
				id: order._id,
				// numofItems: order && order.callCardItems.length,
				amount: `${order.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
				status: order.orderStatus && String(order.orderStatus).includes('Delivered')
					? <p style={{ color: 'green' }}>{order.orderStatus}</p>
					: <p style={{ color: 'red' }}>{order.orderStatus}</p>,
				actions: 
				<Fragment>
					<Link to={`/order/auth/${order._id}`} className="btn btn-primary py-1 px-2">
						<i className="fa fa-eye"></i>
					</Link>
					<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
						<i className="fa fa-trash"></i>
					</button>
				</Fragment>
			})
		})

		return data;
	};

	return (
		<Fragment>
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<Fragment>
						<h1 className="my-5">All Orders</h1>

						{loading ? <Loader /> : (
							<MDBDataTable
								data={setOrders()}
								className="px-3"
								bordered
								striped
								hover
							/>
						)}

					</Fragment>
				</div>
			</div>

		</Fragment>
	)
}

export default OrdersList;

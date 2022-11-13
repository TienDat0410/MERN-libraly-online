import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../redux/actions/books/bookActions';
import { fetchAuthors } from '../../redux/actions/author/authorActions';
import { allOrders } from '../../redux/actions/order/orderAction';
import { allUsers } from '../../redux/actions/users/userAction';

const Dashboard = () => {

	const dispatch = useDispatch();

	const { userInfo, loading } = useSelector(state => state.userLogin);
	// const { users } = useSelector(state => state.userProfile);
	const { books } = useSelector((state) => state.booksList);
	const { authors } = useSelector((state) => state.authorsList);
	const { totalAmount, orders } = useSelector((state) => state.allOrders);
	const { users } = useSelector(state => state.allUsers)

	let outOfStock = 0;
	if (Array.isArray(books)) {
		books.forEach(book => {
			if (book.stock === 0) {
				outOfStock += 1;
			}
		})
	};

	useEffect(() => {
		dispatch(fetchBooks());
		dispatch(fetchAuthors());
		dispatch(allOrders());
		dispatch(allUsers());

	}, [dispatch])

	return (
		<Fragment>
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<h1 className="my-4">Dashboard</h1>

					{loading ? <Loader /> : (
						<Fragment>

							<div className="row pr-4">
								<div className="col-xl-12 col-sm-12 mb-3">
									<div className="card text-white bg-primary o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">Total Amount<br /><b>{totalAmount && totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row pr-4">
								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-success o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">Books<br /> <b>{books && books.length}</b></div>
										</div>
										<Link className="card-footer text-white clearfix small z-1" to="/admin/listbook">
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>


								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-danger o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">Authors<br /> <b>{authors && authors.length}</b></div>
										</div>
										<Link className="card-footer text-white clearfix small z-1" to="/listAuthor">
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>


								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-info o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
										</div>
										<Link className="card-footer text-white clearfix small z-1" to="/admin/users">
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>


								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-warning o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}

				</div>
			</div>

		</Fragment >
	)
}

export default Dashboard

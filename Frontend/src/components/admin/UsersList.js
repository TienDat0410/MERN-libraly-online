import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/users/userAction'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { clearErrors } from '../../redux/actions/books/bookActions'


const UsersList = () => {

	const history = useNavigate();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector(state => state.allUsers);
	// const { isDeleted } = useSelector(state => state.user)

	useEffect(() => {
		dispatch(allUsers());

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		// if (isDeleted) {
		// 	alert.success('User deleted successfully');
		// 	history('/admin/users');
		// 	dispatch({ type: DELETE_USER_RESET })
		// }

	}, [dispatch, alert, error, history])

	// const deleteUserHandler = (id) => {
	// 	dispatch(deleteUser(id))
	// }

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: 'User ID',
					field: 'id',
					sort: 'asc'
				},
				{
					label: 'Name',
					field: 'username',
					sort: 'asc'
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc'
				},
				{
					label: 'permission',
					field: 'permission',
					sort: 'asc'
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: []
		}

		users.forEach(user => {
			data.rows.push({
				id: user._id,
				username: user.username,
				email: user.email,
				permission: user.permission,

				actions: <Fragment>
					<Link to={`/admin/updateUser/${user._id}`} className="btn btn-primary py-1 px-2">
						<i className="fa fa-pencil">Update</i>
					</Link>
					<button className="btn btn-danger py-1 px-2 ml-2" >
						<i className="fa fa-trash"></i>
					</button>
				</Fragment>
			})
		})

		return data;
	}


	return (
		<Fragment>
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<Fragment>
						<h1 className="my-5">All Users</h1>

						{loading ? <Loader /> : (
							<MDBDataTable
								data={setUsers()}
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

export default UsersList;

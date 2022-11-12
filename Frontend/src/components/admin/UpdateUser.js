import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { USER_ADMIN_UPDATE_RESET } from '../../redux/actions/actionsTypes'
import { clearErrors } from '../../redux/actions/books/bookActions'
import { getUserDetails, updateUserAdmin } from '../../redux/actions/users/userAction'
import Sidebar from './Sidebar'

const UpdateUserAdmin = () => {


	const [username, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [permission, setPermission] = useState('')

	const history = useNavigate();
	const dispatch = useDispatch();

	const { error, isUpdated } = useSelector(state => state.userUpdateAndDlt);
	const { user } = useSelector((state) => state.userDetails)

	const {id} = useParams();

	useEffect(() => {

		console.log(user && user._id !== id);
		if (user && user._id !== id) {
			dispatch(getUserDetails(id))
		} else {
			setUserName(user.username);
			setEmail(user.email);
			setPermission(user.permission);
		}

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert('User updated successfully')
			history('/admin/users')

			dispatch({
				type: USER_ADMIN_UPDATE_RESET
			})
		}

	}, [dispatch, alert, error, history, isUpdated, id, user])

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('username', username);
		formData.set('email', email);
		formData.set('permission', permission);

		dispatch(updateUserAdmin(user._id, formData))
	}


	return (
		<Fragment>	
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg" onSubmit={submitHandler}>
								<h1 className="mt-2 mb-5">Update User</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="name"
										id="name_field"
										className="form-control"
										name='name'
										value={username}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="email"
										id="email_field"
										className="form-control"
										name='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="role_field">Permission</label>

									<select
										id="role_field"
										className="form-control"
										name='role'
										value={permission}
										onChange={(e) => setPermission(e.target.value)}
									>
										<option value="user">user</option>
										<option value="admin">admin</option>
									</select>
								</div>

								<button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
							</form>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	)
}

export default UpdateUserAdmin;

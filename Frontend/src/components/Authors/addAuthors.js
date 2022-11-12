import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { NEW_AUTHOR_RESET } from "../../redux/actions/actionsTypes";
import { AddAuthors } from "../../redux/actions/author/authorActions";
import { clearErrors } from "../../redux/actions/books/bookActions";


const NewAuthor = () => {
    const history = useNavigate();

	const [name, setName] = useState("");
	const [year, setyear] = useState("");
	 
	const dispatch = useDispatch();

	const { error, loading, success } = useSelector((state) => state.authorcreated);

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (success) {
			history("/author");
			alert("Author created successfully");
			dispatch({ type: NEW_AUTHOR_RESET});
		}
	}, [dispatch, alert, error, success, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set("name", name);
		formData.set("year", year);
		dispatch(AddAuthors(formData));
	};

	return (
		<Fragment>
			{loading ? (
				<>
					<Loader />
				</>
			) : (
				<>
					<div className="row mt-5">
						<div className="col-12 col-md-2 mt-4">
							<Sidebar />
						</div>

						<div className="col-12 col-md-10 mt-5">
							<Fragment>
								<div className="wrapper my-5">
									<form
										className="shadow-lg"
										onSubmit={submitHandler}
										encType="multipart/form-data"
									>
										<h1 className="mb-4">New Author</h1>

										<div className="form-group">
											<label htmlFor="name_field">Name</label>
											<input
												type="text"
												id="name_field"
												className="form-control"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
                                        <div className="form-group">
											<label htmlFor="year_field">Year</label>
											<input
												type="date"
												id="year_field"
												className="form-control"
												value={year}
												onChange={(e) => setyear(e.target.value)}
											/>
										</div>
										
										<button
											id="login_button"
											type="submit"
											className="btn btn-block py-3"
											disabled={loading ? true : false}
										>
											CREATE
										</button>
									</form>
								</div>
							</Fragment>
						</div>
					</div>
				</>
			)}
		</Fragment>
	);
};

export default NewAuthor;

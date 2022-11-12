import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../admin/Sidebar";
import Loader from "../layout/Loader";
import { dltAuthor, fetchAuthors } from "../../redux/actions/author/authorActions";
import { DELETE_AUTHOR_RESET } from "../../redux/actions/actionsTypes";
import { clearErrors } from "../../redux/actions/books/bookActions";
import Moment from 'moment';


const ListAuthors = () => {
	const history = useNavigate();
	const dispatch = useDispatch();

    const authorsList = useSelector(state => state.authorsList);
    const { authors, loading, error } = authorsList;
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.dltAuthor
	);

	useEffect(() => {
		dispatch(fetchAuthors());

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert("Author deleted successfully");
			history("/listAuthor");
			dispatch({ type: DELETE_AUTHOR_RESET });
		}
	}, [dispatch, alert, error, deleteError, isDeleted, history]);

	const setAuthors = () => {
		const data = {
			columns: [
				{
					label: "ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
                {
					label: "Year",
					field: "year",
					sort: "asc",
				},
				{
					label: "Action",
					field: "actions",
				},
			],
			rows: [],
		};

		authors.forEach((author) => {
			data.rows.push({
				id: author._id,
				name: author.name,
				year: Moment(author.year).calendar(),

				actions: (
					<Fragment>
						<button
							className="btn btn-danger py-1 px-2 ml-2"
							onClick={() => deleteCategoryHandler(author._id)}
						>
							<i className="fa fa-trash"></i>
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	const deleteCategoryHandler = (id) => {
		dispatch(dltAuthor(id));
	};

	return (
		<Fragment>
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<Fragment>
						<h1 className="my-5">All Authors</h1>

						{loading ? (
							<Loader />
						) : (
							<MDBDataTable
								data={setAuthors()}
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
	);
};

export default ListAuthors;

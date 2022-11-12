import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/loading';
import { useNavigate } from "react-router-dom";
import Moment from 'moment';
import Sidebar from '../admin/Sidebar';

import { MDBDataTable } from 'mdbreact'

const ListBooks = () => {
    //Fetch books
    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);
    const bookslist = useSelector(state => state.booksList);
    const { books, loading } = bookslist;
    // End of fetch books
    //Delete book handler
    const handlerDeleteBook = id => {
        dispatch(deleteBook(id));
        alert('Delete Success');
        history('/getallbook');
    };
    //
    const setBooks = () => {
		const data = {
			columns: [
				{
					label: 'Book ID',
					field: 'id',
					sort: 'asc'
				},
				{
					label: 'Book Name',
					field: 'book_name',
					sort: 'asc'
				},
				{
					label: 'publishedDate',
					field: 'publishedDate',
					sort: 'asc'
				},
				{
					label: 'genres',
					field: 'genres',
					sort: 'asc'
				},
                {
					label: 'unitPrice',
					field: 'unitPrice',
					sort: 'asc'
				},
                {
					label: 'stock',
					field: 'stock',
					sort: 'asc'
				},
				{
					label: 'Actions',
					field: 'actions',
				},               
			],
			rows: []
		}
        if(Array.isArray(books)){
		books.forEach(book => {
			data.rows.push({
				id: book._id,
				book_name: book.book_name,
				publishedDate: Moment(book.publishedDate).calendar(),
				genres: book.genres,
				unitPrice: book.unitPrice,			
                stock: book.stock,
				actions: <Fragment>
					<Link to={`/bookupdate/${book && book._id}`} className="btn btn-primary py-1 px-2">
						<i className="fa fa-pencil">Update</i>
					</Link>
					<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => handlerDeleteBook(book._id)}>
						<i className="fa fa-trash"></i>
					</button>
				</Fragment>
			})
		})
    }

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
                    <h1 className="my-5">All Books</h1>

                    {loading ? <Loading /> : (
                        <MDBDataTable
                            data={setBooks()}
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

export default ListBooks;
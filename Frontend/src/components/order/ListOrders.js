import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../layout/Loader";
import { allOrders, clearErrors, myOrders } from '../../redux/actions/order/orderAction';
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";



const ListOrders = () => {
    const { id } = useParams();
    const history = useNavigate();

    //Get the book details and fill it in the form
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    // const { loading, error, orders } = useSelector((state) => state.allOrders);


    const dispatch = useDispatch();
    //

    useEffect(() => {
        dispatch(myOrders());
        // dispatch(allOrders());


        if (error) {
            alert(error);
            // dispatch(clearErrors());
        };
    }, [dispatch, alert, error]);



    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Num of Items",
                    field: "numOfItems",
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

        orders.forEach((order) => {
            data.rows.push({
                id: order._id,
                numOfItems: order.callCardItems.length,
                amount: `${order.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
                
                status:
                    order.orderStatus &&
                        String(order.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "green" }}>{order.orderStatus}</p>
                    ) : (
                        <p style={{ color: "red" }}>{order.orderStatus}</p>
                    ),
                actions: (
                    <Link to={`/order/auth/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
                ),
            });
        });

        return data;
    };

    return (
        <div className="container">

            <h1 className="my-5 text-center">
                <b>My Orders</b>
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3 "
                    bordered
                    striped
                    hover
                />
            )}
        </div>
    );
};

export default ListOrders;
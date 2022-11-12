import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'
import { Link, useNavigate } from "react-router-dom";

import CheckoutSteps from './CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { saveLoanInfo } from '../../redux/actions/callcard/callCardAction'
import { clearErrors } from '../../redux/actions/order/orderAction';


const Shipping = () => {
    const history = useNavigate();
    const countriesList = Object.values(countries)

    const { loanInfo, callCardItems } = useSelector(state => state.cart)

    const [address, setAddress] = useState(loanInfo.address)
    const [city, setCity] = useState(loanInfo.city)
    const [phoneNo, setPhoneNo] = useState(loanInfo.phoneNo)
    const [country, setCountry] = useState(loanInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        //save LoanInfo
        dispatch(saveLoanInfo({ address, city, phoneNo, country }));
        //
        history('/confirm');
    }

    return (
        <Fragment>

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >

                                {countriesList.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping

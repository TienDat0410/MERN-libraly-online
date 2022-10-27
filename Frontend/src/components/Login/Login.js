import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../redux/actions/users/userAction';
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from '../Message/ErrorMessage';


const LoginUser = () => {

    // const [username, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    //dispatch
    const dispatch = useDispatch();
    const history = useNavigate();

    //lấy dữ liệu người dùng từ store
    const state = useSelector(state => {
        return state.userLogin;
    });

    const { loading, userInfo, error } = state;

    //submit
    const formSubmitHandler = e => {
        e.preventDefault();
        console.log(email, password);
        dispatch(loginUserAction(email, password));
        // console.log(userInfo.token)
        // console.log(userInfo, loading, error);
        // if (userInfo !== null && error === undefined) history('/');
    };


    //Redirect
    useEffect(() => {
        if (userInfo) history('/');
    }, [state]);

    return (
        <div className='Container'>
        <div className='row container-height' style={{"marginTop": "200px"}}>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    {loading && <h1>Loading</h1>}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {/* {error && <h1>Something went wrong</h1>} */}
                    <h1 className='text-center'>Log In</h1>

                    <form onSubmit={formSubmitHandler}>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Email address</label>
                                <input
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                    type='email'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputPassword1'>Password</label>
                                <input
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    type='password'
                                    className='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='Password'
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Log In
                            </button>
                            <div className='form-group'>
                                <Link to="/register">Do not have an account?</Link> 
                                
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        </div>

    );
};

export default LoginUser;
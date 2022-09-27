import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { Link, useHistory, useParams } from 'react-router-dom';
// import API from "../../api/API";
// const LOGIN_URL = '/user/login';
import axios from 'axios';
const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    // const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [password, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(JSON.stringify(response.data));
            //console.log(JSON.stringify(response));
            const accessToken = response.data.token;
            const roles = response.data.roles;
            console.log(accessToken);
            setAuth({ email, password, roles, accessToken });
            // setUser('');
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    }


    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link className='nav-link' to='/'>
                            Home
                        </Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className='row container-height'>
                        <div className='col-lg-6 col-md-6 m-auto'>
                            <div className='container'>
                                <h1 className='text-center'>Login</h1>
                                <form onSubmit={handleSubmit}>
                                    {/* <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1' className="form-label mt-4">Username</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="exampleInputEmail1"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={username}
                                            aria-describedby="emailHelp"
                                            placeholder='Enter Name'
                                        />
                                    </div> */}
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputEmail1' className="form-label mt-4">Email</label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="exampleInputEmail1"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            aria-describedby="emailHelp"
                                            placeholder='Enter Email'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='exampleInputexampleInputPassword1Email1' className="form-label mt-4">Email</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="exampleInputPassword1"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={password}
                                            aria-describedby="emailHelp"
                                            placeholder='password'
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                </form>
                                <p>
                                    You Need A Account<br />
                                    <span className="line">
                                        {/*put router link here*/}
                                        <a href="/Register">Register</a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login
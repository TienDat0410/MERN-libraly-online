import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
// import API from "../../api/API";
// const LOGIN_URL = '/user/login';
import axios from 'axios';
const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login',
                JSON.stringify({ username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            console.log(JSON.stringify(response.data));
            //console.log(JSON.stringify(response));
            const accessToken = response.data.accessToken;
            const roles = response.data.roles;
            setAuth({ username, email, password, roles, accessToken });
            setUser('');
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
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <label htmlFor="email">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />

                        <button >Log In</button>
                    </form>
                    <p>
                        You Need A Account<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/Register">Register</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login
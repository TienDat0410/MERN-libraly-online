import React, { Fragment } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const {userInfo, loading } = useSelector(state => state.userLogin)
    const history = useNavigate();

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (userInfo && userInfo.permission !== 'user') {
                            return history('/login');
                        }

                        if (userInfo && userInfo.permission !== 'admin') {
                            return history('/');
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute

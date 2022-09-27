import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import API, { endpoints } from "../../API";
import axios from 'axios';

class Register extends React.Component {
    constructor() {
        super()
        this.user = {
            'username': '',
            'email': '',
            'password': '',
            'confirmpassword': '',
            'permission': ''
        }
        this.state = {
            'user': this.user
        }
    }
    change = (field, event) => {
        this.user[field] = event.target.value
        this.setState({
            'user': this.user
        })
    }
    register = (event) => {
        if (this.state.user.password === this.state.user.confirmpassword) {
            const formData = new FormData()
            for (let k in this.state.user)
                if (k !== 'confirmpassword')
                    formData.append(k, this.state.user[k])

            axios.post('/user/register', JSON.stringify(formData), {
                header: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }).then((res) => {
                console.info(res)
            }).catch(err => console.error(err))
        }
        event.preventDefault();
    }
    render() {
        return (
            <>
                <h1>Register</h1>
                <Form onSubmit={this.register}>
                    <RegisterForm id="username" label="UserName" type="text" field={this.state.user.username} change={this.change.bind(this, 'username')} />
                    <RegisterForm id="email" label="Email" type="email" field={this.state.user.email} change={this.change.bind(this, 'email')} />
                    <RegisterForm id="password" label="Password" type="password" field={this.state.user.password} change={this.change.bind(this, 'password')} />
                    <RegisterForm id="confirmpassword" label="Confirm Password" type="password" field={this.state.user.confirmpassword} change={this.change.bind(this, 'confirmpassword')} />
                    <RegisterForm id="permission" label="Permission" type="text" field={this.state.user.permission} change={this.change.bind(this, 'permission')} />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        );
    }

}

class RegisterForm extends React.Component {
    render() {
        return (
            <Form.Group className="mb-3" controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field}
                    onChange={this.props.change} />
            </Form.Group>
        );
    }
}
export default Register
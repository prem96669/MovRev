import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {getUserToken} from "../UserFunctions/LoginRegister";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount () {
        const token = getUserToken('usertoken');
        if(!token){
            this.props.history.push("/login");
        }
        else {
            this.setState({
                first_name: token.identity.first_name,
                last_name: token.identity.last_name,
                email: token.identity.email
            })
        }
    }

    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Welcome {this.state.first_name} {this.state.last_name}</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
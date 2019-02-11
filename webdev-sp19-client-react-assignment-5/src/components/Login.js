import React from 'react'
import {Link} from "react-router-dom";
import UserService from '../services/UserService'


class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            username:"",
            password:""
        }
    }
    usernameTitleChanged = (event) => {
        this.setState(
            {
                username:  event.target.value
            });
    };
    passwordTitleChanged = (event) => {
        this.setState(
            {
                password:  event.target.value
            });
    };
    userService=new UserService(this.props);
    render() {
        return (
            <div className="container-fluid">
                <h1>Sign In</h1>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username"
                               className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   placeholder="alice"
                                   id="username"
                            onChange={this.usernameTitleChanged}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password"
                               className="col-sm-2">
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   type="password"
                                   placeholder="!@#$QWERzxc"
                                   id="password"
                            onChange={this.passwordTitleChanged}/>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <button type="button"
                                className="btn btn-primary btn-block"
                                onClick={()=>this.userService.login({
                                    id:0,
                                    username:this.state.username,
                                    password:this.state.password,
                                    firstName:"",
                                    lastName:"",
                                    phoneNumber:0,
                                    role:"Faculty"
                                })}>
                            Sign in
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-lg-2 col-sm-2 hidden-xs"></div>
                    <div className="col-md-5 col-lg-5 col-sm-5 col-6">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className="col-md-5 col-lg-5 col-sm-5 col-6">
                        <Link to={`/register`}><a className="float-right">Sign up</a></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login
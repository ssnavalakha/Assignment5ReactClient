import React from 'react'
import UserService from "../services/UserService";
import Link from "react-router-dom/Link";

class Register extends React.Component{
constructor(props)
{
    super(props);
    this.state={
        username:"",
        password:"",
        verifyPassword:"",
        firstName:"",
        lastName:"",
        phoneNumber:0
    }
}
    usernameTitleChanged = (event) => {
        this.setState(
            {
                username:  event.target.value
            });
    };
    phoneTitleChanged = (event) => {
        this.setState(
            {
                phoneNumber:  event.target.value
            });
    };
    firstNameTitleChanged = (event) => {
        this.setState(
            {
                firstName:  event.target.value
            });
    };
    lastNameTitleChanged = (event) => {
        this.setState(
            {
                lastName:  event.target.value
            });
    };
    passwordTitleChanged = (event) => {
        this.setState(
            {
                password:  event.target.value
            });
    };
    verifypasswordTitleChanged = (event) => {
        this.setState(
            {
                verifyPassword:  event.target.value
            });
    };
    userService=new UserService(this.props);
render(){
    return (
        <div className="container-fluid">
            <h1>Sign Up</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="username-signup"
                           className="col-sm-2">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               placeholder="alice"
                               id="username-signup"
                        onChange={this.usernameTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password-signup"
                           className="col-sm-2">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               type="password"
                               placeholder="!@#$QWERzxc"
                               id="password-signup"
                        onChange={this.passwordTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="verify-password"
                           className="col-sm-2">
                        Verify Password
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               type="password"
                               placeholder="!@#$QWERzxc"
                               id=""
                        onChange={this.verifypasswordTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="phone"
                           className="col-sm-2">
                        Phone number
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               placeholder="999"
                               id="phone"
                               onChange={this.phoneTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="first-name"
                           className="col-sm-2">
                        First Name
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               placeholder="Alice"
                               id="lfirst-name"
                               onChange={this.firstNameTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="last-name"
                           className="col-sm-2">
                        Last Name
                    </label>
                    <div className="col-sm-10">
                        <input className="form-control"
                               id="last-name"
                               placeholder="Wonderland"
                               onChange={this.lastNameTitleChanged}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <button type="button"
                                className="btn btn-primary btn-block"
                                onClick={()=>this.userService.register({
                                    id:(new Date()).getTime(),
                                    username:this.state.username,
                                    password:this.state.password,
                                    firstName:this.state.firstName,
                                    lastName:this.state.lastName,
                                    phoneNumber:this.state.phoneNumber,
                                    role:"Faculty"
                                })}>
                            Sign up
                        </button>
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="col-md-2 col-lg-2 col-sm-2 hidden-xs"></div>
                <div className="col-md-5 col-lg-5 col-sm-5 col-6">
                    <a href="#" onClick={()=>this.userService.register({
                        id:(new Date()).getTime(),
                        username:this.state.username,
                        password:this.state.password,
                        firstName:this.state.firstName,
                        lastName:this.state.lastName,
                        phoneNumber:this.state.phoneNumber,
                        role:"Faculty"
                    })}>Login</a>
                </div>
                <div className="col-md-5 col-lg-5 col-sm-5 col-6">
                    <Link to="/"className="float-right">Cancel</Link>
                </div>
            </div>
        </div>
    );
}};

export default Register
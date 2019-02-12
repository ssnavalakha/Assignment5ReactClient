import React from 'react'
import UserService from "../services/UserService";

class Profile extends React.Component{
    constructor(props)
    {
        super(props);
        this.userService=new UserService(props);
        this.state={
            user:"",
            username:"",
            firstName:"",
            lastName:"",
            phoneNumber:"",
            displayBlock:false,

        }
        this.userService.profile()
            .then(user1=>{
                this.setState({
                    user:user1,
                    username:user1.username,
                    firstName:user1.firstName,
                    lastName:user1.lastName,
                    phoneNumber:user1.phoneNumber,
                })
            });

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
    render() {
        return (
            <div className="container-fluid">
                <h1>Profile</h1>
                <div id="success-alert" className="alert alert-success" style={this.state.displayBlock?
                    {"display": "block"}:{"display": "none"}}>
                    Profile successfully saved.
                </div>
                <form>
                    <div className="form-group row">
                        <label htmlFor="username-profile"
                               className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   placeholder="alice"
                                   id="username-profile"
                                   value={this.state.user.username}
                                   onChange={this.usernameTitleChanged}
                                   disabled>

                            </input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="phone-profile"
                               className="col-sm-2">
                            Phone
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   type="tel"
                                   placeholder="1-(555)-555-5555"
                                   value={this.state.phoneNumber}
                                   onChange={this.phoneTitleChanged}
                                   id="phone-profile">

                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="first-name-profile"
                               className="col-sm-2">
                            First Name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="first-name-profile"
                                   onChange={this.firstNameTitleChanged}
                                    value={this.state.firstName}>

                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="last-name-profile"
                               className="col-sm-2">
                            Last Name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="last-name-profile"
                                   onChange={this.lastNameTitleChanged}
                                    value={this.state.lastName}>

                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="button"
                                    className="btn btn-success btn-block"
                                    onClick={()=>{
                                        this.setState({
                                            displayBlock:true
                                        },()=>{
                                            this.userService.updateUser({
                                                id:this.state.user.id,
                                                username:this.state.username,
                                                password:this.state.password,
                                                firstName:this.state.firstName,
                                                lastName:this.state.lastName,
                                                phoneNumber:this.state.phoneNumber,
                                                role:"Faculty"
                                            })
                                        })
                                    }}>
                                Update
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={this.userService.logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default Profile
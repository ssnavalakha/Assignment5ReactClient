import React from "react";
import Redirect from "react-router-dom/Redirect";

class UserService{
    constructor(props)
    {
        this.props=props;
        this.USER_API_URL ='http://localhost:8080/';
    }
    redirectToCourses(id) {
        return this.props.history.push(`/table/${id}`)
    }
    redirectToLogin() {
        return this.props.history.push("/")
    }

    updateUser = user =>
        fetch(this.USER_API_URL+"api/updateUser/"+user.id, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' },
            method: 'PUT'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {});

    register = user =>
        fetch(this.USER_API_URL+"api/register", {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' },
            method: 'POST'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(user=>{
                if(user.id!=undefined){
                    this.redirectToCourses(user.id)
                }
            });

     profile = () =>
        fetch(this.USER_API_URL+"api/profile", {
            method: 'POST',
        }).then(response =>
            response.json());

    login = user =>
        fetch(this.USER_API_URL+"api/login", {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json' },
            method: 'POST'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(user=>{
            if(user.id!=undefined){
                this.redirectToCourses(user.id)
            }
        });

     logout = () =>
        fetch(this.USER_API_URL+"api/logout", {
            method: 'POST'
        }).then((res) => res.text())
            .then((text) => text.length ? JSON.parse(text) : {})
            .then(()=>this.redirectToLogin())

    findAllUsers = () =>
        fetch(this.USER_API_URL+"api/users")
            .then(response =>
                response.json());

    findUserById = (id) =>
        fetch(this.USER_API_URL+"api/users"+"/"+id)
            .then(response =>
                response.json());
}

export default UserService
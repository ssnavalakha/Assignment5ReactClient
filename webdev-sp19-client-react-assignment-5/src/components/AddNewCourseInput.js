import React from 'react'
import './add-new-course-input.style.client.css';
import 'font-awesome/css/font-awesome.min.css';
import Link from "react-router-dom/Link";

const AddNewCourseInput = ({createcourse,titleChanged,logout}) =>
    <form>
        <div className="form-group row top-buffer top-bar">
            <h3 className="col-md-2 col-lg-2 col-sm-2 hidden-xs">Course Manager</h3>
            <input className="form-control col-md-7 col-lg-7 col-sm-7 col-9 top-margin my-1"
                   placeholder="New Course Title"
                   id="new-course-name"
                   onChange={titleChanged}/>
            <i onClick={createcourse}
               className="fa fa-plus-circle col-1 fa-2x top-margin"/>
            <Link to="/profile"><i className="fa fa-user-circle col-1 fa-2x top-margin"/></Link>
            <a className="top-margin col-1" onClick={logout}>Log out</a>
        </div>
    </form>

export default AddNewCourseInput;
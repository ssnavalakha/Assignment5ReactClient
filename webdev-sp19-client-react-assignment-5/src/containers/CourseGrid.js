import React from 'react'
import CourseCard from '../components/CourseCard'
import NewCourseCard from "../components/NewCourseCard";
import AddNewCourseInput from "../components/AddNewCourseInput";
import '../components/course-grid.style.client.css'
import 'font-awesome/css/font-awesome.min.css';
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

class CourseGrid extends React.Component {
    constructor(props)
    {
        super(props)
    }
    userService=new UserService(this.props);
    render(){
        return (
        <div>
            <i onClick={this.props.createCourse}
               className="fa fa-plus-circle fa-3x bottom-button"/>
            <AddNewCourseInput
                createcourse={this.props.createCourse}
                titleChanged={this.props.titleChanged}
                logout={this.userService.logout}/>
            <div className="row">
                <div className="col-md-1 col-lg-1 col-sm-1 hidden-xs"/>
                <table className="table col-md-10 col-lg-10 col-sm-10 col-12 table-hover">
                    <thead className="thead-light">
                    <th><h6>Recent Documents</h6></th>
                    <th>
                        <div className="row">
                            <h6>Owned by me</h6>
                            <i className="fa fa-angle-down"/>
                        </div>
                    </th>
                    <th>
                        <Link to={`/table`}><i className="text-dark fa fa-list-ul"/></Link>
                    </th>
                    </thead>
                </table>
                <div className="col-md-1 col-lg-1 col-sm-1 hidden-xs"/>
            </div>
            <div className="row">
                <div className="col-1"/>
                <div className="card-deck col-10">
                    {
                        this.props.courses.map((course, index) =>
                            <CourseCard
                                deleteCourse={this.props.deleteCourse}
                                course={course}
                                key={course.id}
                                index={index}/>)

                    }
                </div>
                <div className="col-1"/>
            </div>
        </div>
        );
        };
    }
export default CourseGrid
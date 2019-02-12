import React from 'react'
import '../components/course-list.client.style.css';
import 'font-awesome/css/font-awesome.min.css';
import AddNewCourseInput from "../components/AddNewCourseInput";
import CourseRow from "../components/CourseRow";
import {Link} from "react-router-dom";
import UserService from "../services/UserService";

class CourseTable extends React.Component{
    constructor(props)
    {
        super(props)
        this.facultyId = parseInt(props.match.params.id);
        this.props.getcourses();
    }
    userService=new UserService(this.props);
    render(){
        return(
            <div>
                <i onClick={this.props.addCourseUsingName}
                   className="fa fa-plus-circle fa-3x bottom-button"/>
                <AddNewCourseInput
                    createcourse={this.props.addCourseUsingName}
                    titleChanged={this.props.titleChanged}
                    logout={this.userService.logout}
                />
                <div className="row">
                    <div className="col-md-1 col-lg-1 col-sm-1 hidden-xs"/>
                    <table className="table col-md-10 col-lg-10 col-sm-10 col-12 table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Owned by</th>
                            <th>Last modified</th>
                            <th>&nbsp; <Link to={"/coursegrid/"+this.facultyId}><i className="text-dark float-right fa fa-th"/></Link></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.courses.map((course) => {
                                return (
                                    <CourseRow
                                        c={course}
                                        deleteCourse={this.props.deleteCourse}/>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div className="col-md-1 col-lg-1 col-sm-1 hidden-xs"/>
                </div>
            </div>
        )
    }
    }
export default CourseTable
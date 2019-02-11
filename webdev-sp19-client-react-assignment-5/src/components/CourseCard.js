import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course, deleteCourse,index}) => {
    var arrays=[];

    arrays.push(
        <div className="mx-2 my-3">
        <div className="card"
                     styles={{width: '18rem'}}>
        <img className="card-img-top"
             src="https://picsum.photos/150/175"/>
        <div className="card-body">
            <h5 className="card-title">
                <Link className="text-dark"to={`/course/${course.id}`}>{course.title}</Link>
            </h5>
            <Link to={`/course/${course.id}`}><i className="text-dark fa fa-edit"/></Link>
            <a onClick={() => deleteCourse(course)}
               className="float-right">&times;
            </a>
        </div>
        </div>
        </div>);

    return arrays;
};
export default CourseCard;
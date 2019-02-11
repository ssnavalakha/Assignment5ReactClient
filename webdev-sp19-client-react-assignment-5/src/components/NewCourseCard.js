import React, {Component} from 'react'

const NewCourseCard = ({course, createCourse}) =>
  <div className="card"
       styles={{width: '18rem'}}>
    <img className="card-img-top"
         src="https://picsum.photos/300/200"/>
    <div className="card-body">
      <h5 className="card-title">New Course</h5>
      <p className="card-text">Card text</p>
      <a onClick={createCourse}
         className="btn btn-success">Add Course</a>
    </div></div>
export default NewCourseCard;
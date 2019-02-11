import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CourseGrid from '../containers/CourseGrid'
import CourseTable from '../containers/CourseTable'
import CourseService from '../services/CourseService'
import CourseEditor from "../containers/CourseEditor";
import 'font-awesome/css/font-awesome.min.css';
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

class WhiteBoard extends Component {
  constructor() {
    super();
    this.courseService = new CourseService();
    this.state = {
      courses: this.courseService.findAllCourses(),
      newcoursename: {title: ''}
    }
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse=this.createCourse.bind(this);
  }
  deleteCourse = course =>
    this.setState({
      courses: this.courseService.deleteCourse(course)
    });
  addCourse = (course) =>
    this.setState({
      courses: this.courseService.addCourse(course)
    });
  createCourse = () =>
  {
    var name=this.state.newcoursename.title;
    if(name.trim()===""||name.length===0)
    {
      name="New Course";
    }
    this.addCourseUsingName(name)
  };
  addCourseUsingName = (name) =>
  {
    var course = {
        id: (new Date()).getTime(),
        title: name
      };
      this.addCourse(course);
  };
  titleChanged = event => {
    this.setState(
        {
          newcoursename: {title: event.target.value}
        });
  };
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path='/' exact
                   render={props =>
                       <Login {... props}/>}/>
            <Route path='/profile' exact
                   render={(props) =>
                       <Profile {... props}/>}/>
            <Route path='/register' exact
                   render={props =>
                       <Register {... props}/>}/>
            <Route path='/coursegrid/:id' exact
                   render={(props) =>
                     <CourseGrid
                         deleteCourse={this.deleteCourse}
                         courses={this.state.courses}
                         titleChanged={this.titleChanged}
                         createCourse={this.createCourse}
                         {...props}/>}/>
            <Route path="/course/:id"
                   exact
                   component={CourseEditor}/>
            <Route path='/table/:id'
                   render={(props) => <CourseTable
                       courses={this.state.courses}
                       deleteCourse={this.deleteCourse}
                       addCourseUsingName={this.createCourse}
                       titleChanged={this.titleChanged}
                       {...props}/>}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default WhiteBoard;
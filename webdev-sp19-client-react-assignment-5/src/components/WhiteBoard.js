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
      courses:[],
      newcoursename: {title: ''}
    }
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse=this.createCourse.bind(this);
  }
  getcourses = ()=>{
    this.courseService.findAllCourses()
        .then(res=>{
          this.setState({
            courses:res
          })
        })
  };
  deleteCourse = course =>
    {
      this.courseService.deleteCourse(course).then(()=>
      {
        var currentCourses = this.state.courses;
        currentCourses=currentCourses.filter((val)=>{
          return val.id!==course.id
        });
        this.setState({
          courses:currentCourses
      })
      });
    };
  addCourse = (course) =>
  {   this.courseService.addCourse(course).then(crs=> {
      var currentCourses = this.state.courses;
      currentCourses.push(crs);
      this.setState({
        courses:currentCourses
      })
    })
  };
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
        title: name,
        modules:[]
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
                         getcourses={this.getcourses}
                         {...props}/>}/>
            <Route path="/course/:id"
                   exact
                   component={CourseEditor}/>
            <Route path='/table/:id'
                   render={(props) => <CourseTable
                       courses={this.state.courses}
                       getcourses={this.getcourses}
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
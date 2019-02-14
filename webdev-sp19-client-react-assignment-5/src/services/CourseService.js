class CourseService {
  constructor() {
    this.COURSE_API_URL ='http://localhost:8080/';
  }


  addCourse = course => {
    return fetch(this.COURSE_API_URL+"api/courses", {
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'POST'
    }).then((res) => res.json())

  };
  findCourseById = courseId =>
  {
    return fetch(this.COURSE_API_URL+"api/courses/"+courseId)
        .then(response =>
            response.json());

  };
  findAllCourses = () =>
    {
      return fetch(this.COURSE_API_URL+"api/courses",{
        credentials: 'include'
      }).then(response =>
              response.json());

    };
  deleteCourse = deleteCourse =>
    {
      return fetch(this.COURSE_API_URL+"api/courses/"+deleteCourse.id,{
        method:'DELETE'
      })
    };
}


export default CourseService
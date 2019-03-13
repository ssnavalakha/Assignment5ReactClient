import CourseService from "./CourseService";

class LessonService{
    constructor()
    {
        this.LESSON_API_URL='http://localhost:8080/';
    }
    createLesson(mid,lesson)
    {
        return fetch(this.LESSON_API_URL+"api/module/"+mid+"/lesson", {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'POST'
        }).then((res) => res.json())
    }

    findAllLessons(mid)
    {
        return fetch(this.LESSON_API_URL+"api/module/"+mid+"/lesson")
            .then(response =>
                response.json());
    }
    findLessonById(lid)
    {
        return fetch(this.LESSON_API_URL+"api/lesson/"+lid)
            .then(response =>
                response.json());
    }
    updateLesson(lid,module)
    {
        return fetch(this.LESSON_API_URL+"api/lesson/"+lid, {
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json' },
            method: 'PUT'
        }).then((res) => res.json());
    }
    deleteLesson(lid)
    {
        return fetch(this.LESSON_API_URL+"api/lesson/"+lid,{
            method:'DELETE'
        })
    }
}
export default LessonService
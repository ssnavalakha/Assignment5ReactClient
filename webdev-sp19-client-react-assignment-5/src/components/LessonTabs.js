import React from 'react'

const LessonTabs = ({lessons,lessonTitleChanged,deleteLesson,
                        createLesson,enableLesson,checkIfLessonDisabled
                        ,lessonNameTitleChanged,selectLesson,lessonsChecker}) => {
    if(!lessonsChecker())
    {
        return <div></div>
    }
    return <div className="row">
        <ul className="nav nav-tabs my-2">
            {
                lessons.map(lesson =>
                        <li onClick={() => selectLesson(lesson)} key={lesson.id} className="nav-item  mx-2">
                            <a className="nav-link text-white bg-dark"
                               href="#" role="button">
                                <input id={lesson.id}
                                       onChange={lessonNameTitleChanged}
                                       className=" border-0 bg-dark text-white"
                                       type="text" disabled={checkIfLessonDisabled(lesson.id)}
                                       placeholder={lesson.title}/>
                                <span className="float-right ml-3">
                                    <i onClick={() => enableLesson(lesson.id)}
                                       className="fa fa-xs fa-edit"/>
                                    <span onClick={() => deleteLesson(lesson)}>&times;</span>
                                </span>
                            </a>
                        </li>
                )}
            {
                <li>
                    <input
                        onChange={lessonTitleChanged}
                        className="form-inline border bg-dark border-light my-2 mx-2 text-white"
                    />
                </li>
            }
            {
                <li>
                    <i onClick={createLesson}
                       className="fa fa-plus-circle fa-2x"/>
                </li>
            }
        </ul>
    </div>;
}
export default LessonTabs
import React from 'react'
import { Link } from 'react-router-dom'

const CourseRow  = ({c,deleteCourse}) =>
    <tr>
        <td>
            <div>
            <i className="fa fa-file-alt"/>
            <Link className="text-dark" to={`/course/${c.id}`}>{c.title}</Link>
            </div>
        </td>
        <td className="d-none d-sm-block">me</td>
        <td>6:44 PM</td>
        <td>
            <Link to={`/course/${c.id}`}><i className="fa fa-edit text-dark"></i></Link>
            <a className="text-dark" onClick={() => deleteCourse(c)}>&times;</a>
        </td>
    </tr>

export default CourseRow ;
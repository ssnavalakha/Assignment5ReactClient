import React from 'react'
import './course-editor.style.client.css';

const ModuleListItem = ({module, selectModule,deleteModule,checkIfDisabled,enable,moduleNameTitleChanged}) =>
{
    return <button onClick={() => selectModule(module)}
            className="btn bg-dark nav-link text-white active mt-3"
            type="button">
        <span className="row">
        <input id={module.id}
               onChange={moduleNameTitleChanged}
               className="form-inline col-md-6
                border-0 bg-dark inline-block text-white px-1"
               type="text" disabled={checkIfDisabled(module.id)}
               placeholder={module.title}/>
        <span className="float-right mx-1">
            <i onClick={() => enable(module.id)} className="fa fa-xs fa-edit col-md-3"/>
            <span className="col-md-3" onClick={()=>deleteModule(module)}>&times;</span>
        </span>
        </span>
    </button>
}

export default ModuleListItem;
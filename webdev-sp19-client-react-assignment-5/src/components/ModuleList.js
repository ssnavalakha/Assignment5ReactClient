import React from 'react'
import ModuleListItem from "./ModuleListItem";
import './course-editor.style.client.css';

class ModuleList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
          <div>
            <ul className=" nav flex-column nav-pills">
              <li>
                <input
                    onChange={this.props.titleChanged}
                    className="form-control border bg-dark border-light my-2 text-white"
                    />
                <button
                    onClick={this.props.createModule}
                    className="btn btn-primary btn-block bg-dark
                    border border-dark">Add Module</button>
              </li>
            {

                this.props.modules.map(
                (module) => {
                  return (
                    <ModuleListItem
                      selectModule={this.props.selectModule}
                      key={module.id}
                      module={module}
                      deleteModule={this.props.deleteModule}
                      checkIfDisabled={this.props.checkIfDisabled}
                      enable={this.props.enable}
                      moduleNameTitleChanged={this.props.moduleNameTitleChanged}/>
                  )
                }
              )
            }
          </ul>
          <div>
            <i onClick={this.props.createModule}
    className="fa fa-plus fa-2x float-right my-3" style={{color: '#ffffff'}}/>
          </div>
        </div>
    )
  }
}
export default ModuleList;
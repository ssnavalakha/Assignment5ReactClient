import React from 'react'
import WidgetComponent from './WidgetComponent'


const WidgetList = ({widgets, addWidget, deleteWidget, updateWidget,preview,changePreview,saveWidgets}) =>

    <div>
        <h1>Widget List {widgets.length}</h1>
        <div className="row">
            <div className="col-9"/>
            <div className="row float-right col-3">
                <button type="button" onClick={saveWidgets} className="btn btn-success mx-2 my-2">Save</button>
                <div className="mx-2 my-2">Preview</div>
                <label className="switch">
                    <input onClick={(event) => {
                            changePreview()
                    }} type="checkbox"/>
                        <span className="slider round"></span>
                 </label>
            </div>
        </div>
        <div className="list-group">
            {
                widgets.map(widget =>
                    <WidgetComponent
                        key={widget.widget.id}
                        updateWidget={updateWidget}
                        deleteWidget={deleteWidget}
                        widget={widget.widget}
                        length={widgets.length}
                        preview={preview}/>
                )

            }
            <i onClick={addWidget}
               className="fa fa-plus-circle fa-3x bottom-button"/>
        </div>
    </div>;

export default WidgetList
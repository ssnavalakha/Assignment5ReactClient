import React from 'react'

const ImageWidget = ({widget,updateWidget,preview}) => {
    const class1=preview?"d-none":"";
    return(
    <div className="panel-body">
        <form className={`${class1}`}>
            <div className="mx-2 my-1">
                <input value={widget.src}
                       onChange={event => {
                           widget.src = event.target.value;
                           updateWidget(widget)
                       }}
                       className="form-control" type="url" placeholder="Image URL"
                       id="Image-name"/>
            </div>
            <div className="mx-2 my-1">
                <input className="form-control" disabled type="text" placeholder="Widget name"
                       id="widget-Image-name"/>
            </div>
        </form>
        <div className="mx-1 my-1"><h5>Preview</h5></div>
        <div className="mx-1 my-1"><img src={widget.src}/></div>
    </div>
    );
};
export default ImageWidget
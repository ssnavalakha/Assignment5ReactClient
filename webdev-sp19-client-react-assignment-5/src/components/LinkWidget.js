import React from 'react'

const LinkWidget = ({widget,updateWidget,preview}) => {
    const class1=preview?"d-none":"";
    return(
        <div className="panel-body">
            <form className={`${class1}`}>
                <div className="mx-2 my-1">
                    <input value={widget.href}
                           onChange={event => {
                               widget.href = event.target.value;
                               updateWidget(widget)
                           }}
                           className="form-control" type="url" placeholder="Link URL"
                           id="link-name"/>
                </div>
                <div className="mx-2 my-1">
                    <input value={widget.title}
                           onChange={event => {
                               widget.title = event.target.value;
                               updateWidget(widget)
                           }}
                           className="form-control" type="text" placeholder="Link text"
                           id="link-text-box"/>
                </div>
                <div className="mx-2 my-1">
                    <input className="form-control" disabled type="text" placeholder="Widget name"
                           id="widget-Image-name"/>
                </div>
            </form>
            <div className="mx-1 my-1"><h5>Preview</h5></div>
            <div className="mx-1 my-1"><a href={widget.href}>{widget.title}</a></div>
        </div>
    );
};
export default LinkWidget
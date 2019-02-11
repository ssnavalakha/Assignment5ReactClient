import React from 'react'

const ParagraphWidget = ({widget,updateWidget,preview}) => {
    const class1=preview?"d-none":"";
    return(
        <div className="panel-body">
            <form className={`${class1}`}>
                <div className="mx-2 my-1">
		    		<textarea
                              onChange={event => {
                                  widget.text = event.target.value;
                                  updateWidget(widget)
                              }}
                              className="form-control" placeholder="Paragraph text"
                            id="paragraph-text">{widget.text}</textarea>
                </div>
                <div className="mx-2 my-1">
                    <input className="form-control" disabled type="text" placeholder="Widget name"
                           id="widget-heading-name-paragraph"/>
                </div>
            </form>
            <div className="mx-1 my-1"><h5>Preview</h5></div>
            <div className="mx-1 my-1">
                <p className="mx-1 my-1"><h6>{widget.text}</h6></p>
            </div>
        </div>
    );
};
export default ParagraphWidget
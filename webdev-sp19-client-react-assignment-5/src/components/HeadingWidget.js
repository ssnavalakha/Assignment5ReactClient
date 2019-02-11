import React from 'react'

const HeadingWidget = ({widget, updateWidget,preview}) => {
    const class1=preview?"d-none":"";
    return (
            <div className="panel-body w-100">
                <form className={`${class1}`}>
                    <div className="mx-2 my-1">
                        <input  value={widget.text}
                                onChange={event => {
                                    widget.text = event.target.value;
                                    updateWidget(widget)
                                }}
                                className="form-control" type="text" placeholder="Heading Text"
                                id="heading-name"></input>
                    </div>
                    <div className="mx-2 my-1">
                        <select
                            onChange={event => {
                                widget.size = parseInt(event.target.value)
                                updateWidget(widget)
                            }}
                            className=" form-control">
                            <option value="1" selected={widget.size===1}>Heading 1</option>
                            <option value="2" selected={widget.size===2}>Heading 2</option>
                            <option value="3" selected={widget.size===3}>Heading 3</option>
                        </select>
                    </div>
                    <div className="mx-2 my-1">
                        <input className="form-control" disabled type="text" placeholder="Widget name"
                               id="widget-heading-name"/>
                    </div>
                </form>
                <div className="mx-1 my-1"><h5>Preview</h5></div>
                <div className="mx-1 my-1">
                    {
                        widget.size === 1 && <h1>{widget.text}</h1> ||
                        widget.size === 2 && <h2>{widget.text}</h2> ||
                        widget.size === 3 && <h3>{widget.text}</h3>
                    }
                </div>

            </div>
    )};
export default HeadingWidget
import React from 'react'

const ListWidget = ({widget,updateWidget,preview}) => {
    const class1=preview?"d-none":"";
    return(
        <div className="panel-body">
            <form className={`${class1}`}>
                <div className="mx-2 my-1">
		    		<textarea onChange={event => {
                        widget.items = event.target.value.split('\n');
                        updateWidget(widget)
                    }}className="form-control" rows='4' placeholder="Place
Each
Item On
One Row"
                              id="paragraph-text">{widget.items.toString().replace(/,/g,'\n')}</textarea>
                </div>
                <div className="mx-2 my-1">
                    <select onChange={event => {
                        widget.ddType = parseInt(event.target.value);
                        updateWidget(widget)
                    }}
                            className=" form-control">
                        <option value="1" selected={widget.ddType===1}>Unordered List</option>
                        <option value="2" selected={widget.ddType===2}>Ordered List</option>
                    </select>
                </div>
                <div className="mx-2 my-1">
                    <input className="form-control" disabled type="text" placeholder="Widget name"
                           id="widget-list-name"/>
                </div>
            </form>
            <div className="mx-1 my-1"><h5>Preview</h5></div>
            {
                widget.ddType===2?<ol>
                    {widget.items.map(wd=>
                        <li>{wd}</li>
                    )}
                </ol>:
                    <ul>
                        {widget.items.map(wd=>
                            <li>{wd}</li>
                        )}
                    </ul>
            }
        </div>
    );
};
export default ListWidget
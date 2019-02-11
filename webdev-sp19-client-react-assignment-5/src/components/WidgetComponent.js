import React from 'react'
import HeadingWidget from './HeadingWidget'
import ImageWidget from './ImageWidget'
import LinkWidget from './LinkWidget'
import ListWidget from './ListWidget'
import ParagraphWidget from './ParagraphWidget'

const getPanelTitle=(str)=>{
    if(str==="HEADING")
        return "Heading Text";
    if(str==="LIST")
        return "List Text";
    if(str==="IMAGE")
        return "Image Text";
    if(str==="PARAGRAPH")
        return "Paragraph Text";
    if(str==="LINK")
        return "Link Text";
};

const WidgetComponent = ({widget, deleteWidget, updateWidget,length,preview}) =>
{
    const class1=widget.position===0?"fa fa-arrow-circle-up fa-2x mt-1 mx-1 d-none":
        "fa fa-arrow-circle-up fa-2x mt-1 mx-1";
    const class2=widget.position===length-1?"fa fa-arrow-circle-down fa-2x mt-1 mx-1 d-none":
        "fa fa-arrow-circle-down fa-2x mt-1 mx-1";
    const class3=preview?"row col-5 float-right d-none":"row col-5 float-right"
    return (
        <div>
            <div className="row my-5">
                <div className="col-1 hidden-xs"/>
                <div className="panel panel-primary w-75 col-10" name="wid">
                    <div className="panel-header w-100 row">
                        <h4 className="col-3"> {getPanelTitle(widget.type)}</h4>
                        <div className="col-4"/>
                        <div className={`${class3}`}>
                            <div className="col-5"/>
                            <i onClick={() => {
                                widget.position = widget.position - 1;
                                widget.up = widget.up + 1;
                                updateWidget(widget)
                            }
                            }
                                className={`${class1}`}/>
                            <i onClick={() => {
                                widget.position = widget.position + 1;
                                widget.down = widget.down + 1;
                                updateWidget(widget)
                            }
                            }
                                className={`${class2}`}/>
                            <select
                                onChange={(event) => {
                                    widget.type = event.target.value;
                                    updateWidget(widget)
                                }}
                                className="float-right">
                                <option value="HEADING" selected={widget.type==="HEADING"}>Heading</option>
                                <option value="LIST" selected={widget.type==="LIST"}>List</option>
                                <option value="IMAGE" selected={widget.type==="IMAGE"}>Image</option>
                                <option value="PARAGRAPH" selected={widget.type==="PARAGRAPH"}>Paragraph</option>
                                <option value="LINK" selected={widget.type==="LINK"}>Link</option>
                            </select>
                            <i onClick={() => deleteWidget(widget)}
                            className="fa fa-times-circle mt-1 mx-1"/>
                        </div>
                    </div>
                    {
                        widget.type==='HEADING' &&
                        <HeadingWidget
                            updateWidget={updateWidget}
                            widget={widget}
                            preview={preview}/> ||
                        widget.type==='IMAGE'  && <ImageWidget
                            updateWidget={updateWidget}
                            widget={widget}
                            preview={preview}/>||
                        widget.type==='LINK'  && <LinkWidget
                            updateWidget={updateWidget}
                            widget={widget}
                            preview={preview}/>||
                        widget.type==='LIST'  && <ListWidget
                            updateWidget={updateWidget}
                            widget={widget}
                            preview={preview}/>||
                        widget.type==='PARAGRAPH'  && <ParagraphWidget
                            updateWidget={updateWidget}
                            widget={widget}
                            preview={preview}/>
                    }
                </div>
                <div className="col-1 hidden-xs"/>
            </div>
        </div>
    )
};

export default WidgetComponent
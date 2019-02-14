import CourseService from "./CourseService";

class WidgetService {
    constructor() {
        this.courseService=new CourseService()
        this.courses = {};
        this.widgets=[];
        this.courseService.findAllCourses()
            .then((courses)=>{
                var widgets=[];
                this.courses=courses;
                for (let i=0; i<this.courses.length; i++)
                {
                    for (let j=0; j<this.courses[i].modules.length; j++)
                    {
                        if(this.courses[i].modules[j].lessons!=null)
                        {
                            for (let k=0; k<this.courses[i].modules[j].lessons.length; k++)
                            {
                                if (this.courses[i].modules[j].lessons[k].topics!=null)
                                {
                                    for(let l=0; l<this.courses[i].modules[j].lessons[k].topics.length; l++)
                                    {
                                        if(this.courses[i].modules[j].lessons[k].topics[l].widgets!=null)
                                        {
                                            for (let m=0; m<this.courses[i].modules[j].lessons[k].topics[l].widgets.length; m++)
                                            {
                                                let o=this.courses[i].modules[j].lessons[k].topics[l].widgets[m];
                                                widgets.push({
                                                    topicId:this.courses[i].modules[j].lessons[k].topics[l].id,
                                                    widget:{
                                                        id:o.id,
                                                        type: o.type,
                                                        size: o.size,
                                                        text: o.text,
                                                        items: o.items==null?[]:o.items.split(','),
                                                        src: o.src,
                                                        href: o.href,
                                                        title:o.title,
                                                        ddType:o.ddType,
                                                        position:m,
                                                        up:0,
                                                        down:0
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.widgets=widgets;
            });
    }

    findWidgets= topicId =>{
        return this.widgets.filter(wid=>wid.topicId===topicId)
    };
    createWidget = (topicId, widget) =>{
        this.widgets.push({
            topicId:topicId,
            widget: widget
        })
    };
    findWidget = (widgetId)=>{
        return this.widgets.find(wid=>wid.widget.id===widgetId)
    };
    updateWidget=(widgetId, widget)=>{
        for (var i=0;i<this.widgets.length;i++)
        {
            if(widgetId===this.widgets[i].widget.id)
            {
                this.widgets[i].widget=widget;
            }
        }
    };
    deleteWidget = (widgetId) =>{
        this.widgets=this.widgets.filter(wid=>wid.widget.id!==widgetId)
    }

}


export default WidgetService
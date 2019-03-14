import CourseService from "./CourseService";
import TopicService from "./TopicService";

class WidgetService {
    constructor() {
        this.courseService=new CourseService();
        this.courses = {};
        this.widgets=[];
        this.topicService=new TopicService();
        this.courseService.findAllCourses()
            .then((courses)=>{
                var widgets=[];
                this.courses=courses;
                this.topicService.findAllWidgets()
                    .then(swidgets=>{
                        for (let m=0; m<swidgets.length; m++)
                        {
                            let o=swidgets[m];
                            widgets.push({
                                topicId:o.topicId,
                                widget:{
                                    id:o.id,
                                    topicId:o.topicId,
                                    type: o.type,
                                    size: o.size,
                                    text: o.text,
                                    items: o.items==null?[]:o.items.split(','),
                                    src: o.src,
                                    href: o.href,
                                    title:o.title,
                                    ddType:o.ddType,
                                    dtype:o.dtype,
                                    position:o.position,
                                    up:o.up,
                                    down:o.down
                                }
                            })
                        }
                    });
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
    };
    deleteAllWidgetsForTopic = (topicId) =>{
        this.widgets=this.widgets.filter(wid=>wid.topicId!==topicId)
        return this.widgets;
    }

}


export default WidgetService
import TopicService from "./TopicService";
import CourseService from "./CourseService"

class WidgetService {
    constructor() {
        this.WIDGET_API_URL='https://dry-coast-78857.herokuapp.com/';
        this.widgets=[];
        this.widgetsToBeDeleted=[];
        this.newlyCreatedWidgets=[];
        this.courses = {};
        this.courseService=new CourseService();
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
                                                        topicId:this.courses[i].modules[j].lessons[k].topics[l].id,
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
        });
        this.newlyCreatedWidgets.push({
            topicId:topicId,
            widget: widget
        });
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
        var wid=this.newlyCreatedWidgets.find(x=>x.widget.id===widgetId);
        if(wid!=null)
        {
            this.newlyCreatedWidgets=this.newlyCreatedWidgets.filter(x=>x.widget.id!==widgetId);
        }
        else
        {
            this.widgetsToBeDeleted.push(widgetId);
        }
        this.widgets=this.widgets.filter(wid=>wid.widget.id!==widgetId)
    };
    deleteAllWidgetsForTopic = (topicId) =>{
        for (let i=0;i<this.widgets.length;i++)
        {
            if(this.widgets[i].topicId===topicId)
            {
                var temp= fetch(this.WIDGET_API_URL+"api/widget/"+this.widgets[i].widget.id,{
                    method:'DELETE'
                });
            }
        }
        this.widgets=this.widgets.filter(wid=>wid.topicId!==topicId);

        return this.widgets;
    }
    saveAllWidgets() {
        for (let i = 0; i < this.widgetsToBeDeleted.length; i++) {
            var temp=fetch(this.WIDGET_API_URL + "api/widget/" + this.widgetsToBeDeleted[i], {
                method: 'DELETE'
            });
        }
        for (let i = 0; i < this.newlyCreatedWidgets.length; i++) {
            var temp=fetch(this.WIDGET_API_URL+"api/topic/"+this.newlyCreatedWidgets[i].topicId+"/widget", {
                body: JSON.stringify({id:this.newlyCreatedWidgets[i].widget.id,
                    topicId:this.newlyCreatedWidgets[i].topicId,
                    type: this.newlyCreatedWidgets[i].widget.type,
                    size: this.newlyCreatedWidgets[i].widget.size,
                    text: this.newlyCreatedWidgets[i].widget.text,
                    items: this.newlyCreatedWidgets[i].widget.items.join(','),
                    src: this.newlyCreatedWidgets[i].widget.src,
                    href: this.newlyCreatedWidgets[i].widget.href,
                    title:this.newlyCreatedWidgets[i].widget.title,
                    ddType:this.newlyCreatedWidgets[i].widget.ddType,
                    position:this.newlyCreatedWidgets[i].widget.position,
                    up:this.newlyCreatedWidgets[i].widget.up,
                    down:this.newlyCreatedWidgets[i].widget.down}),
                headers: {
                    'Content-Type': 'application/json' },
                credentials: 'include',
                method: 'POST'
            }).then((res) => res.json())

        }
        for (let i = 0; i < this.widgets.length; i++) {
            var temp=this.newlyCreatedWidgets.find(x=>x.widget.id===this.widgets[i].widget.id)
            if(temp!=null)
                continue;
            if (this.widgets[i].widget.type === 'HEADING') {
                var temp=fetch(this.WIDGET_API_URL + "api/heading/widget/" + this.widgets[i].widget.id, {
                    body: JSON.stringify(this.widgets[i].widget),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }).then(response => response.json());
            }
            if (this.widgets[i].widget.type === 'LIST') {
                this.widgets[i].widget.items=this.widgets[i].widget.items.join(',');
                var temp=fetch(this.WIDGET_API_URL + "api/list/widget/" + this.widgets[i].widget.id, {
                    body: JSON.stringify(this.widgets[i].widget),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }).then(response => response.json());
            }

            if (this.widgets[i].widget.type === 'LINK') {
                var temp=fetch(this.WIDGET_API_URL + "api/link/widget/" + this.widgets[i].widget.id, {
                    body: JSON.stringify(this.widgets[i].widget),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }).then(response => response.json());
            }
            if (this.widgets[i].widget.type === 'IMAGE') {
                var temp=fetch(this.WIDGET_API_URL + "api/image/widget/" + this.widgets[i].widget.id, {
                    body: JSON.stringify(this.widgets[i].widget),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }).then(response => response.json());
            }
            if (this.widgets[i].widget.type === 'PARAGRAPH') {
                var temp=fetch(this.WIDGET_API_URL + "api/paragraph/widget/" + this.widgets[i].widget.id, {
                    body: JSON.stringify(this.widgets[i].widget),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }).then(response => response.json());
            }
        }
        this.newlyCreatedWidgets=[];
        this.widgetsToBeDeleted = [];

    }
}


export default WidgetService
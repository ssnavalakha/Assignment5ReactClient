import CourseService from "../services/CourseService";

const service=new CourseService();
const comparator =(a,b)=>{
    return a.widget.position-b.widget.position;
};
const WidgetReducer = (state = {topicId:0,widgets:[],preview:false}, action) => {
    switch(action.type) {
        case 'DELETE_WIDGET':
            service.deleteWidget(action.widget.id);
            return {
                widgets: service.widgets.filter(wid=>wid.topicId===action.topicId),
                topicId: state.topicId,
                preview: state.preview
            };
        case 'ADD_WIDGET':
            service.createWidget(state.topicId, {
                id:(new Date()).getTime(),
                type: 'HEADING',
                text: '',
                size: 1,
                items:[],
                src: undefined,
                href: undefined,
                title:undefined,
                ddType:undefined,
                position:state.widgets.length,
                up:0,
                down:0
            });
            var newWidgetList=service.widgets.filter(wid=>
            {
                return wid.topicId===state.topicId
            });
            return {
                widgets:newWidgetList ,
                topicId: state.topicId,
                preview: state.preview
            };
        case 'FIND_ALL_WIDGETS_FOR_TOPIC':
            return{
                widgets: service.widgets.filter(wid=>wid.topicId===action.topicId),
                topicId: action.topicId,
                preview: state.preview
            };
        case 'FIND_WIDGET':
            return{
                widgets: service.widgets.filter(wid=>wid.topicId===action.topicId
                    && wid.widget.id===action.widgetId),
                topicId: action.topicId,
                preview: state.preview
            };
        case 'FIND_ALL_WIDGETS':
            return{
              topicId:action.topicId,
              widgets:service.widgets,
              preview: state.preview
            };
        case 'CHANGE_PREVIEW':
        {
            return{
                topicId:state.topicId,
                widgets:state.widgets,
                preview: !state.preview
            }
        }
        case 'UPDATE_WIDGET':
            var newWidgetList=state.widgets.map(widget =>
                widget.id === action.widget.id ? action.widget : widget);
            for (var i=0;i<newWidgetList.length-1;i++) {
                if (newWidgetList[i].widget.position === newWidgetList[i + 1].widget.position) ;
                    if(newWidgetList[i].widget.down>newWidgetList[i+1].widget.down)
                    {
                        newWidgetList[i + 1].widget.position=newWidgetList[i + 1].widget.position-1;
                        newWidgetList[i].widget.down=0;
                    }
            }
            for (var i=1;i<newWidgetList.length;i++) {
                if(newWidgetList[i].widget.up>newWidgetList[i-1].widget.up)
                {
                    newWidgetList[i - 1].widget.position=newWidgetList[i - 1].widget.position+1;
                    newWidgetList[i].widget.up=0;
                }
            }
            newWidgetList.sort(comparator);

            return {
                widgets: newWidgetList.filter(wid=>wid.topicId===state.topicId),
                topicId: state.topicId,
                preview: state.preview
            };
        default:
            return state;
    }
};

export default WidgetReducer;
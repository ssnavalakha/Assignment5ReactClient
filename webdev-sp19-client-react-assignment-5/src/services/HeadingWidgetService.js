
class HeadingWidgetService {
    constructor(){
        this.HEADING_API='https://dry-coast-78857.herokuapp.com/';
    }

    createHeadingWidget(w,topicId){
        
       var wid= fetch(this.WIDGET_API_URL+"api/topic/"+topicId+"/widget", {
            body: JSON.stringify({id:w.id,
                topicId:topicId,
                type: w.type,
                size: w.size,
                text: w.text,
                items: w.items.join(','),
                src: w.src,
                href: w.href,
                title:w.title,
                ddType:w.ddType,
                position:w.position,
                up:w.up,
                down:w.down}),
            headers: {'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'POST'
        }).then((res) => res.json());
        return wid;
    }

    findHeadingById(id)
    {
        return fetch(this.HEADING_API+"/api/heading/widget/"+id)
            .then(response =>
                response.json());
    }

    findAllHeadings()
    {
        return fetch(this.HEADING_API+"/api/heading/widget/")
            .then(response =>
                response.json());
    }

    deleteHeadingWidget(id)
    {
        return fetch(this.HEADING_API+"/api/heading/widget/"+id,{
            method:'DELETE'
        })
    }
}

class ListWidgetService {
    constructor(){
        this.List_API='https://dry-coast-78857.herokuapp.com/';
    }

    createListWidget(w,topicId){
        var wid= fetch(this.List_API+"api/topic/"+topicId+"/widget", {
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

    findListById(id)
    {
        return fetch(this.List_API+"/api/list/widget/"+id)
            .then(response =>
                response.json());
    }

    findAllListWidgets()
    {
        return fetch(this.List_API+"/api/list/widget/")
            .then(response =>
                response.json());
    }


    deleteListWidget(id)
    {
        return fetch(this.List_API+"/api/list/widget/"+id,{
            method:'DELETE'
        })
    }
}
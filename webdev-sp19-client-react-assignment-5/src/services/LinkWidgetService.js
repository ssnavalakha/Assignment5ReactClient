
class LinkWidgetService {
    constructor(){
        this.Link_API='https://dry-coast-78857.herokuapp.com/';
    }

    createLinkWidget(w,topicId){
        var wid= fetch(this.Link_API+"api/topic/"+topicId+"/widget", {
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

    findLinkById(id)
    {
        return fetch(this.Link_API+"/api/link/widget/"+id)
            .then(response =>
                response.json());
    }

    findAllLinkWidgets()
    {
        return fetch(this.Link_API+"/api/link/widget/")
            .then(response =>
                response.json());
    }


    deleteLinkWidget(id)
    {
        return fetch(this.Link_API+"/api/link/widget/"+id,{
            method:'DELETE'
        })
    }
}
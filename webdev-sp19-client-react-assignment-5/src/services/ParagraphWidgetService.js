
class ParagraphWidgetService {
    constructor(){
        this.PARAGRAPH_API='https://dry-coast-78857.herokuapp.com/';
    }

    createParaWidget(w,topicId){
        var wid= fetch(this.PARAGRAPH_API+"api/topic/"+topicId+"/widget", {
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

    findParaById(id)
    {
        return fetch(this.PARAGRAPH_API+"/api/paragraph/widget/"+id)
            .then(response =>
                response.json());
    }

    findAllParaWidgets()
    {
        return fetch(this.PARAGRAPH_API+"/api/paragraph/widget/")
            .then(response =>
                response.json());
    }


    deleteParaWidget(id)
    {
        return fetch(this.PARAGRAPH_API+"/api/paragraph/widget/"+id,{
            method:'DELETE'
        })
    }
}
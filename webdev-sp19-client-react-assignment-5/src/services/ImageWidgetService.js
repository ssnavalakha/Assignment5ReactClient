
class ImageWidgetService {
    constructor(){
        this.IMAGE_API='https://dry-coast-78857.herokuapp.com/';
    }

    createImageWidget(w,topicId){
        var wid= fetch(this.IMAGE_API+"api/topic/"+topicId+"/widget", {
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

    findImageById(id)
    {
        return fetch(this.IMAGE_API+"/api/image/widget/"+id)
            .then(response =>
                response.json());
    }

    findAllImageWidgets()
    {
        return fetch(this.IMAGE_API+"/api/image/widget/")
            .then(response =>
                response.json());
    }


    deleteImageWidget(id)
    {
        return fetch(this.IMAGE_API+"/api/image/widget/"+id,{
            method:'DELETE'
        })
    }
}
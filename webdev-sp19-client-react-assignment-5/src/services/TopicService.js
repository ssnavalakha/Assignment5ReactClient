import CourseService from "./CourseService";

class TopicService{
    constructor()
    {
        this.TOPIC_API_URL='http://localhost:8080/';
    }
    createTopic(lid,topic)
    {
        return fetch(this.TOPIC_API_URL+"api/lesson/"+lid+"/topic", {
            body: JSON.stringify(topic),
            headers: {
                'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'POST'
        }).then((res) => res.json())
    }

    findAllTopics(lid)
    {
        return fetch(this.TOPIC_API_URL+"api/lesson/"+lid+"/topic")
            .then(response =>
                response.json());
    }
    findTopicById(tid)
    {
        return fetch(this.TOPIC_API_URL+"api/topic/"+tid)
            .then(response =>
                response.json());
    }
    updateTopic(tid,lesson)
    {
        return fetch(this.TOPIC_API_URL+"api/topic/"+tid, {
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json' },
            method: 'PUT'
        }).then((res) => res.json());
    }
    deleteTopic(tid)
    {
        return fetch(this.TOPIC_API_URL+"api/topic/"+tid,{
            method:'DELETE'
        })
    }
}

export default TopicService
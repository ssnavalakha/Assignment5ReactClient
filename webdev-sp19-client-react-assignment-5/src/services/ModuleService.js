import CourseService from "./CourseService";

class ModuleService{
    constructor()
    {
        this.MODULE_API_URL='https://dry-coast-78857.herokuapp.com/';
    }
    createModule(cid,module)
    {
        return fetch(this.MODULE_API_URL+"api/courses/"+cid+"/modules", {
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json' },
            credentials: 'include',
            method: 'POST'
        }).then((res) => res.json())
    }

    findAllModules(cid)
    {
        return fetch(this.MODULE_API_URL+"api/course/"+cid+"/modules")
            .then(response =>
            response.json());
    }
    findModuleById(mid)
    {
        return fetch(this.MODULE_API_URL+"api/modules/"+mid)
            .then(response =>
                response.json());
    }
    updateModule(mid,Course)
    {
        return fetch(this.MODULE_API_URL+"api/modules/"+mid, {
            body: JSON.stringify(Course),
            headers: {
                'Content-Type': 'application/json' },
            method: 'PUT'
        }).then((res) => res.json());
    }
    deleteModule(mid)
    {
        return fetch(this.MODULE_API_URL+"api/modules/"+mid,{
            method:'DELETE'
        });
    }
}
export default ModuleService
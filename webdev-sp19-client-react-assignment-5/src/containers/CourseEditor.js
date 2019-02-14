import React from 'react'
import ModuleList from "../components/ModuleList";
import LessonTabs from "../components/LessonTabs";
import TopicPills from "../components/TopicPills";
import CourseService from "../services/CourseService";
import LessonService from "../services/LessonService"
import TopicService from "../services/TopicService"
import ModuleService from "../services/ModuleService"
import '../components/course-editor.style.client.css';
import 'font-awesome/css/font-awesome.min.css';
import WidgetListContainer from '../containers/WidgetListContainer'
import widgetReducer from '../reducers/WidgetReducer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'



class CourseEditor extends React.Component {
  componentDidMount = () =>
  {
      this.courseService.findCourseById(this.courseId)
          .then((course)=>{
              this.setState ( {
                  course: course,
                  collapsed: true,
                  module: course.modules==null||course.modules.length===0?{title:'',lessons:[]}:{
                      id: course.modules[0].id,
                      title: course.modules[0].title,
                      lessons: course.modules[0].lessons!=null?course.modules[0].lessons:[]},

                  lesson:(course.modules!=null)&&(course.modules.length!==0)&&
                  (course.modules[0].lessons!=null)
                      ?
                      {id:course.modules[0].lessons[0].id,
                          title:course.modules[0].lessons[0].title,
                          topics:course.modules[0].lessons[0].topics}
                      :{title:'',
                          topics:[]},

                  topic:(course.modules!=null)&&(course.modules.length!==0)&&
                  (course.modules[0].lessons!=null)
                  && (course.modules[0].lessons[0].topics!=null)
                      ?course.modules[0].lessons[0].topics[0]:{title:""},
                  monitorButtonDisabilityLesson: [{
                      id:null,
                      disabled: true
                  }],
                  currentlyEditingLesson: {title: ''},
                  monitorButtonDisabilityTopic: [{
                      id:null,
                      disabled: true
                  }],
                  currentlyEditingTopic: {title: ''},
                  monitorButtonDisability: [{
                      id:null,
                      disabled: true
                  }],
                  currentlyEditingModule: {title: ''},
                  modules: course.modules!=null?course.modules:[],
                  newlyAddedModule:{title:''},
                  newlyAddedTopic:{title:''},
                  newlyAddedLesson:{title:''}
              },(prevstate)=>{
                  var topicState = this.state.topic.id;
                  this.store.dispatch({
                      type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
                      topicId: this.state.topic.id
                  });
              });
          })
  };
  constructor(props) {
    super(props);
    this.courseService = new CourseService();
    this.lessonService=new LessonService();
    this.moduleService=new ModuleService();
    this.topicService=new TopicService();
    this.courseId = parseInt(props.match.params.id);
    this.createLesson=this.createLesson.bind(this);
    this.createTopic=this.createTopic.bind(this);
    this.createModule=this.createModule.bind(this);
    this.deleteLesson=this.deleteLesson.bind(this);
    this.deleteTopic=this.deleteTopic.bind(this);
    this.deleteModule=this.deleteModule.bind(this);
    this.selectTopic=this.selectTopic.bind(this);
    this.selectModule=this.selectModule.bind(this);
    this.selectLesson=this.selectLesson.bind(this);
    this.lessonsChecker=this.lessonsChecker.bind(this);
    this.topicsChecker=this.topicsChecker.bind(this);
    this.createLesson=this.createLesson.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.moduleNameTitleChanged=this.moduleNameTitleChanged.bind(this);
    this.titleChanged=this.titleChanged.bind(this);
    this.checkIfDisabled = this.checkIfDisabled.bind(this);
    this.enable= this.enable.bind(this);
    this.lessonTitleChanged=this.lessonTitleChanged.bind(this);
    this.topicTitleChanged=this.topicNameTitleChanged.bind(this);
    this.lessonNameTitleChanged=this.lessonNameTitleChanged.bind(this);
    this.topicNameTitleChanged=this.topicNameTitleChanged.bind(this);
    this.checkIfLessonDisabled = this.checkIfLessonDisabled.bind(this);
    this.enableLesson= this.enableLesson.bind(this);

    this.checkIfTopicDisabled = this.checkIfTopicDisabled.bind(this);
    this.enableTopic= this.enableTopic.bind(this);

      this.state = {
      course: {},
      collapsed: true,
      module: {title:'',lessons:[]},

      lesson:{title:'',
          topics:[]},

      topic:{title:""},
      monitorButtonDisabilityLesson: [{
        id:null,
        disabled: true
      }],
      currentlyEditingLesson: {title: ''},
      monitorButtonDisabilityTopic: [{
        id:null,
        disabled: true
      }],
      currentlyEditingTopic: {title: ''},
      monitorButtonDisability: [{
        id:null,
        disabled: true
      }],
      currentlyEditingModule: {title: ''},
      modules: [],
      newlyAddedModule:{title:''},
      newlyAddedTopic:{title:''},
      newlyAddedLesson:{title:''}
    };
    this.checkIfLessonDisabled = this.checkIfLessonDisabled.bind(this);
    this.enableLesson= this.enableLesson.bind(this);

    this.checkIfTopicDisabled = this.checkIfTopicDisabled.bind(this);
    this.enableTopic= this.enableTopic.bind(this);
    this.store= createStore(widgetReducer);
  }
  moduleNameTitleChanged = (event) => {
    this.setState(
        {
          currentlyEditingModule: {title: event.target.value}
        });
  };
  createModule = () => {
    var moduleToBeAdded=this.state.newlyAddedModule;
    if(moduleToBeAdded.title.trim()===""||moduleToBeAdded.title.length===0)
    {
      moduleToBeAdded={id: (new Date()).getTime(),
        title: "New Module",
        lessons:[]}
    }
    this.moduleService.createModule(this.courseId,moduleToBeAdded)
        .then(()=>{
          this.setState(
              (prevState)=>({
                modules: [
                  ...prevState.modules,
                  moduleToBeAdded
                ]
              })
              ,()=>{
                this.setState((prevState1)=>({
                  course:{id: prevState1.course.id,
                    title: prevState1.course.title,
                    modules: prevState1.modules}
                }),()=>{
                  this.setState({

                  },()=>{
                    this.setState(
                        {
                          newlyAddedModule: {id: (new Date()).getTime(),
                            title: '',
                            lessons:[]}
                        },()=>{
                          this.selectModule(moduleToBeAdded)
                        });
                  });
                });
              });
        });
  };
  deleteModule = (module) => {
    this.moduleService.deleteModule(module.id)
        .then(()=>{
          this.setState((prevState)=>({
            modules:prevState.modules.filter(x=>x.id!==module.id)
          }),()=>{
            this.setState((prevState1)=>({
              course:{id: prevState1.course.id,
                title: prevState1.course.title,
                modules: prevState1.modules}
            }),()=>{
              this.selectModule(this.state.modules.length!==0?
                  this.state.modules[0]:{title:'',lessons:[]})
            })
          });
        });
  };
  titleChanged = (event) => {

    this.setState(
        {
          newlyAddedModule: {id: (new Date()).getTime(),
            title: event.target.value,
            lessons:[]}
        });
  };
  checkIfDisabled = (id) =>{
    if(this.state.monitorButtonDisability.length===0)
    {
      var array=[];
      array.push({id:id,
        disabled:true});
      this.setState({
        monitorButtonDisability:array
      });
      return true;
    }
    var foundButton=this.state.monitorButtonDisability.find
    (button=>
        button.id===id
    );
    if (foundButton==null)
    {
      var newEntry={id:id,
        disabled:true};
      var joined = this.state.monitorButtonDisability.concat(newEntry);
      this.setState({monitorButtonDisability:joined});

      return true;
    }
    else
      return foundButton.disabled;
  };
  enable = (id) =>{
    var foundButton=this.state.monitorButtonDisability.find
    (button=>
        button.id===id
    );
    if (foundButton.disabled===false) {
      var currentModule = this.state.modules.find(m => m.id === id)
      currentModule.title = this.state.currentlyEditingModule.title;
      var newModuleArray = [];
      for (var i = 0; i < this.state.modules.length; i++) {
        if (this.state.modules[i].id === id) {
          newModuleArray.push(currentModule)
        } else {
          newModuleArray.push(this.state.modules[i])
        }
      }
      foundButton.disabled = true;
      var newList = this.state.monitorButtonDisability.filter(button =>
          button.id !== id);
      var c1 = this.state.course;
      c1.modules = newModuleArray;
      this.moduleService.updateModule(id, c1)
          .then(() => {
            this.setState({
              modules: newModuleArray,
              course: c1,
              monitorButtonDisability: [
                ...newList,
                foundButton
              ]
            })
          });
    }
    else{
      foundButton.disabled=false;
      var newList=this.state.monitorButtonDisability.filter(button=>
          button.id!==id);
      this.setState({
        monitorButtonDisability:[
          ... newList,
          foundButton
        ]
      })
    }
  };
  selectModule = module =>
      this.setState({
        module: {id:module.id,
          title:module.title,
          lessons:module.lessons==null?[]:module.lessons},
      },()=>{
        this.setState({
          lesson:(module.lessons!=null) && (module.lessons.length!==0)
              ?
              {id:module.lessons[0].id,
                title:module.lessons[0].title,
                topics:module.lessons[0].topics}
              :{title:'',
                topics:[]},
        },()=>{
          this.setState({
            topic:(module.lessons!=null) && (module.lessons.length!==0)
            &&(module.lessons[0].topics!=null) && (module.lessons[0].topics.length!==0)
                ?module.lessons[0].topics[0]:{title:""}
          },()=>{
            this.store.dispatch({
              type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
              topicId:this.state.topic.id!=null?
                  this.state.topic.id:-1
            });
          })
        })
      });
  selectTopic = topic =>
  {
    this.store.dispatch({
      type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
      topicId: topic.id
    });
    this.setState({
      topic: {id:topic.id,
        title: topic.title}
    })
  };
  selectLesson = lesson =>
      this.setState({
        lesson: {id:lesson.id,
          title:lesson.title,
          topics:lesson.topics==null?[]:lesson.topics}
      },()=>{
        this.setState({
          topic:(lesson.topics!=null) && (lesson.topics.length!==0)
              ?lesson.topics[0]:{title:""}
        },()=>{
          this.store.dispatch({
            type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
            topicId:this.state.topic.id!=null?
                this.state.topic.id:-1
          });
        })
      });
  lessonTitleChanged = (event) => {
    this.setState(
        {
          newlyAddedLesson: {id:(new Date()).getTime(),
            title: event.target.value,
            topics:[]}
        });
  };
  topicTitleChanged = (event) => {
    this.setState(
        {
          newlyAddedTopic: {id:(new Date()).getTime()
            ,title: event.target.value}
        });
  };

  deleteLesson = (lesson) => {
    this.lessonService.deleteLesson(lesson.id)
        .then(()=>{
            var newModule={id: this.state.module.id,
                title: this.state.module.title,
                lessons: this.state.module.lessons.filter(x=>x.id!==lesson.id)}
          this.setState((prevState)=>({
            module:newModule
            ,topic:{title:""}
          }),()=>{
            var array=[];
            for (var i=0;i<this.state.modules.length;i++)
            {
              if(this.state.module.id===this.state.modules[i].id)
                array.push(this.state.module);
              else
                array.push(this.state.modules[i]);
            }
            this.setState({
              modules:array
            },()=>{
              this.setState((prevState4)=>({
                course:{id: prevState4.course.id,
                  title: prevState4.course.title,
                  modules: array}
              }),()=>{
                this.selectLesson(this.state.module.lessons.length!==0?
                    this.state.module.lessons[0]:{title:'',topics:[]})});
            });
          });
        });
  };
  deleteTopic = (topic) => {
    this.topicService.deleteTopic(topic.id)
        .then(()=>{
          var newLesson={id: this.state.lesson.id,
            title: this.state.lesson.title,
            topics: this.state.lesson.topics.filter(x=>x.id!=topic.id)}
          this.setState({
            lesson:newLesson
          }, ()=>{
            var lessonArray=[];
            for (var i=0;i<this.state.module.lessons.length;i++)
            {
              if(this.state.module.lessons[i].id===newLesson.id)
                lessonArray.push(newLesson);
              else
                lessonArray.push(this.state.module.lessons[i])
            }
            this.setState((prevState1)=>(
                    {
                      module:{id: prevState1.module.id,
                        title: prevState1.module.title,
                        lessons:lessonArray}
                    })
                ,()=>{
                  var array=[];
                  for (var i=0;i<this.state.modules.length;i++)
                  {
                    if(this.state.module.id===this.state.modules[i].id)
                      array.push(this.state.module);
                    else
                      array.push(this.state.modules[i]);
                  }
                  this.setState((prevState3)=>({
                    modules:array,
                    course:{id: prevState3.course.id,
                      title: prevState3.course.title,
                      modules: array}
                  }));
                });
          });
        });
  };
  createLesson = () => {
    var lessonTobeAdded=this.state.newlyAddedLesson;
    if (lessonTobeAdded.title.trim()===""||lessonTobeAdded.title.length===0)
    {
      lessonTobeAdded={id: (new Date()).getTime(),
        title: "New Lesson",
        topics:[]}
    }
    this.lessonService.createLesson(this.state.module.id,lessonTobeAdded)
        .then(()=>{
          this.setState(
              (prevState)=>({
                module:{id: prevState.module.id,
                  title: prevState.module.title,
                  lessons: [
                    ...prevState.module.lessons,
                    lessonTobeAdded
                  ]}
              })
              ,()=>{
                var array=[];
                for (var i=0;i<this.state.modules.length;i++)
                {
                  if(this.state.module.id===this.state.modules[i].id)
                    array.push(this.state.module);
                  else
                    array.push(this.state.modules[i]);
                }
                this.setState((prevState2)=>({
                  modules:array,
                  course:{id: prevState2.course.id,
                    title: prevState2.course.title,
                    modules: array}
                }),()=>{
                  this.setState({
                    newlyAddedLesson: {id:(new Date()).getTime(),
                      title: '',
                      topics:[]}
                  },()=>{
                    this.selectLesson(lessonTobeAdded)
                  });

                });
              });
        });
  };
  createTopic = () => {
    var topicTobeAdded=this.state.newlyAddedTopic;
    if(topicTobeAdded.title.trim()===""||topicTobeAdded.title.length===0)
    {
      topicTobeAdded={id: (new Date()).getTime(),
          widgets:[],
          title: "New Topic"}
    }
    var newLesson={id: this.state.lesson.id,
      title: this.state.lesson.title,
      topics: [
        ...this.state.lesson.topics,
        topicTobeAdded]};
    this.topicService.createTopic(this.state.lesson.id,topicTobeAdded)
        .then(()=>{
          this.setState(
              {
                lesson:newLesson
              }
              ,()=>{
                var lessonArray=[];
                for (var j=0;j<this.state.module.lessons.length;j++)
                {
                  if(this.state.module.lessons[j].id===newLesson.id)
                    lessonArray.push(newLesson);

                  else
                    lessonArray.push(this.state.module.lessons[j])
                }
                this.setState((prevState6)=>(
                        {
                          module:{id: prevState6.module.id,
                            title: prevState6.module.title,
                            lessons: lessonArray}
                        })
                    ,()=>{
                      var array=[];
                      for (var i=0;i<this.state.modules.length;i++)
                      {
                        if(this.state.module.id===this.state.modules[i].id)
                          array.push(this.state.module);
                        else
                          array.push(this.state.modules[i]);
                      }
                      this.setState((prevState8)=>({
                        modules:array,
                        course:{id: prevState8.course.id,
                          title: prevState8.course.title,
                          modules: array}
                      }),()=>{
                        this.setState({
                          newlyAddedTopic:{id:(new Date()).getTime(),title:''}
                        },()=>{
                          this.selectTopic(topicTobeAdded);
                        });
                      });
                    });
              });
        });
  };
  lessonNameTitleChanged = (event) => {
    this.setState(
        {
          currentlyEditingLesson: {title: event.target.value}
        });
  };
  topicNameTitleChanged = (event) => {
    this.setState(
        {
          currentlyEditingTopic: {title: event.target.value}
        });
  };
  checkIfLessonDisabled = (id) =>{
    var foundButton=this.state.monitorButtonDisabilityLesson.find
    (button=>
        button.id===id
    );
    if (foundButton==null)
    {
      var newEntry={id:id,
        disabled:true};
      var joined = this.state.monitorButtonDisabilityLesson.concat(newEntry);
      this.setState({monitorButtonDisabilityLesson:joined});

      return true;
    }
    else
      return foundButton.disabled;
  };

  lessonsChecker = () => {
    return this.state.module.title!==""
  };
  topicsChecker = () => {
    return this.state.module.lessons!=null && this.state.module.lessons.length!==0
  };

  checkIfTopicDisabled = (id) =>{
    var foundButton=this.state.monitorButtonDisabilityTopic.find
    (button=>
        button.id===id
    );
    if (foundButton==null)
    {
      var newEntry={id:id,
        disabled:true};
      var joined = this.state.monitorButtonDisabilityTopic.concat(newEntry);
      this.setState({monitorButtonDisabilityTopic:joined});

      return true;
    }
    else
      return foundButton.disabled;
  };

  enableLesson = (id) =>{
    var foundButton=this.state.monitorButtonDisabilityLesson.find
    (button=>
        button.id===id
    );
    if (foundButton.disabled===false)
    {
      var currentLesson=this.state.module.lessons.find(m=>m.id===id)
      currentLesson.title=this.state.currentlyEditingLesson.title;
      this.lessonService.updateLesson(currentLesson.id,this.state.module)
          .then(()=>{
            var newLessonsArray=[];
            for(var i=0;i<this.state.module.lessons.length;i++)
            {
              if(this.state.module.lessons[i].id===id)
              {
                newLessonsArray.push(currentLesson)
              }
              else
              {
                newLessonsArray.push(this.state.module.lessons[i])
              }
            }
            foundButton.disabled=true;
            var newList=this.state.monitorButtonDisabilityLesson.filter(button=>
                button.id!==id);
            this.setState({
              monitorButtonDisabilityLesson:[
                ... newList,
                foundButton
              ]
            })
          });
    }
    else{
      foundButton.disabled=false;
      var newList=this.state.monitorButtonDisabilityLesson.filter(button=>
          button.id!==id);
      this.setState({
        monitorButtonDisabilityLesson:[
          ... newList,
          foundButton
        ]
      })
    }
  };

  enableTopic = (id) =>{
    var foundButton=this.state.monitorButtonDisabilityTopic.find
    (button=>
        button.id===id
    );
    if (foundButton.disabled===false)
    {
      var currentTopic=this.state.lesson.topics.find(m=>m.id===id)
      currentTopic.title=this.state.currentlyEditingTopic.title;
      this.topicService.updateTopic(id,this.state.lesson)
          .then(()=>{
            var newTopicArray=[];
            for(var i=0;i<this.state.lesson.topics.length;i++)
            {
              if(this.state.lesson.topics[i].id===id)
              {
                newTopicArray.push(currentTopic)
              }
              else
              {
                newTopicArray.push(this.state.lesson.topics[i])
              }
            }
            foundButton.disabled=true;
            var newList=this.state.monitorButtonDisabilityTopic.filter(button=>
                button.id!==id);
            this.setState({
              monitorButtonDisabilityTopic:[
                ... newList,
                foundButton
              ]
            })
          });
    }
    else{
      foundButton.disabled=false;
      var newList=this.state.monitorButtonDisabilityTopic.filter(button=>
          button.id!==id);
      this.setState({
        monitorButtonDisabilityTopic:[
          ... newList,
          foundButton
        ]
      })
    }
  };
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const classOne = this.state.collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = this.state.collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler';
    return (
        <div style={{backgroundColor:'#ffffff'}}>
          <div className="row">
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark w-100">
              <div className="time-sign-top mx-3">&times;</div>
              <a className="navbar-brand text-white" href="#">{this.state.course.title}</a>
              <button onClick={this.toggleNavbar}
                      className={`${classTwo}`} type="button"
                      data-toggle="collapse" data-target="#navbarNavDropdown">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className={`${classOne}`} id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Build</a></li>
                  <li className="nav-item active">
                    <a className="nav-link text-white" href="#">Pages</a></li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Theme</a></li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Store</a></li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Apps</a></li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Settings</a></li>
                  <div className="float-right">
                    <i className="fa fa-plus " style={{color: '#ffffff'}}/>
                  </div>
                </ul>
              </div>
            </nav>
          </div>
          <div className="row">
            <div className="col-3 col-sm-2
             bg-dark Max-width 100% d-inline-block Max-height 100%">
              <ModuleList
                  selectModule={this.selectModule}
                  modules={this.state.modules}
                  titleChanged={this.titleChanged}
                  createModule={this.createModule}
                  deleteModule={this.deleteModule}
                  checkIfDisabled={this.checkIfDisabled}
                  enable={this.enable}
                  moduleNameTitleChanged={this.moduleNameTitleChanged}/>
            </div>
            <div className="col-9 col-sm-10">

              <LessonTabs
                  lessons={this.state.module.lessons}
                  lessonTitleChanged={this.lessonTitleChanged}
                  deleteLesson={this.deleteLesson}
                  createLesson={this.createLesson}
                  enableLesson={this.enableLesson}
                  checkIfLessonDisabled={this.checkIfLessonDisabled}
                  lessonNameTitleChanged={this.lessonNameTitleChanged}
                  selectLesson={this.selectLesson}
                  lessonsChecker={this.lessonsChecker}/>
              <TopicPills
                  topics={this.state.lesson.topics}
                  topicsTitleChanged={this.topicTitleChanged}
                  deletetopic={this.deleteTopic}
                  createTopic={this.createTopic}
                  enableTopic={this.enableTopic}
                  checkIfTopicDisabled={this.checkIfTopicDisabled }
                  topicNameTitleChanged={this.topicNameTitleChanged}
                  selectTopic={this.selectTopic}
                  topicsChecker={this.topicsChecker}
              />

              <Provider store={this.store}>
                <WidgetListContainer/>
              </Provider>
            </div>
          </div>
        </div>
    )
  }
}
export default CourseEditor
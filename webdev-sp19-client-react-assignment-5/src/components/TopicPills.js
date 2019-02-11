import React from 'react'

const TopicPills = ({topics,topicsTitleChanged,deletetopic,createTopic
                    ,enableTopic,checkIfTopicDisabled,topicNameTitleChanged,
                    selectTopic,topicsChecker}) => {
    if (!topicsChecker())
    {
        return <div></div>
    }
        return <ul className="nav nav-pills">
            {
                topics.map(topic =>
                        <li onClick={() => selectTopic(topic)} className="nav-item">
                            <a className="nav-link bg-dark text-white"
                               href="#"><input id={topic.id}
                                               onChange={topicNameTitleChanged}
                                               className="border-0 bg-dark text-white col-xs-1"
                                               type="text" disabled={checkIfTopicDisabled(topic.id)}
                                               placeholder={topic.title}/>
                                <span className="float-right ml-3">
                                <i onClick={() => enableTopic(topic.id)}
                                   className="fa fa-xs fa-edit"/>
                                <span onClick={() => deletetopic(topic)}>&times;</span>
                                </span>
                            </a>
                        </li>
                )
            }
            <li>
                <input onChange={topicsTitleChanged}
                       className="form-inline border bg-dark border-light my-2 mx-2 text-white"
                />
            </li>
            <li>
                <i onClick={createTopic}
                   className="fa fa-plus-circle fa-2x"/>
            </li>
        </ul>;
}
export default TopicPills
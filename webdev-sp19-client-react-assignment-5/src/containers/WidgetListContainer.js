import React from 'react'
import {connect} from 'react-redux'
import WidgetList from '../components/WidgetList'

const stateToPropertyMapper = state => ({
    widgets: state.widgets,
    preview:state.preview
});

const dispatchToPropertyMapper = dispatch => ({
    deleteWidget: widget =>
        dispatch({
            type: 'DELETE_WIDGET',
            widget: widget
        }),
    addWidget: () =>
        dispatch({
            type: 'ADD_WIDGET'
        }),
    changePreview: () =>
        dispatch({
            type: 'CHANGE_PREVIEW'
        }),
    updateWidget: widget =>
        dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
    saveWidgets: ()=>
        dispatch({
            type:'SAVE_WIDGETS'
        })
});

const WidgetListContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(WidgetList);

export default WidgetListContainer
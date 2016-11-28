import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        //find the next field via the React.ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text: text,
            createdAt: new Date()
        });
        //clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    getTasks() {
        return [
            {_id: 1, text: "this is text1"},
            {_id: 2, text: "this is text2"},
            {_id: 3, text: "this is text3"},
            {_id: 4, text: "this is text4"},
            {_id: 5, text: "this is text5"},
        ]
    }

    renderTasks() {
        //return this.getTasks().map((task) => (<Task key={task._id} task={task}/>));
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    };
}, App);
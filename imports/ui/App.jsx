import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    handleSubmit(event) {
        event.preventDefault();

        //find the next field via the React.ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
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

                    <AccountsUIWrapper />

                    {/*<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >*/}
                        {/*<input*/}
                            {/*type="text"*/}
                            {/*ref="textInput"*/}
                            {/*placeholder="Type to add new tasks"*/}
                        {/*/>*/}
                    {/*</form>*/}
                    { this.props.currentUser ?
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form> : ''
                    }

                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);
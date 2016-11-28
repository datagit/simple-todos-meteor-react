import React, { Component, PropTypes } from 'react';

import Tasks from '../api/tasks.jsx';

export default class Task extends Component {
    toggleChecked() {

    }

    render() {
        return (
            <li>{this.props.task.text}</li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
}

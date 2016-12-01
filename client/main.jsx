import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.jsx';

// export default class App extends React.Component {
//     render() {
//         return (
//             <h1>Hello World</h1>
//         );
//     }
// }

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});
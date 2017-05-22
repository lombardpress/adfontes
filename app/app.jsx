var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");

var TodoApp = require("TodoApp");

var actions = require("actions");
var store = require("configureStore").configure();

store.subscribe(() => {
	console.log('New state', store.getState());
});

store.dispatch(actions.addTodo('walk the dog'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());

// load foundation
$(document).foundation();

// App css

require('style!css!sass!applicationStyles')
$(document).foundation();

ReactDOM.render(
	<TodoApp/>,
	document.getElementById('app')
);

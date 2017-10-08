var React = require("react");
var ReactDOM = require("react-dom");
var {Provider} = require("react-redux");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");

var TodoApp = require("TodoApp");

var actions = require("actions");
var store = require("configureStore").configure();



store.subscribe(() => {
	var state = store.getState();

});

//var state = store.getState();

store.dispatch(actions.setSearchParameters({}));
store.dispatch(actions.fetchCanonicalQuotations());
store.dispatch(actions.fetchAuthors());
store.dispatch(actions.fetchSearchWorksList());
//store.dispatch(actions.fetchExpressionTypes());
store.dispatch(actions.fetchQuotationWorksList());
store.dispatch(actions.fetchWorkGroups());



// load foundation
$(document).foundation();

// App css

require('style!css!sass!applicationStyles')
$(document).foundation();

ReactDOM.render(
	<Provider store={store}>
		<TodoApp/>
	</Provider>,
	document.getElementById('app')
);

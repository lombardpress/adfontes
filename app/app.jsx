var React = require("react");
var ReactDOM = require("react-dom");
var {Provider} = require("react-redux");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");

var TodoApp = require("TodoApp");
var BarChart = require("BarChart");
var Main = require("Main");

var actions = require("actions");
var store = require("configureStore").configure();



store.subscribe(() => {
	var state = store.getState();

});

//var state = store.getState();

store.dispatch(actions.setSearchParameters({}));
//store.dispatch(actions.fetchCanonicalQuotations());
store.dispatch(actions.fetchQuotationAuthors());
store.dispatch(actions.fetchExpressionAuthors());
store.dispatch(actions.fetchSearchWorksList());
store.dispatch(actions.fetchExpressionTypes());
store.dispatch(actions.fetchQuotationExpressionTypes());
store.dispatch(actions.fetchQuotationWorksList());
store.dispatch(actions.fetchWorkGroups());
store.dispatch(actions.fetchAuthorTypes());
store.dispatch(actions.fetchChart());




// load foundation
$(document).foundation();

// App css

require('style!css!sass!applicationStyles')
$(document).foundation();

ReactDOM.render(
	<Provider store={store}>
		<Main/>
	</Provider>,
	document.getElementById('app')
);

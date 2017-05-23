var React = require("react");
var ReactDOM = require("react-dom");
var {Provider} = require("react-redux");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");

var TodoApp = require("TodoApp");

var actions = require("actions");
var store = require("configureStore").configure();
var TodoAPI = require("TodoAPI");


store.subscribe(() => {
	var state = store.getState();

	TodoAPI.setTodos(state.todos);

	// upate focus quote block
	if (state.quotations.length > 0){
		function getQuotation(quotation){
			return quotation.focused === true;
		}
		var focusedQuotation = state.quotations.find(getQuotation);
		//var quotations = state.quotations;
		if (focusedQuotation != undefined){
			if (focusedQuotation.id != state.focusedQuotation.id){
				store.dispatch(actions.createFocusedQuotation(focusedQuotation));
			}
		}
	}
	// upate canoncial Quotation on selection from Canonical Quotation List
	// if (state.canonicalQuotations.length > 0){
	// 	function getCanonicalQuotation(quotation){
	// 		return quotation.focused === true;
	// 	}
	// 	var focusedCanonicalQuotation = state.canonicalQuotations.find(getCanonicalQuotation);
	// 	//var quotations = state.quotations;
	// 	if (focusedCanonicalQuotation != undefined){
	// 		if (state.canonicalQuotation == null){
	// 			store.dispatch(actions.createCanonicalQuotation(focusedCanonicalQuotation));
	// 		}
	// 		else if(focusedCanonicalQuotation.id != state.canonicalQuotation.id){
	// 			store.dispatch(actions.createCanonicalQuotation(focusedCanonicalQuotation));
	// 		}
	// 	}
	// }
});




var state = store.getState();

var quotations = TodoAPI.getQuotations(state.canonicalQuotation.id)

store.dispatch(actions.addQuotations(quotations));

var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

//

store.dispatch(actions.fetchCanonicalQuotations());
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

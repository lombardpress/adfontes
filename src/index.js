import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
//import {Route, Router, IndexRoute, hashHistory} from "react-router"

import TodoApp from "./components/TodoApp"
//var BarChart = require("BarChart");
import BarChart from './components/BarChart'
import Main from './components/Main'

import {setSearchParameters, fetchQuotationAuthors, fetchExpressionAuthors, fetchSearchWorksList, fetchExpressionTypes, fetchQuotationExpressionTypes, fetchQuotationWorksList, fetchWorkGroups, fetchAuthorTypes, fetchChart} from './actions/actions'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/app.scss';
var store = require("./store/configureStore").configure();



store.subscribe(() => {
	var state = store.getState();

});

//var state = store.getState();

store.dispatch(setSearchParameters({}));
//store.dispatch(actions.fetchCanonicalQuotations());
store.dispatch(fetchQuotationAuthors());
store.dispatch(fetchExpressionAuthors());
store.dispatch(fetchSearchWorksList());
store.dispatch(fetchExpressionTypes());
store.dispatch(fetchQuotationExpressionTypes());
store.dispatch(fetchQuotationWorksList());
store.dispatch(fetchWorkGroups());
store.dispatch(fetchAuthorTypes());
store.dispatch(fetchChart());




// load foundation
//$(document).foundation();

// App css

//require('style!css!sass!applicationStyles')
//$(document).foundation();

ReactDOM.render(
	<Provider store={store}>
		<Main/>
	</Provider>,
	document.getElementById('root')
);

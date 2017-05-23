var React = require('react');
var uuid = require("node-uuid");
var moment = require("moment");


import TodoList from 'TodoList';
import AddTodo from "AddTodo";
import TodoSearch from "TodoSearch";
import QuotationList from "QuotationList";
import FocusedQuotation from "FocusedQuotation";
import CanonicalQuotation from "CanonicalQuotation";
import CanonicalQuotationList from "CanonicalQuotationList";


var TodoApp = React.createClass({
	render: function(){
		return (
			<div>
				<h1 className='page-title'>Quotation App</h1>
				<div className="row">
					<div className="column small-3 medium-3 large-3">
						<CanonicalQuotationList/>
					</div>
					<div className="column small-3 medium-3 large-3">
						<QuotationList/>
					</div>
					<div className="column small-6 medium-6 large-6">
						<div className="container">
							<CanonicalQuotation/>
							<FocusedQuotation/>
						</div>
					</div>

				</div>
			</div>
		)
	}
});

module.exports = TodoApp;

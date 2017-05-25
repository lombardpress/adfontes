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
import ManifestationQuotationList from "ManifestationQuotationList";


var TodoApp = React.createClass({
	render: function(){
		return (
			<div>
				<h1 className='page-title'>Quotation App</h1>
				<div className="wrapper">
					<div id="CanonicalQuotationList" className="column1">
						<CanonicalQuotationList/>
					</div>
					<div className="column2">
						<QuotationList/>
					</div>
					<div className="column3">
						<ManifestationQuotationList/>
					</div>
					<div className="column4">
							<CanonicalQuotation/>
							<FocusedQuotation/>

					</div>

				</div>
			</div>
		)
	}
});

module.exports = TodoApp;

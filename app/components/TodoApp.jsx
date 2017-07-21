var React = require('react');
var uuid = require("node-uuid");
var moment = require("moment");


import TodoList from 'TodoList';
import AddTodo from "AddTodo";
import TodoSearch from "TodoSearch";
import Search from "Search";
import QuotationList from "QuotationList";
import FocusedQuotation from "FocusedQuotation";
import CanonicalQuotation from "CanonicalQuotation";
import CanonicalQuotationList from "CanonicalQuotationList";
import ManifestationQuotationList from "ManifestationQuotationList";
import Paragraph from "Paragraph";


var TodoApp = React.createClass({
	render: function(){
		return (
			<div>
				<h1 className='page-title'>SCTA Quotation App</h1>
				<div className='search'>
					<Search/>
				</div>
				<div className="wrapper">
					<div id="CanonicalQuotationList" className="column1">
						<CanonicalQuotationList/>
					</div>
					<div id="quotationsList" className="column2">
						<QuotationList/>
					</div>
					<div id="ManifestationQuotationsList" className="column3">
						<ManifestationQuotationList/>
					</div>
					<div className="column4">
						<Paragraph/>
						{/* <FocusedQuotation/>
						<CanonicalQuotation/> */}
					</div>

				</div>
			</div>
		)
	}
});

module.exports = TodoApp;

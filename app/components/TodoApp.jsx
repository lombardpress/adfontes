var React = require('react');
var uuid = require("node-uuid");
var moment = require("moment");



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
				<div className="wrapper">
					<div className='search column1'>
						<Search/>
					</div>
					<div id="CanonicalQuotationList" className="column2">
						<CanonicalQuotationList/>
					</div>
					<div id="quotationsList" className="column3">
						<QuotationList/>
					</div>
					<div id="ManifestationQuotationsList" className="column4">
						<ManifestationQuotationList/>
					</div>
					<div className="column5">
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

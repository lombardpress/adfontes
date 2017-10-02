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
				<h3 className='page-title'>Scholastic Quotation Explorer</h3>
				<div className='page-header'>
					<p>A <a href="http://lombardpress.org">LombardPress</a> Publication | Powerd by Data from the <a href="https://scta.info">Scholastic Commentaries and Text Archive</a></p>
					<p>Designed by <a href="http://jeffreycwitt.com">Jeffrey C. Witt</a></p>
				</div>
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

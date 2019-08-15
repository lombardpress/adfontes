import React from 'react';
var {connect} = require('react-redux');

class CanonicalQuotation extends React.Component{
	render(){
    var {canonicalQuotation} = this.props;
		var displayQuotation = canonicalQuotation ? canonicalQuotation.quotation : "No canonical quotation id assigned";
		var displayQuotationId = canonicalQuotation ? canonicalQuotation.id : "";
		var citation = canonicalQuotation ? canonicalQuotation.citation : "";

		//var {quotation} = canonicalQuotation

		return(
			<div className="container">
				<p>Canonical Quotation: {displayQuotation}</p>
				<p>{citation}</p>
				<p><a href={displayQuotationId}>{displayQuotationId}</a></p>
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(CanonicalQuotation);

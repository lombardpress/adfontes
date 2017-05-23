var React = require('react');
var {connect} = require('react-redux');

export var CanonicalQuotation = React.createClass({
	render: function(){
    var {canonicalQuotation} = this.props;
		var displayQuotation = canonicalQuotation ? canonicalQuotation.quotation : "No canonical quotation id assigned"
		//var {quotation} = canonicalQuotation

		return(
			<div>
				<p>Canonical Quotation: {displayQuotation}</p>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(CanonicalQuotation);

var React = require('react');
var {connect} = require('react-redux');

export var CanonicalQuotation = React.createClass({
	render: function(){
    var {canonicalQuotation} = this.props;
		var {quotation} = canonicalQuotation

		return(
			<div>
				<p>Canonical Quotation: {quotation}</p>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(CanonicalQuotation);

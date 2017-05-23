var React = require('react');
var {connect} = require('react-redux');

export var FocusedQuotation = React.createClass({
	render: function(){
    var {focusedQuotation} = this.props;
		var {quotation} = focusedQuotation

		return(
			<div>
				<p>Focused Quotation: {quotation}</p>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(FocusedQuotation);

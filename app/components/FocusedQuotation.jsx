var React = require('react');
var {connect} = require('react-redux');

export var FocusedQuotation = React.createClass({
	render: function(){
    var {focusedQuotation} = this.props;
		var {quotation} = focusedQuotation
		var {id} = focusedQuotation

		return(
			<div>
				<p>Focused Quotation: {quotation}</p>
				<a href={id}>{id}</a>
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(FocusedQuotation);

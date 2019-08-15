import React from 'react'
var {connect} = require('react-redux');

class FocusedQuotation extends React.Component{
	render(){
    var {focusedQuotation} = this.props;
		var {quotation} = focusedQuotation
		var {id} = focusedQuotation

		return(
			<div className="container">
				<p>Focused Quotation: {quotation}</p>
				<p><a href={id}>{id}</a></p>
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(FocusedQuotation);

var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



export var Quotation = React.createClass({
	handleOnClick: function(){
		var {quotation, dispatch} = this.props;
		dispatch(actions.changeQuotationsFocus(this.props.id));
	},
	render: function(){
    var {quotation, className} = this.props
    return(
			<p className={className} onClick={this.handleOnClick}>{quotation}</p>
		)
	}
});

export default connect()(Quotation);

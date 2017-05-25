var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



export var ManifestationQuotationListItem = React.createClass({
	handleOnClick: function(){
		// var {id, quotation, dispatch} = this.props;
		// dispatch(actions.changeCanonicalQuotationsFocus(this.props.id));
		// var quotationObject = {
		// 	id,
		// 	quotation
		// }
		// dispatch(actions.createCanonicalQuotation(quotationObject));
		// // doesn't seem like the way to do it, because this dispatch might get of sync.
		// //The second one requires the state to be set by the first
		// // should be done in subscribe, but I'm not sure how yet
		// dispatch(actions.fetchQuotations());
		// dispatch(actions.clearQuotationFocus());
	},
	render: function(){
    var {id, quotation, className} = this.props
    return(
			<p id={id} className={className} onClick={this.handleOnClick}>{quotation}</p>
		)
	}
});

export default connect()(ManifestationQuotationListItem);

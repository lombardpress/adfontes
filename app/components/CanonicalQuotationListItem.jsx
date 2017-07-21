var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



export var CanonicalQuotationListItem = React.createClass({
	handleOnClick: function(){
		var {id, quotation, citation, dispatch} = this.props;
		dispatch(actions.changeCanonicalQuotationsFocus(this.props.id));
		var quotationObject = {
			id,
			quotation,
			citation
		}
		dispatch(actions.createCanonicalQuotation(quotationObject));
		// doesn't seem like the way to do it, because this dispatch might get of sync.
		//The second one requires the state to be set by the first
		// should be done in subscribe, but I'm not sure how yet
		dispatch(actions.fetchQuotations());
		dispatch(actions.clearQuotationsFocus());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearManifestationQuotations());
		dispatch(actions.clearParagraph());

		var selfTopPos = document.getElementById(id).offsetTop;
		$('#CanonicalQuotationList').animate({ scrollTop: selfTopPos-10 }, 400);
	},
	render: function(){
    var {id, quotation, className, citation} = this.props
    return(
			<p id={id} className={className} onClick={this.handleOnClick}>{quotation}
				<br/>
			  <em>-- {citation}</em></p>
		)
	}
});

export default connect()(CanonicalQuotationListItem);

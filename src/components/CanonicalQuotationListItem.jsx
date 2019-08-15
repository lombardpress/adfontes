import React from 'react'
import $ from 'jquery';
var {connect} = require('react-redux');
var actions = require('../actions/actions');



class CanonicalQuotationListItem extends React.Component{
	constructor(props){
		super(props)
		this.handleOnClick = this.handleOnClick.bind(this)
	}
	handleOnClick(){
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
	}
	render(){
    var {id, quotation, className, citation} = this.props
    return(
			<div className="quotation-wrapper">
				<p id={id} className={className} onClick={this.handleOnClick}>{quotation}</p>
				<a href={id} target="_blank" className="quotation-citation">{citation}</a>
			</div>
		)
	}
}

export default connect()(CanonicalQuotationListItem);

import React from 'react'
import $ from 'jquery';
var {connect} = require('react-redux');
var actions = require('../actions/actions');



class Quotation extends React.Component{
	constructor(props){
		super(props)
		this.handleOnClick = this.handleOnClick.bind(this)
	}
	handleOnClick(){
		var {isInstanceOf, id, quotation, dispatch, source} = this.props;
		dispatch(actions.changeQuotationsFocus(this.props.id));
		var newFocusedQuotationObject = {
			id,
			quotation,
			source,
			type: "expression"
		}
		// example of why all these different dispatches called here might be a problem
		//fetchParagraph() requires that the createFocusedQuotation() is set.
		//seems to be working as is, but i'm not sure if this is the best way
		dispatch(actions.createFocusedQuotation(newFocusedQuotationObject));
		dispatch(actions.fetchParagraph());
		dispatch(actions.fetchSourceParagraph());
		//dispatch(actions.fetchSourceParagraph());
		//this fetch also seems to rely on focusedQuotation state being set.
		// seems to work as is though
		dispatch(actions.fetchManifestationQuotations());


		if (isInstanceOf != null){
			// create canonicalQuotation
			var canonicalQuotationObject = this.props.canonicalQuotations.find((quotation) => {
				return quotation.id === isInstanceOf

			});

			if (canonicalQuotationObject != undefined){
				dispatch(actions.createCanonicalQuotation(canonicalQuotationObject));
				// focus canonicalquotation List Item
				dispatch(actions.changeCanonicalQuotationsFocus(isInstanceOf));
				// scroll
				var topPos = document.getElementById(isInstanceOf).offsetTop;
				$('#CanonicalQuotationList').animate({ scrollTop: topPos-10 }, 400);
				//scroll self to top
				var selfTopPos = document.getElementById(id).offsetTop;
				$('#quotationsList').animate({ scrollTop: selfTopPos-10 }, 400);
			}
			else{
				alert("this quotation is assigned to a canonicalQuotation, but either there is an error in the id assigned or a canonicalQuotation record still needs to be made")
				dispatch(actions.clearCanonicalQuotationsFocus());
				dispatch(actions.clearCanonicalQuotation());
			}

		}
		else{
			dispatch(actions.clearCanonicalQuotationsFocus());
			dispatch(actions.clearCanonicalQuotation());

		}



	}
	render(){

		var {isInstanceOf, quotation, className, title, author, id, refText, citation} = this.props;

		var className = isInstanceOf === null ? className + " isNotInstance" : className;

		return(
			<div className="quotation-wrapper">
				<p id={id} className={className} onClick={this.handleOnClick}>
				{quotation}
				</p>
				<a href={id} target="_blank" className="quotation-citation">{author}, {title}</a>
				<a href={id} target="_blank" className="quotation-citation">Original Ref: {refText}</a>
				<a href={id} target="_blank" className="quotation-citation">Modern Citation: {citation}</a>
			</div>


		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(Quotation);

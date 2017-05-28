var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



export var Quotation = React.createClass({
	handleOnClick: function(){
		var {isInstanceOf, id, quotation, dispatch} = this.props;
		dispatch(actions.changeQuotationsFocus(this.props.id));
		var newFocusedQuotationObject = {
			id,
			quotation,
			type: "expression"
		}
		// example of why all these different dispatches called here might be a problem
		//fetchParagraph() requires that the createFocusedQuotation() is set.
		//seems to be working as is, but i'm not sure if this is the best way
		dispatch(actions.createFocusedQuotation(newFocusedQuotationObject));
		dispatch(actions.fetchParagraph());
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



	},
	render: function(){
		var {isInstanceOf, quotation, className, id} = this.props;

		var className = isInstanceOf === null ? className + " isNotInstance" : className;

		return(
				<p id={id} className={className} onClick={this.handleOnClick}>
				{quotation}
				</p>


		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(Quotation);

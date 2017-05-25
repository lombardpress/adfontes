var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



export var Quotation = React.createClass({
	handleOnClick: function(){
		var {isInstanceOf, id, quotation, dispatch} = this.props;
		dispatch(actions.changeQuotationsFocus(this.props.id));
		var newFocusedQuotationObject = {
			id,
			quotation
		}
		dispatch(actions.createFocusedQuotation(newFocusedQuotationObject));

		if (isInstanceOf != null){
			// create canonicalQuotation
			//var canonicalQuotationText = document.getElementById(isInstanceOf).value;

			//function getQuotation(id){
				//return quotation.id === true;
		//}
			var canonicalQuotationObject = this.props.canonicalQuotations.find((quotation) => {
				return quotation.id === isInstanceOf

			});
			console.log("isInstanceOf", isInstanceOf)
			if (canonicalQuotationObject != undefined){
				dispatch(actions.createCanonicalQuotation(canonicalQuotationObject));

				// focus canonicalquotation List Item
				dispatch(actions.changeCanonicalQuotationsFocus(isInstanceOf));
				// scroll
				console.log(this.props)
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
		var {isInstanceOf, quotation, className} = this.props;

		var className = isInstanceOf === null ? className + " isNotInstance" : className;

		return(
				<p className={className} onClick={this.handleOnClick}>
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

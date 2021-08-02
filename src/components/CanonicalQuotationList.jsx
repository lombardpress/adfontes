import React from 'react';
import {connect} from 'react-redux'
import CanonicalQuotationListItem from "./CanonicalQuotationListItem"

var actions = require('../actions/actions');
//TODO: this component should be deleted
class CanonicalQuotationList extends React.Component{
	constructor(props){
		super(props)
		this.handleOnShowQuotationsWithoutAssociation = this.handleOnShowQuotationsWithoutAssociation.bind(this)
	}
	handleOnShowQuotationsWithoutAssociation(e){
		e.preventDefault();
		var {dispatch} = this.props;
		var searchText = this.refs.searchText.value;

		dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearParagraph());
		//dispatch(actions.clearCanonicalQuotationsFocus());
		//TODO change app so that searchText does need to be passed as parameters
		//but is retrieved from the searchState
		dispatch(actions.fetchCanonicalQuotations(searchText));
		dispatch(actions.fetchQuotations(searchText));
		//dispatch(actions.fetchManifestationQuotations(searchText));
	}
	render(){
    var {canonicalQuotations} = this.props;
		var renderQuotations = () => {
      if (canonicalQuotations.length === 0){
        return(
            <p className="container__message">No Quotations</p>
        );
      }

      return canonicalQuotations.map( (quotation) => {
				var quotationClass = quotation.focused ? "quotation focused" : "quotation"
				//var quotationClass = "quotation"
        return (
					<CanonicalQuotationListItem className={quotationClass} key={quotation.id} {...quotation}/>
        );
      });
    };

		return(
			<div>
				<p>List of Canonical Quotations</p>
				<p>Count {canonicalQuotations.length}</p>
				{renderQuotations()}
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(CanonicalQuotationList);

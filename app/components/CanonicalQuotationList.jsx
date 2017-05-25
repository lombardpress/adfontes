var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

import CanonicalQuotationListItem from "CanonicalQuotationListItem"

export var CanonicalQuotationList = React.createClass({
	handleOnShowQuotationsWithoutAssociation: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		var searchText = this.refs.searchText.value;

		dispatch(actions.clearCanonicalQuotation());
		//dispatch(actions.clearCanonicalQuotationsFocus());
		dispatch(actions.fetchCanonicalQuotations(searchText));
		dispatch(actions.fetchQuotations(searchText));
		dispatch(actions.fetchManifestationQuotations(searchText));
	},
	render: function(){
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

				<input type="text" ref="searchText" onChange={this.handleOnShowQuotationsWithoutAssociation}  placeholder="Show Quotations"/>

				<p>Count {canonicalQuotations.length}</p>
				{renderQuotations()}
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(CanonicalQuotationList);

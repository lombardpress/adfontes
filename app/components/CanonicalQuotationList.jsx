var React = require('react');
var {connect} = require('react-redux');

import CanonicalQuotationListItem from "CanonicalQuotationListItem"

export var CanonicalQuotationList = React.createClass({
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

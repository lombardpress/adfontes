var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

import ManifestationQuotationListItem from "ManifestationQuotationListItem"

export var ManifestationQuotationList = React.createClass({
	render: function(){
    var {manifestationQuotations} = this.props;
    var renderQuotations = () => {
      if (manifestationQuotations.length === 0){
        return(
            <p className="container__message">No Quotations</p>
        );
      }

      return manifestationQuotations.map( (quotation) => {
				var quotationClass = quotation.focused ? "quotation focused" : "quotation"
				//var quotationClass = "quotation"
        return (

          <ManifestationQuotationListItem className={quotationClass} key={quotation.id} {...quotation}/>
        );
      });
    };

		return(
			<div>
				<p>List of Manifestation Quotations</p>
        <p>Count {manifestationQuotations.length}</p>
        {renderQuotations()}
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(ManifestationQuotationList);

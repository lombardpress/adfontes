var React = require('react');
var {connect} = require('react-redux');

import Quotation from "Quotation"

export var QuotationList = React.createClass({
	render: function(){
    var {quotations, focusedQuotation} = this.props;
    var renderQuotations = () => {
      if (quotations.length === 0){
        return(
            <p className="container__message">Nothing Quotations</p>
        );
      }

      return quotations.map( (quotation) => {
				var quotationClass = quotation.id === focusedQuotation.id ? "quotation focused" : "quotation"
        return (

          <Quotation className={quotationClass} key={quotation.id} {...quotation}/>
        );
      });
    };

		return(
			<div>
				<p>List of Quotation Instances</p>
				{renderQuotations()}
			</div>
		)
	}
});

export default connect(
	(state) => {
		return state
	}
)(QuotationList);

var React = require('react');
var {connect} = require('react-redux');

import Quotation from "Quotation"

export var QuotationList = React.createClass({
	render: function(){
    var {quotations, focusedQuotation} = this.props;
    var renderQuotations = () => {
      if (quotations.length === 0){
        return(
            <p className="container__message">No Quotations</p>
        );
      }

      return quotations.map( (quotation) => {
				var quotationClass = quotation.focused ? "quotation focused" : "quotation"
        return (

          <Quotation className={quotationClass} key={quotation.id} {...quotation}/>
        );
      });
    };

		return(
			<div>
				<p>List of Expression Quotations</p>
				<p>Count {quotations.length}</p>
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

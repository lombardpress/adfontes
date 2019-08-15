import React from 'react';
import {connect} from 'react-redux';

import Quotation from "./Quotation"

class QuotationList extends React.Component{
	render(){
    var {quotations, focusedQuotation} = this.props;
    var renderQuotations = () => {
			if (quotations === "fetching"){
				return <p>Fetching...</p>
			}
			else if (quotations.length === 0){
        return(
            <p className="container__message">No Quotations</p>
        );
      }
			else {
				return quotations.map( (quotation) => {
					//var quotationClass = quotation.focused ? "quotation focused" : "quotation"
					let quotationClass = ""
					if (focusedQuotation.id){
						if (focusedQuotation.id.includes(quotation.id)){
							quotationClass = "quotation focused"
						}
						else{
							quotationClass = "quotation"
						}
					}
					else{
						quotationClass = "quotation"
					}
					var refType = quotation.refType
					var classes = quotationClass + " " + quotation.refType
	        return (

	          <Quotation className={classes} key={quotation.id} {...quotation}/>
	        );
	      });
			}
    };

		return(
			<div>
				<p>List of Expression Quotations</p>
				{this.props.quotations !== "fetching" && <p>Count {quotations.length}</p>}
				{renderQuotations()}
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(QuotationList);

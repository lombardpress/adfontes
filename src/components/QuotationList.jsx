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
				return quotations.map( (quotation, idx) => {
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
					
          //NOTE: in the return statement below react complains of duplicate keys with out the addition of the ids
          //this could suggest duplicate quotation results. But I don't see any duplicates at the moment
          //adding the idx removes the warning; but the reason for the warning is still unclear.
	        return (

	          <Quotation className={classes} key={idx + "-" + quotation.id} {...quotation}/>
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

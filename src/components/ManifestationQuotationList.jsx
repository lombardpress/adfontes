import React from 'react'
import {connect} from 'react-redux';


import ManifestationQuotationListItem from "./ManifestationQuotationListItem"
var actions = require('../actions/actions');

class ManifestationQuotationList extends React.Component{
	render(){
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
        <p>Count {manifestationQuotations.length}
          {(manifestationQuotations[0] && manifestationQuotations[0].isManifestationOf) &&
          <>
            | <a href={"https://lombardpress.org/collation-vizualizer/collatexView.html?id=" + manifestationQuotations[0].isManifestationOf} target="_blank">Collation </a>
            | <a href={"https://mirador.scta.info/?blockid=" + manifestationQuotations[0].isManifestationOf} target="_blank">
              <img alt="view in mirador" src="https://projectmirador.org/img/mirador-logo.svg" style={{width: "12px", height: "12px"}}/>
            </a>
          </>
          }
        </p>
        {renderQuotations()}
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(ManifestationQuotationList);

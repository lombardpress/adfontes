import React from 'react'
import {connect} from 'react-redux';
import { CollationTable } from '@jeffreycwitt/lbp2.collation-table';

import ManifestationQuotationListItem from "./ManifestationQuotationListItem"
var actions = require('../actions/actions');

class ManifestationQuotationList extends React.Component{
  constructor(props){
    super(props)
    this.handleToggleCollation = this.handleToggleCollation.bind(this)
    this.state = {
      showCollation: false
    }
  }
  handleToggleCollation(){
    console.log("firing")
    this.setState((prevState) => {
      console.log("prevState", prevState.showCollation)
      return {
        showCollation: !prevState.showCollation
      }
    })

  }

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
            | <span className="link" onClick={this.handleToggleCollation}>Collation</span>
            | 
            <a href={"https://mirador.scta.info/?blockid=" + manifestationQuotations[0].isManifestationOf} target="_blank">
              <img alt="view in mirador" src="https://projectmirador.org/img/mirador-logo.svg" style={{width: "12px", height: "12px"}}/>
            </a>
          </>
          }
        </p>
        {renderQuotations()}
        {this.state.showCollation &&
        <div id="collationWrapper" className={"iww-big"}>
          <span onClick={this.handleToggleCollation}>x</span>
          {manifestationQuotations[0] && <CollationTable expressionIds={[manifestationQuotations[0].isManifestationOf]}></CollationTable>}
        </div>
        }
			</div>
		)
	}
}

export default connect(
	(state) => {
		return state
	}
)(ManifestationQuotationList);

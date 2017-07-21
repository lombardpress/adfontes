var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Search = React.createClass({
  handleOnShowQuotationsWithoutAssociation: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		var searchText = this.refs.searchText.value;
    var quotationType = this.refs.quotationType.value;
    var expressionId = this.refs.expressionId.value;
    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      quotationType,
      expressionId
    }
    console.log(retainCanonical);
    dispatch(actions.setSearchParameters(searchParameters));

		if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearParagraph());
		//dispatch(actions.clearCanonicalQuotationsFocus());
		if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations(searchText));
		dispatch(actions.fetchQuotations(searchText));
		//dispatch(actions.fetchManifestationQuotations(searchText, quotationType, expressionId));
	},
	render: function(){
		return(
      <form onSubmit={this.handleOnShowQuotationsWithoutAssociation}>
        <div className="row">
          <div className="small-4 columns">
            <label>Search Text
              <input type="text" ref="searchText" placeholder="search text" onChange={this.handleOnShowQuotationsWithoutAssociation}/>
            </label>
          </div>
          <div className="small-4 columns">
            <label>Filter by Quotation Type
              <select ref="quotationType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                <option value="">All</option>
                <option value="biblical">Biblical</option>
                <option value="Classical">Classical</option>
                <option value="Patristic">Patristic</option>
                <option value="Scholastic">scholastic</option>
              </select>
            </label>
          </div>
          <div className="small-4 columns">
            <label>Filter by Work
              <select ref="expressionId" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                <option value="">All</option>
                <option value="plaoulcommentary">Plaoul Commentary</option>
                <option value="lombardsententia">Lombard Sententia</option>
                <option value="summahalensis">Summa Halensis</option>
                <option value="graciliscommentary">Gracilis Commentary</option>
                <option value="liberextra">Liber Extra</option>
                <option value="rothwellcommentary">Rothwell Commentary</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="small-4 columns">
            <label><input id="checkbox1" ref="retainCanonical" type="checkbox"/>Restrict Search to Selected Canonical Quotation</label>

          </div>
        </div>
        {/*
          <div className="small-3 columns">
            <br/>
            <button className="button expanded">Search</button>
          </div> */}

      </form>


		)
	}
});

export default connect()(Search);

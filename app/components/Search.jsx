var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Search = React.createClass({
  handleOnShowQuotationsWithoutAssociation: function(e){
		e.preventDefault();
		var {dispatch, search} = this.props;
		var searchText = this.refs.searchText.value;
    var quotationType = this.refs.quotationType.value;
    var expressionId = this.refs.expressionId.value;
    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      quotationType,
      expressionId,
      searchWorks: search.searchWorks
    }

    dispatch(actions.setSearchParameters(searchParameters));

		if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearParagraph());
		//dispatch(actions.clearCanonicalQuotationsFocus());
		if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
		dispatch(actions.fetchQuotations());
		//dispatch(actions.fetchManifestationQuotations(searchText, quotationType, expressionId));
    dispatch(actions.clearManifestationQuotations());
	},
	render: function(){
    var _this = this;
    function displaySearchWorksList(){
      var searchWorks = _this.props.search.searchWorks
      return searchWorks.map((work) => {
        return(
          <option value={work.expressionShortId}>{work.expressionTitle}</option>
          )
        }
      )
    }
    return(
      <div>
        <p>Search Parameters</p>
        <form onSubmit={this.handleOnShowQuotationsWithoutAssociation}>
          <div>
            <div>
              <label>Search Text
                <input type="text" ref="searchText" placeholder="search text" onChange={this.handleOnShowQuotationsWithoutAssociation}/>
              </label>
            </div>
            <div>
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
            <div>
              <label>Filter by Work
                <select ref="expressionId" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displaySearchWorksList()}
                </select>
              </label>
            </div>
            <div>
              <label><input id="checkbox1" ref="retainCanonical" type="checkbox"/>Restrict Search to Selected Canonical Quotation</label>
            </div>
          </div>
          {/*
            <div className="small-3 columns">
              <br/>
              <button className="button expanded">Search</button>
            </div> */}

        </form>
      </div>


		)
	}
});

export default connect(
  (state) => {
		return state
	}
)(Search);

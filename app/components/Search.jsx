var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Search = React.createClass({
  handleOnShowQuotationsWithoutAssociation: function(e){
		e.preventDefault();
		var {dispatch, search} = this.props;
		var searchText = this.refs.searchText.value;
    var quotationType = this.refs.quotationType.value;
    var quotationWork = this.refs.quotationWork.value;
    var expressionId = this.refs.expressionId.value;
    var quotationAuthor = this.refs.expressionId.value;
    var expressionType = this.refs.expressionType.value;
    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      quotationType,
      expressionId,
      quotationAuthor,
      quotationWork,
      expressionType
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
      var searchWorks = _this.props.search.searchWorks;
      return searchWorks.map((work) => {
        return(
          <option value={work.expressionShortId}>{work.expressionTitle}</option>
          )
        }
      )
    }
    function displayQuotationWorksList(){
      var quotationWorksList = _this.props.search.quotationWorksList;
      return quotationWorksList.map((work) => {
        var id = work.expressionShortId ? work.expressionShortId : work.expression.split("http://scta.info/resource/")[1];
        return(
          <option value={id}>{work.expressionTitle}</option>
          )
        }
      )
    }
    function displayAuthorsList(){
      var authors = _this.props.search.authors;
      return authors.map((author) => {
        return(
          <option value={author.authorShortId}>{author.authorTitle}</option>
          )
        }
      )
    }
    function displayExpressionTypeList(){
      var expressionTypes = _this.props.search.expressionTypes;
      return expressionTypes.map((type) => {
        return(
          <option value={type.expressionTypeShortId}>{type.expressionTypeTitle}</option>
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
              <label>Filter by Quotation Author
                <select ref="quotationAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayAuthorsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Work
                <select ref="quotationWork" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayQuotationWorksList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Author
                <select ref="expressionId" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayAuthorsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Type
                <select ref="expressionType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayExpressionTypeList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Title
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

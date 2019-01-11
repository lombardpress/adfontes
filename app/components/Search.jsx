var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Search = React.createClass({
  handleOnShowQuotationsWithoutAssociation: function(e){
		e.preventDefault();
		var {dispatch, search} = this.props;
		var searchText = this.refs.searchText.value;
    var quotationWorkGroup = this.refs.quotationWorkGroup.value;
    var quotationExpressionType = this.refs.quotationExpressionType.value;
    var quotationWork = this.refs.quotationWork.value;
    var quotationWorkPart = this.refs.quotationWorkPart.value
    var expressionId = this.refs.expressionId.value;
    var expressionPart = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[0] : this.refs.expressionPart.value
    var expressionLevel = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[1] : 1 ;
    var expressionAuthor = this.refs.expressionAuthor.value;
    var expressionAuthorType = this.refs.expressionAuthorType.value;
    var quotationAuthor = this.refs.quotationAuthor.value;
    var quotationAuthorType = this.refs.quotationAuthorType.value;
    var expressionType = this.refs.expressionType.value;
    var workGroup = this.refs.workGroup.value;
    var quotationAuthorDateAfter = this.refs.quotationAuthorDateAfter.value;
    var quotationAuthorDateBefore = this.refs.quotationAuthorDateBefore.value;
    var expressionAuthorDateAfter = this.refs.expressionAuthorDateAfter.value;
    var expressionAuthorDateBefore = this.refs.expressionAuthorDateBefore.value;
    var structureElementType = this.refs.structureElementType.value;

    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      expressionId,
      expressionPart,
      expressionLevel,
      expressionAuthor,
      quotationAuthor,
      quotationExpressionType,
      quotationWork,
      quotationWorkPart,
      quotationWorkGroup,
      quotationAuthorType,
      expressionAuthorType,
      expressionType,
      workGroup,
      quotationAuthorDateAfter,
      quotationAuthorDateBefore,
      expressionAuthorDateAfter,
      expressionAuthorDateBefore,
      structureElementType

    }

    dispatch(actions.setSearchParameters(searchParameters));
    //search filters options update
    dispatch(actions.fetchQuotationWorkParts());
    dispatch(actions.fetchExpressionParts());
    dispatch(actions.fetchSearchWorksList());
    dispatch(actions.fetchQuotationWorksList());
    dispatch(actions.fetchQuotationAuthors());
    dispatch(actions.fetchExpressionAuthors());
    //fetch expression types, should adjust based on types that would apply for a select work group author or expression
    // there are no filters for this yet
    //dispatch(actions.fetchExpressionTypes());

    // actually quotation query Actions
    // comment these out, if you want to add search button and turn off automatic
    // on change search <button id="runQuery" onClick={this.handleRunQuery}>Search</button>
    if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearParagraph());
		if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
		dispatch(actions.fetchQuotations());
		dispatch(actions.clearManifestationQuotations());
    dispatch(actions.fetchChart());
},
  handleRunQuery: function(e){
		e.preventDefault();
		var {dispatch, search} = this.props;
		var searchText = this.refs.searchText.value;
    var quotationWorkGroup = this.refs.quotationWorkGroup.value;
    var quotationWork = this.refs.quotationWork.value;
    var quotationWorkPart = this.refs.quotationWorkPart.value
    var expressionId = this.refs.expressionId.value;
    var expressionPart = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[0] : this.refs.expressionPart.value
    var expressionLevel = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[1] : 1 ;
    var expressionAuthor = this.refs.expressionAuthor.value;
    var expressionAuthorType = this.refs.expressionAuthorType.value;
    var quotationAuthor = this.refs.quotationAuthor.value;
    var quotationAuthorType = this.refs.quotationAuthorType.value;
    var expressionType = this.refs.expressionType.value;
    var quotationExpressionType = this.refs.quotationExpressionType.value;
    var workGroup = this.refs.workGroup.value;

    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      expressionId,
      expressionPart,
      expressionLevel,
      expressionAuthor,
      quotationAuthor,
      quotationExpressionType,
      quotationWork,
      quotationWorkPart,
      quotationWorkGroup,
      quotationAuthorType,
      expressionAuthorType,
      expressionType,
      workGroup
    }

    if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
    dispatch(actions.clearManifestationQuotations());
		dispatch(actions.clearParagraph());
		if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
		dispatch(actions.fetchQuotations());
		dispatch(actions.fetchChart());
	},
  handleClearFilters: function(e){
    e.preventDefault();
    var {dispatch, search} = this.props;
    dispatch(actions.clearSearchParameters());
    dispatch(actions.clearCanonicalQuotations());
    dispatch(actions.clearQuotations());

    dispatch(actions.fetchExpressionParts());
    //dispatch(actions.fetchCanonicalQuotations());
    dispatch(actions.fetchQuotationAuthors());
    dispatch(actions.fetchExpressionAuthors());
    dispatch(actions.fetchSearchWorksList());
    //store.dispatch(actions.fetchExpressionTypes());
    dispatch(actions.fetchQuotationWorksList());
    dispatch(actions.fetchWorkGroups());
    dispatch(actions.fetchAuthorTypes());
    //dispatch(actions.fetchManifestationQuotations(searchText, quotationType, expressionId));
    dispatch(actions.clearManifestationQuotations());
    this.refs.quotationAuthorDateAfter.value = "";
    this.refs.quotationAuthorDateBefore.value = "";
    this.refs.expressionAuthorDateAfter.value = "";
    this.refs.expressionAuthorDateBefore.value = "";



  },
  handleGraph: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.toggleGraphDisplay(this.props.chart.visible));
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
    function displayQuotationWorkPartsParent(){
      var quotationWorkParts = _this.props.search.quotationWorkParts;
      if (quotationWorkParts){
        var part = quotationWorkParts[0];
        if (part){
          var parentid = part.parent.split("http://scta.info/resource/")[1];
          return(
            <option value={parentid}>Current: {part.parent_title}</option>
          )
        }
      }
    }
    function displayQuotationWorkPartsGrandparent(){
      var quotationWorkParts = _this.props.search.quotationWorkParts;
      if (quotationWorkParts){
        var part = quotationWorkParts[0];
        if (part){
          var grandparentid = part.grandparent.split("http://scta.info/resource/")[1];
          if (grandparentid != undefined){
            return(
              <option value={grandparentid}>Up: {part.grandparent_title}</option>
            )
          }
        }
      }
    }
    function displayQuotationWorkParts(){
      var quotationWorkParts = _this.props.search.quotationWorkParts;
      if (quotationWorkParts){
        return quotationWorkParts.map((part) => {
          var id = part.childShortId ? part.childShortId : part.child.split("http://scta.info/resource/")[1];
          if (part.child){
            return(
              <option value={id}>{part.child_title}</option>
              )
            }
          }
        )
      }
    }
    function displayExpressionPartsParent(){
      var expressionParts = _this.props.search.expressionParts;
      if (expressionParts){
        var part = expressionParts[0];
        if (part){
          var parentid = part.parent.split("http://scta.info/resource/")[1];
          return(
            <option value={parentid+ "/" + part.parent_level}>Current: {part.parent_title}</option>
          )
        }
      }
    }
    function displayExpressionPartsGrandparent(){
      var expressionParts = _this.props.search.expressionParts;
      if (expressionParts){
        var part = expressionParts[0];
        if (part){
          var grandparentid = part.grandparent.split("http://scta.info/resource/")[1];
          if (grandparentid != undefined){
            return(
              <option value={grandparentid + "/" + part.grandparent_level}>Up: {part.grandparent_title}</option>
            )
          }
        }
      }
    }
    function displayExpressionParts(){
      var expressionParts = _this.props.search.expressionParts;
      if (expressionParts){
        return expressionParts.map((part) => {
          var id = part.childShortId ? part.childShortId : part.child.split("http://scta.info/resource/")[1];
          if (part.child){
            return(
              <option value={id + "/" + part.child_level}>{part.child_title}</option>
              )
            }
          }
        )
      }
    }

    function displayQuotationAuthorsList(){
      var authors = _this.props.search.quotationAuthors;
      return authors.map((author) => {
        return(
          <option value={author.authorShortId}>{author.authorTitle}</option>
          )
        }
      )
    }
    function displayExpressionAuthorsList(){
      var authors = _this.props.search.expressionAuthors;
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
    function displayQuotationExpressionTypeList(){
      var quotationExpressionTypes = _this.props.search.quotationExpressionTypes;
      return quotationExpressionTypes.map((type) => {
        return(
          <option value={type.quotationExpressionTypeShortId}>{type.quotationExpressionTypeTitle}</option>
          )
        }
      )
    }
    function displayWorkGroupsList(){
      var workGroups = _this.props.search.workGroups;
      return workGroups.map((workGroup) => {
        return(
          <option value={workGroup.workGroupShortId}>{workGroup.workGroupTitle}</option>
          )
        }
      )
    }
    function displayQuotationAuthorTypes(){
      const authorTypes = _this.props.search.authorTypes;
      return authorTypes.map((authorType) => {
        return(
          <option value={authorType.authorTypeShortId}>{authorType.authorTypeTitle}</option>
          )
        }
      )
    }
    function displayExpressionAuthorTypes(){
      const authorTypes = _this.props.search.authorTypes;
      return authorTypes.map((authorType) => {
        return(
          <option value={authorType.authorTypeShortId}>{authorType.authorTypeTitle}</option>
          )
        }
      )
    }
    return(
      <div>
        <form onSubmit={this.handleOnShowQuotationsWithoutAssociation}>
          <div>
            <p>Search Parameters</p>
            <div>
              {
                // turn this on, if you want  add search button turn off automatic
                // on change search
                <button id="runQuery" onClick={this.handleRunQuery}>Run Search</button>
              }

              <button id="clearFilter" onClick={this.handleClearFilters}>Clear Filters</button>
            </div>
            <div>
              <label><input id="checkbox1" ref="retainCanonical" type="checkbox"/>Restrict to Can. Quotation</label>
            </div>
            <div>
              <label>Filter by Quotation/ReferenceType
                <select ref="structureElementType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="structureElementQuote">Quotations</option>
                  <option value="structureElementRef">References</option>
                  <option value="structureElementRefDup">References (With Quotation Overlap)</option>
                  <option value="">All</option>
                  <option value="allDup">All (with quotation overlap)</option>

                </select>
              </label>
            </div>
            <div>
              <label>
                <input type="text" ref="searchText" placeholder="search quotation text" onBlur={this.handleOnShowQuotationsWithoutAssociation}/>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Author Type
                <select ref="quotationAuthorType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayQuotationAuthorTypes()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Author Birth Date:
                <br/>
                After <input ref="quotationAuthorDateAfter" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1200"/>
                <br/>
                Before <input ref="quotationAuthorDateBefore" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1400"/>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Author
                <select ref="quotationAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationAuthor}>
                  <option value="">All</option>
                  {displayQuotationAuthorsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Work Group
                <select ref="quotationWorkGroup" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayWorkGroupsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Expression Type
                <select ref="quotationExpressionType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayQuotationExpressionTypeList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Expression
                <select ref="quotationWork" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWork}>
                  <option value="">All</option>
                  {displayQuotationWorksList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Expression Part
                <select ref="quotationWorkPart" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWorkPart}>
                  <option value="">All</option>
                  {displayQuotationWorkPartsGrandparent()}
                  {displayQuotationWorkPartsParent()}
                  {displayQuotationWorkParts()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Author Type
                <select ref="expressionAuthorType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayExpressionAuthorTypes()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Author Birth Date:
                <br/>
                After <input ref="expressionAuthorDateAfter" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1200"/>
                <br/>
                Before <input ref="expressionAuthorDateBefore" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1400"/>
              </label>
            </div>
            <div>
              <label>Filter by Expression Author
                <select ref="expressionAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionAuthor}>
                  <option value="">All</option>
                  {displayExpressionAuthorsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Work Group
                <select ref="workGroup" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayWorkGroupsList()}
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
                <select ref="expressionId" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionId}>
                  <option value="">All</option>
                  {displaySearchWorksList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Part
                <select ref="expressionPart" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionPart + "/" + _this.props.search.searchParameters.expressionLevel}>
                  <option value="">All</option>
                  {displayExpressionPartsGrandparent()}
                  {displayExpressionPartsParent()}
                  {displayExpressionParts()}
                </select>
              </label>
            </div>
          </div>
        </form>
        <p><a href="#" onClick={this.handleGraph}>Toggle Historgram</a></p>
      </div>


		)
	}
});

export default connect(
  (state) => {
		return state
	}
)(Search);

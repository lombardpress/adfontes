var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var Search = React.createClass({
  handleOnShowQuotationsWithoutAssociation: function(e){
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
    var quotationAuthor = this.refs.quotationAuthor.value;
    //var expressionType = this.refs.expressionType.value;
    var workGroup = this.refs.workGroup.value;

    var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      searchText,
      expressionId,
      expressionPart,
      expressionLevel,
      expressionAuthor,
      quotationAuthor,
      quotationWork,
      quotationWorkPart,
      quotationWorkGroup,
      //expressionType,
      workGroup
    }

    dispatch(actions.setSearchParameters(searchParameters));

    dispatch(actions.fetchQuotationWorkParts());
    dispatch(actions.fetchExpressionParts());
    // if (this.refs.quotationWorkPart.value){
    //   dispatch(actions.fetchQuotationWorkParts(this.refs.quotationWorkPart.value));
    // }
    // else if (this.refs.quotationWork.value){
    //   dispatch(actions.fetchQuotationWorkParts(this.refs.quotationWork.value));
    // }


    dispatch(actions.fetchSearchWorksList());
    dispatch(actions.fetchQuotationWorksList());

		if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		dispatch(actions.clearFocusedQuotation());
		dispatch(actions.clearParagraph());
		//dispatch(actions.clearCanonicalQuotationsFocus());
		if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
		dispatch(actions.fetchQuotations());
		//dispatch(actions.fetchManifestationQuotations(searchText, quotationType, expressionId));
    dispatch(actions.clearManifestationQuotations());
    dispatch(actions.fetchChart());



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
    function displayWorkGroupsList(){
      var workGroups = _this.props.search.workGroups;
      return workGroups.map((workGroup) => {
        return(
          <option value={workGroup.workGroupShortId}>{workGroup.workGroupTitle}</option>
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
              <label><input id="checkbox1" ref="retainCanonical" type="checkbox"/>Restrict Search to Selected Canonical Quotation</label>
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
              <label>Filter by quotation Work Group
                <select ref="quotationWorkGroup" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayWorkGroupsList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Work
                <select ref="quotationWork" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWork}>
                  <option value="">All</option>
                  {displayQuotationWorksList()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Quotation Work Part
                <select ref="quotationWorkPart" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWorkPart}>
                  <option value="">All</option>
                  {displayQuotationWorkPartsGrandparent()}
                  {displayQuotationWorkPartsParent()}
                  {displayQuotationWorkParts()}
                </select>
              </label>
            </div>
            <div>
              <label>Filter by Expression Author
                <select ref="expressionAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayAuthorsList()}
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
            {/* temporarily commenting out <div>
              <label>Filter by Expression Type
                <select ref="expressionType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayExpressionTypeList()}
                </select>
              </label>
            </div> */}
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

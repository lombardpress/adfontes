import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
var {connect} = require('react-redux');
var actions = require('../actions/actions');

class Search extends React.Component{
  constructor(props){
    super(props)
    this.handleSetSearchText = this.handleSetSearchText.bind(this)
    this.handleOnShowQuotationsWithoutAssociation = this.handleOnShowQuotationsWithoutAssociation.bind(this)
    this.handleRunQuery = this.handleRunQuery.bind(this)
    this.handleGraph = this.handleGraph.bind(this)
    this.handleClearFilters = this.handleClearFilters.bind(this)
  }
  handleSetSearchText(e){
    var {dispatch, search} = this.props;
    var searchText = this.refs.searchText.value;
    var searchParameters = {
      ...this.props.search.searchParameters,
      searchText
    }
    dispatch(actions.setSearchParameters(searchParameters));
  }
  handleOnShowQuotationsWithoutAssociation(e){
		e.preventDefault();
		var {dispatch, search} = this.props;
    //var searchText = this.refs.searchText.value;
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

    //var retainCanonical = this.refs.retainCanonical.checked;
    var searchParameters = {
      //searchText,
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

      // if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
  		// dispatch(actions.clearFocusedQuotation());
  		// dispatch(actions.clearParagraph());
  		// if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
  		// dispatch(actions.fetchQuotations());
  		// dispatch(actions.clearManifestationQuotations());
      // dispatch(actions.fetchChart());
    }
  handleRunQuery(e){
		e.preventDefault();
    var {dispatch, search} = this.props;
		// var searchText = this.refs.searchText.value;
    // var quotationWorkGroup = this.refs.quotationWorkGroup.value;
    // var quotationWork = this.refs.quotationWork.value;
    // var quotationWorkPart = this.refs.quotationWorkPart.value
    // var expressionId = this.refs.expressionId.value;
    // var expressionPart = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[0] : this.refs.expressionPart.value
    // var expressionLevel = this.refs.expressionPart.value ? this.refs.expressionPart.value.split("/")[1] : 1 ;
    // var expressionAuthor = this.refs.expressionAuthor.value;
    // var expressionAuthorType = this.refs.expressionAuthorType.value;
    // var quotationAuthor = this.refs.quotationAuthor.value;
    // var quotationAuthorType = this.refs.quotationAuthorType.value;
    // var expressionType = this.refs.expressionType.value;
    // var quotationExpressionType = this.refs.quotationExpressionType.value;
    // var workGroup = this.refs.workGroup.value;

    //var retainCanonical = this.refs.retainCanonical.checked;
    var retainCanonical = false;
    // var searchParameters = {
    //   searchText,
    //   expressionId,
    //   expressionPart,
    //   expressionLevel,
    //   expressionAuthor,
    //   quotationAuthor,
    //   quotationExpressionType,
    //   quotationWork,
    //   quotationWorkPart,
    //   quotationWorkGroup,
    //   quotationAuthorType,
    //   expressionAuthorType,
    //   expressionType,
    //   workGroup
    // }

    
    //TODO: delete; because canonical is not used any more

    // if (!retainCanonical) dispatch(actions.clearCanonicalQuotation());
		
    dispatch(actions.clearFocusedQuotation());
    dispatch(actions.clearManifestationQuotations());
		dispatch(actions.clearParagraph());
    dispatch(actions.clearSourceParagraph());
		
    //TODO: delete; because canonical is not used any more
    //if (!retainCanonical) dispatch(actions.fetchCanonicalQuotations());
		
    dispatch(actions.fetchQuotations());
		dispatch(actions.fetchChart());
	}
  handleClearFilters(e){
    e.preventDefault();
    var {dispatch, search} = this.props;
    dispatch(actions.clearSearchParameters());
    dispatch(actions.clearCanonicalQuotations());
    dispatch(actions.clearQuotations());
    dispatch(actions.fetchQuotationWorkParts());
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
    dispatch(actions.clearParagraph());
    dispatch(actions.clearSourceParagraph());
    this.refs.quotationAuthorDateAfter.value = "";
    this.refs.quotationAuthorDateBefore.value = "";
    this.refs.expressionAuthorDateAfter.value = "";
    this.refs.expressionAuthorDateBefore.value = "";
    this.refs.searchText.value = "";



  }
  handleGraph(e){
		e.preventDefault();
		var {dispatch} = this.props;
		dispatch(actions.toggleGraphDisplay(this.props.chart.visible));
	}
	render(){
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
        <Form onSubmit={this.handleOnShowQuotationsWithoutAssociation}>
          <div>

            <div>
              {
                // turn this on, if you want  add search button turn off automatic
                // on change search
                <Button id="runQuery" onClick={this.handleRunQuery}>Run Search</Button>
              }

              <Button id="clearFilter" onClick={this.handleClearFilters}>Clear Filters</Button>
            </div>
            {
              /*<div>
              <label><input id="checkbox1" ref="retainCanonical" type="checkbox"/>Restrict to Can. Quotation</label>
            </div>
            */
            }
            <div>
            <p>Search Parameters</p>
            <Form.Group>
              <Form.Label>Quotation/ReferenceType</Form.Label>
              <Form.Control as="select" ref="structureElementType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                <option value="structureElementQuote">Quotations</option>
                <option value="structureElementRef">References</option>
                <option value="structureElementRefDup">References (With Quotation Overlap)</option>
                <option value="">All</option>
                <option value="allDup">All (with quotation overlap)</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <Form.Control as="input" type="text" ref="searchText" placeholder="search quotation text" onChange={this.handleSetSearchText}/>
              </Form.Label>
            </Form.Group>
            <hr/>
            <p>Quotation Parameters</p>
            <Form.Group>
            <Form.Label>Quotation Author Type</Form.Label>
              <Form.Control as="select" ref="quotationAuthorType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                <option value="">All</option>
                {displayQuotationAuthorTypes()}
              </Form.Control>

            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Author Birth Date</Form.Label>
              <br/>
              After <Form.Control as="input" ref="quotationAuthorDateAfter" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1200"/>
              <br/>
              Before <Form.Control as="input" ref="quotationAuthorDateBefore" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1400"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Author</Form.Label>
              <Form.Control as="select" ref="quotationAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationAuthor}>
                <option value="">All</option>
                {displayQuotationAuthorsList()}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Work Group</Form.Label>
                <Form.Control as="select" ref="quotationWorkGroup" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayWorkGroupsList()}
                </Form.Control>

            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Text Type</Form.Label>
                <Form.Control as="select" ref="quotationExpressionType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayQuotationExpressionTypeList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Text Title</Form.Label>
                <Form.Control as="select" ref="quotationWork" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWork}>
                  <option value="">All</option>
                  {displayQuotationWorksList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quotation Text Part</Form.Label>
                <Form.Control as="select" ref="quotationWorkPart" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.quotationWorkPart}>
                  <option value="">All</option>
                  {displayQuotationWorkPartsGrandparent()}
                  {displayQuotationWorkPartsParent()}
                  {displayQuotationWorkParts()}
                </Form.Control>
            </Form.Group>
            <hr/>
            <p>Text Parameters</p>
            <Form.Group>
              <Form.Label>Text Author Type</Form.Label>
              <Form.Control as="select" ref="expressionAuthorType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                <option value="">All</option>
                {displayExpressionAuthorTypes()}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Author Birth Date</Form.Label>
              <br/>
              After <Form.Control as="input" ref="expressionAuthorDateAfter" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1200"/>
              <br/>
              Before <Form.Control as="input" ref="expressionAuthorDateBefore" onBlur={this.handleOnShowQuotationsWithoutAssociation} placeholder="e.g. 1400"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Author</Form.Label>
                <Form.Control as="select" ref="expressionAuthor" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionAuthor}>
                  <option value="">All</option>
                  {displayExpressionAuthorsList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Work Group</Form.Label>
                <Form.Control as="select" ref="workGroup" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayWorkGroupsList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Type</Form.Label>
                <Form.Control as="select" ref="expressionType" onChange={this.handleOnShowQuotationsWithoutAssociation}>
                  <option value="">All</option>
                  {displayExpressionTypeList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Title</Form.Label>
                <Form.Control as="select" ref="expressionId" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionId}>
                  <option value="">All</option>
                  {displaySearchWorksList()}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Part</Form.Label>
              <Form.Control as="select" ref="expressionPart" onChange={this.handleOnShowQuotationsWithoutAssociation} value={_this.props.search.searchParameters.expressionPart + "/" + _this.props.search.searchParameters.expressionLevel}>
                <option value="">All</option>
                {displayExpressionPartsGrandparent()}
                {displayExpressionPartsParent()}
                {displayExpressionParts()}
              </Form.Control>
            </Form.Group>
            </div>
          </div>
        </Form>
        <p><a href="#" onClick={this.handleGraph}>Toggle Historgram</a></p>
      </div>


		)
	}
}

export default connect(
  (state) => {
		return state
	}
)(Search);

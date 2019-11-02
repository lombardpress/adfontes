import axios from 'axios';

const sparqlEndpoint = "https://sparql-docker.scta.info/ds/query"
//const sparqlEndpoint = "http://sparql-staging.scta.info/ds/query"
//const sparqlEndpoint = "http://localhost:3030/ds/query"

///search actions
//===============
export var clearSearchParameters = () => {
  return {
    type: "CLEAR_SEARCH_PARAMETERS",
  };
};
export var setSearchParameters = (searchParameters) => {
  return {
    type: "SET_SEARCH_PARAMETERS",
    searchParameters
  };
};
export var startSearchWorksFetch = () => {
  return{
    type: "START_SEARCH_WORKS_FETCH"
  };
};
export var completeSearchWorksFetch = (listOfWorks) => {
  return{
    type: "COMPLETE_SEARCH_WORKS_FETCH",
    listOfWorks
  };
};
export var fetchSearchWorksList = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var workGroupSparql = ""
    if (state.search.searchParameters.workGroup){
      workGroupSparql = [
      "<http://scta.info/resource/" + state.search.searchParameters.workGroup + "> <http://scta.info/property/hasExpression> ?expression ."
      ].join('');
    }
    let expressionAuthorTypeSparql = ""
    if (state.search.searchParameters.expressionAuthorType){
      expressionAuthorTypeSparql = [
      "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?expressionAuthor . ",
      "?expressionAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthorType + "> ."
      ].join('');
    }

    var authorSparql = ""
    if (state.search.searchParameters.expressionAuthor){
      authorSparql = [
      "?expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> ."
      ].join('');
    }
    var query = [
        "SELECT ?type ?expression ?expressionShortId ?expressionTitle ?author ?authorTitle ?workGroup ?workGroupTitle",
        "WHERE { ",
          "?expression a <http://scta.info/resource/expression> .",
          "?expression a ?type .",
          "?expression <http://scta.info/property/level> '1' . ",
          expressionAuthorTypeSparql,
          workGroupSparql,
          authorSparql,
          "?expression <http://scta.info/property/shortId> ?expressionShortId .",
          "?expression <http://scta.info/property/shortId> ?expressionShortId .",
          "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
          "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
          "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
          "?expression <http://purl.org/dc/terms/isPartOf> ?workGroup .",
          "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
          "}",
        "ORDER BY ?expressionTitle"].join('');

  dispatch(startSearchWorksFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var searchWorks = results.map((result) => {
      var workInfo = {
          expression: result.expression.value,
          expressionShortId: result.expressionShortId ? result.expressionShortId.value : "",
          expressionTitle: result.expressionTitle.value,
          workGroup: result.workGroup ? result.workGroup.value : "",
          workGroupTitle: result.workGroupTitle ? result.workGroupTitle.value : "",
          author: result.author ? result.author.value : "",
          authorTitle: result.author ? result.authorTitle.value : "",
          type: result.type.value

        }
        return workInfo

      });
      dispatch(completeSearchWorksFetch(searchWorks));
    });
  }
};

//Begin Quotations Authors Fetch
export var startQuotationAuthorsFetch = () => {
  return{
    type: "START_QUOTATION_AUTHORS_FETCH"
  };
};
export var completeQuotationAuthorsFetch = (authors) => {
  return{
    type: "COMPLETE_QUOTATION_AUTHORS_FETCH",
    authors
  };
};
export var fetchQuotationAuthors = () =>{
  return (dispatch, getState) => {
    var state = getState();
    let quotationAuthorTypeSparql = "";
    if (state.search.searchParameters.quotationAuthorType){

      quotationAuthorTypeSparql = [
      "?author <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.quotationAuthorType + "> ."
      ].join('');
    }
    // Begin Author date sparql filters
    let quotationAuthorDateSparql = "";
    if (state.search.searchParameters.quotationAuthorDateAfter || state.search.searchParameters.quotationAuthorDateBefore){
      quotationAuthorDateSparql = "?author <http://scta.info/property/dateOfBirth> ?dateOfBirth ."
    }
    let quotationAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateAfter){
      quotationAuthorDateAfterSparqlFilter = "FILTER (?dateOfBirth >= '" + state.search.searchParameters.quotationAuthorDateAfter + "')."
    }
    let quotationAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateBefore){
      quotationAuthorDateBeforeSparqlFilter = "FILTER (?dateOfBirth <= '" + state.search.searchParameters.quotationAuthorDateBefore + "')."
    }
    // END author date sparql filter
    var query = [
        "SELECT DISTINCT ?author ?authorTitle ?authorShortId ",
        "WHERE { ",
        "?author a <http://scta.info/resource/person> .",
        quotationAuthorTypeSparql,
        quotationAuthorDateSparql,
        "?resource a <http://scta.info/resource/expression> .",
        "?resource <http://scta.info/property/level> '1' .",
        "?resource <http://www.loc.gov/loc.terms/relators/AUT> ?author .",
        "?author <http://scta.info/property/shortId> ?authorShortId .",
        "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
        quotationAuthorDateAfterSparqlFilter,
        quotationAuthorDateBeforeSparqlFilter,
        "}",
        "ORDER BY ?authorTitle"].join('');
  dispatch(startQuotationAuthorsFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var authors = results.map((result) => {
        var authorInfo = {
          author: result.author.value,
          authorShortId: result.authorShortId.value,
          authorTitle: result.authorTitle.value,
        }
        return authorInfo

      });
      dispatch(completeQuotationAuthorsFetch(authors));
    });
  }
};
// End Quotation Authors Fetch
// Begin Expression Authors Fetch
export var startExpressionAuthorsFetch = () => {
  return{
    type: "START_EXPRESSION_AUTHORS_FETCH"
  };
};
export var completeExpressionAuthorsFetch = (authors) => {
  return{
    type: "COMPLETE_EXPRESSION_AUTHORS_FETCH",
    authors
  };
};
export var fetchExpressionAuthors = () =>{
  return (dispatch, getState) => {
    var state = getState();
    let expressionAuthorTypeSparql = "";
    if (state.search.searchParameters.expressionAuthorType){

      expressionAuthorTypeSparql = [
      "?author <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthorType + "> ."
      ].join('');
    }

    // Begin expression author filter
    let expressionAuthorDateSparql = "";
    if (state.search.searchParameters.expressionAuthorDateAfter || state.search.searchParameters.expressionAuthorDateBefore){
      expressionAuthorDateSparql = "?author <http://scta.info/property/dateOfBirth> ?dateOfBirth ."
    }

    let expressionAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateAfter){
      expressionAuthorDateAfterSparqlFilter = "FILTER (?dateOfBirth >= '" + state.search.searchParameters.expressionAuthorDateAfter + "')."
    }

    let expressionAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateBefore){
      expressionAuthorDateBeforeSparqlFilter = "FILTER (?dateOfBirth <= '" + state.search.searchParameters.expressionAuthorDateBefore + "')."
    }
    // End expression author filter
    var query = [
        "SELECT DISTINCT ?author ?authorTitle ?authorShortId ",
        "WHERE { ",
        "?author a <http://scta.info/resource/person> .",
        expressionAuthorTypeSparql,
        expressionAuthorDateSparql,
        "?resource a <http://scta.info/resource/expression> .",
        "?resource <http://scta.info/property/level> '1' .",
        "?resource <http://www.loc.gov/loc.terms/relators/AUT> ?author .",
        "?author <http://scta.info/property/shortId> ?authorShortId .",
        "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
        expressionAuthorDateAfterSparqlFilter,
        expressionAuthorDateBeforeSparqlFilter,
        "}",
        "ORDER BY ?authorTitle"].join('');

  dispatch(startExpressionAuthorsFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var authors = results.map((result) => {
        var authorInfo = {
          author: result.author.value,
          authorShortId: result.authorShortId.value,
          authorTitle: result.authorTitle.value,
        }
        return authorInfo

      });
      dispatch(completeExpressionAuthorsFetch(authors));
    });
  }
};
// END Expression Authors Actions
export var startQuotationWorksListFetch = () => {
  return{
    type: "START_QUOTATION_WORKS_LIST_FETCH"
  };
};
export var completeQuotationWorksListFetch = (quotationWorksList) => {
  return{
    type: "COMPLETE_QUOTATION_WORKS_LIST_FETCH",
    quotationWorksList
  };
};
export var fetchQuotationWorksList = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var quotationWorkGroupSparql = ""
    if (state.search.searchParameters.quotationWorkGroup){
      quotationWorkGroupSparql = [
      "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?expression ."
      ].join('');
    }
    var quotationAuthorSparql = ""
    if (state.search.searchParameters.quotationAuthor){
      quotationAuthorSparql = [
      "?expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.quotationAuthor + "> ."
      ].join('');
    }
    let quotationAuthorTypeSparql = ""
    if (state.search.searchParameters.quotationAuthorType){
      quotationAuthorTypeSparql = [
      "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor . ",
      "?quotationAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.quotationAuthorType + "> ."
      ].join('');
    }

    // var query = [
    //     "SELECT ?type ?expression ?expressionShortId ?expressionTitle ?author ?authorTitle ?workGroup ?workGroupTitle",
    //     "WHERE { ",
    //     "{",
    //     "?expression a <http://scta.info/resource/work> .",
    //     "?expression a ?type .",
    //     "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
    //     "}",
    //     "UNION{",
    //     "?expression a <http://scta.info/resource/expression> .",
    //     "?expression a ?type .",
    //     "?expression <http://scta.info/property/level> '1' . ",
    //     "?expression <http://scta.info/property/shortId> ?expressionShortId .",
    //     "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
    //     "OPTIONAL { ",
    //     "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
    //     "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
    //     "}",
    //     "?expression <http://purl.org/dc/terms/isPartOf> ?workGroup .",
    //     "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
    //     "}",
    //     "}",
    //     "ORDER BY ?expressionTitle"].join('');
    var query = [
        "SELECT ?type ?expression ?expressionShortId ?expressionTitle ?author ?authorTitle ?workGroup ?workGroupTitle",
        "WHERE { ",
        "?expression a <http://scta.info/resource/expression> .",
        "?expression a ?type .",
        "?expression <http://scta.info/property/level> '1' . ",
        quotationAuthorTypeSparql,
        quotationWorkGroupSparql,
        quotationAuthorSparql,
        "?expression <http://scta.info/property/shortId> ?expressionShortId .",
        "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
        "OPTIONAL { ",
        "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
        "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
        "}",
        "?expression <http://purl.org/dc/terms/isPartOf> ?workGroup .",
        "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
        "}",
        "ORDER BY ?expressionTitle"].join('');

  dispatch(startQuotationWorksListFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var quotationWorksList = results.map((result) => {
      var quotationWorkInfo = {
          expression: result.expression.value,
          expressionShortId: result.expressionShortId ? result.expressionShortId.value : "",
          expressionTitle: result.expressionTitle.value,
          workGroup: result.workGroup ? result.workGroup.value : "",
          workGroupTitle: result.workGroupTitle ? result.workGroupTitle.value : "",
          author: result.author ? result.author.value : "",
          authorTitle: result.author ? result.authorTitle.value : "",
          type: result.type.value

        }
        return quotationWorkInfo
      });
      dispatch(completeQuotationWorksListFetch(quotationWorksList));
    });
  }
};
export var startQuotationWorkPartsFetch = () => {
  return{
    type: "START_QUOTATION_WORK_PARTS_FETCH"
  };
};
export var completeQuotationWorkPartsFetch = (parts) => {
  return{
    type: "COMPLETE_QUOTATION_WORK_PARTS_FETCH",
    parts
  };
};
export var fetchQuotationWorkParts = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var currentNode = "";
    if (state.search.searchParameters.quotationWorkPart != ""){
      currentNode = state.search.searchParameters.quotationWorkPart;
    }
    else if (state.search.searchParameters.quotationWork != ""){
      currentNode = state.search.searchParameters.quotationWork;
    }
    else{
      currentNode = "";
    }

    var query = [
        "SELECT ?grandparent ?grandparent_title ?parent_title ?parent ?child ?child_title ",
        "WHERE { ",
        "BIND(<http://scta.info/resource/" + currentNode + "> AS ?parent)",
        "OPTIONAL {",
          "?parent <http://purl.org/dc/elements/1.1/title> ?parent_title",
        "}",
        "OPTIONAL {",
        "?parent <http://purl.org/dc/terms/hasPart> ?child .",
        "?child <http://purl.org/dc/elements/1.1/title> ?child_title .",
        //"MINUS{?child <http://scta.info/property/structureType> <http://scta.info/resource/structureDivision> .}",
        "}",
        "OPTIONAL {",
        "?parent <http://purl.org/dc/terms/isPartOf> ?grandparent .",
        //"?grandparent <http://scta.info/property/structureType> <http://scta.info/resource/structureCollection> .",
        "?grandparent <http://purl.org/dc/elements/1.1/title> ?grandparent_title",
        "}",
        "}"
        ].join('');
    //conditional here prevents running query if the node is blank
    //if (currentNode){
    dispatch(startQuotationWorkPartsFetch());
    axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings;
      var parts = results.map((result) => {
          var partInfo = {
            grandparent: result.grandparent ? result.grandparent.value : "",
            grandparent_title: result.grandparent_title ? result.grandparent_title.value : "",
            parent: result.parent.value,
            parent_title: result.parent_title ? result.parent_title.value : "",
            child: result.child ? result.child.value : "",
            child_title: result.child_title ? result.child_title.value : ""
          }
          return partInfo

        });
        dispatch(completeQuotationWorkPartsFetch(parts));
      });
    //}
  }
};

export var startExpressionPartsFetch = () => {
  return{
    type: "START_EXPRESSION_PARTS_FETCH"
  };
};
export var completeExpressionPartsFetch = (parts) => {
  return{
    type: "COMPLETE_EXPRESSION_PARTS_FETCH",
    parts
  };
};
export var fetchExpressionParts = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var currentNode = "";
    if (state.search.searchParameters.expressionPart != ""){
      currentNode = state.search.searchParameters.expressionPart;
    }
    else if (state.search.searchParameters.expressionId != ""){
      currentNode = state.search.searchParameters.expressionId;
    }
    else{
      currentNode = "";
    }
    var query = [
        "SELECT ?grandparent ?grandparent_title ?grandparent_level ?parent_title ?parent ?parent_level ?child ?child_level ?child_title ",
        "WHERE { ",
        "BIND(<http://scta.info/resource/" + currentNode + "> AS ?parent)",
        "OPTIONAL {",
          "?parent <http://purl.org/dc/elements/1.1/title> ?parent_title .",
          "?parent <http://scta.info/property/level> ?parent_level .",
        "}",
        "OPTIONAL {",
        "?parent <http://purl.org/dc/terms/hasPart> ?child .",
        "?child <http://purl.org/dc/elements/1.1/title> ?child_title .",
        "?child <http://scta.info/property/level> ?child_level .",
        //"MINUS{?child <http://scta.info/property/structureType> <http://scta.info/resource/structureDivision> .}",
        "}",
        "OPTIONAL {",
        "?parent <http://purl.org/dc/terms/isPartOf> ?grandparent .",
        //"?grandparent <http://scta.info/property/structureType> <http://scta.info/resource/structureCollection> .",
        "?grandparent <http://purl.org/dc/elements/1.1/title> ?grandparent_title .",
        "?grandparent <http://scta.info/property/level> ?grandparent_level .",
        "}",
        "}"
        ].join('');
  //conditional prevents running query if current node is blank
  if (currentNode){
    dispatch(startExpressionPartsFetch());
    axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings;
      var parts = results.map((result) => {
          var partInfo = {
            grandparent: result.grandparent ? result.grandparent.value : "",
            grandparent_title: result.grandparent_title ? result.grandparent_title.value : "",
            grandparent_level: result.grandparent_level ? result.grandparent_level.value : "",
            parent: result.parent.value,
            parent_title: result.parent_title ? result.parent_title.value : "",
            parent_level: result.parent_level ? result.parent_level.value : "",
            child: result.child ? result.child.value : "",
            child_title: result.child_title ? result.child_title.value : "",
            child_level: result.child_level ? result.child_level.value : "",
          }
          return partInfo

        });
        dispatch(completeExpressionPartsFetch(parts));
      });
    }
  }
};

export var startQuotationExpressionTypeFetch = () => {
  return{
    type: "START_QUOTATION_EXPRESSION_TYPE_FETCH"
  };
};
export var completeQuotationExpressionTypeFetch = (quotationExpressionTypes) => {
  return{
    type: "COMPLETE_QUOTATION_EXPRESSION_TYPE_FETCH",
    quotationExpressionTypes
  };
};
export var fetchQuotationExpressionTypes = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = [
        "SELECT ?quotationExpressionType ?quotationExpressionTypeTitle ?quotationExpressionTypeShortId ",
        "WHERE { ",
        "?quotationExpressionType a <http://scta.info/resource/expressionType> .",
        "?quotationExpressionType <http://scta.info/property/shortId> ?quotationExpressionTypeShortId .",
        "?quotationExpressionType <http://purl.org/dc/elements/1.1/title> ?quotationExpressionTypeTitle .",
        "}",
        "ORDER BY ?quotationExpressionTypeTitle"].join('');

  dispatch(startQuotationExpressionTypeFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;

    var quotationExpressionTypes = results.map((result) => {
      var quotationExpressionTypeInfo = {
          quotationExpressionType: result.quotationExpressionType.value,
          quotationExpressionTypeShortId: result.quotationExpressionTypeShortId.value,
          quotationExpressionTypeTitle: result.quotationExpressionTypeTitle.value
        }
        return quotationExpressionTypeInfo
      });
      dispatch(completeQuotationExpressionTypeFetch(quotationExpressionTypes));
    });
  }
};


export var startExpressionTypeFetch = () => {
  return{
    type: "START_EXPRESSION_TYPE_FETCH"
  };
};
export var completeExpressionTypeFetch = (expressionTypes) => {
  return{
    type: "COMPLETE_EXPRESSION_TYPE_FETCH",
    expressionTypes
  };
};
export var fetchExpressionTypes = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = [
        "SELECT ?expressionType ?expressionTypeTitle ?expressionTypeShortId ",
        "WHERE { ",
        "?expressionType a <http://scta.info/resource/expressionType> .",
        "?expressionType <http://scta.info/property/shortId> ?expressionTypeShortId .",
        "?expressionType <http://purl.org/dc/elements/1.1/title> ?expressionTypeTitle .",
        "}",
        "ORDER BY ?expressionTypeTitle"].join('');

  dispatch(startExpressionTypeFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var expressionTypes = results.map((result) => {
      var expressionTypeInfo = {
          expressionType: result.expressionType.value,
          expressionTypeShortId: result.expressionTypeShortId.value,
          expressionTypeTitle: result.expressionTypeTitle.value
        }
        return expressionTypeInfo
      });
      dispatch(completeExpressionTypeFetch(expressionTypes));
    });
  }
};
export var startWorkGroupsFetch = () => {
  return{
    type: "START_WORK_GROUPS_FETCH"
  };
};
export var completeWorkGroupsFetch = (workGroups) => {
  return{
    type: "COMPLETE_WORK_GROUPS_FETCH",
    workGroups
  };
};
export var fetchWorkGroups = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = [
        "SELECT ?workGroup ?workGroupShortId ?workGroupTitle ",
        "WHERE { ",
        "?workGroup a <http://scta.info/resource/workGroup> .",
        "?workGroup <http://scta.info/property/shortId> ?workGroupShortId .",
        "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
        "}",
        "ORDER BY ?workGroupTitle"].join('');
  dispatch(startWorkGroupsFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var workGroups = results.map((result) => {
      var workGroupInfo = {
          workGroup: result.workGroup.value,
          workGroupShortId: result.workGroupShortId.value,
          workGroupTitle: result.workGroupTitle.value
        }
        return workGroupInfo
      });
      dispatch(completeWorkGroupsFetch(workGroups));
    });
  }
};
// Author types fetch

export var startAuthorTypesFetch = () => {
  return{
    type: "START_AUTHOR_TYPES_FETCH"
  };
};
export var completeAuthorTypesFetch = (authorTypes) => {
  return{
    type: "COMPLETE_AUTHOR_TYPES_FETCH",
    authorTypes
  };
};
export var fetchAuthorTypes = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = [
      "SELECT ?authorType ?authorTypeTitle ?authorTypeShortId ",
      "WHERE { ",
      "?authorType a <http://scta.info/resource/personType> .",
      "?authorType <http://scta.info/property/shortId> ?authorTypeShortId .",
      "?authorType <http://purl.org/dc/elements/1.1/title> ?authorTypeTitle .",
      "}",
      "ORDER BY ?authorTypeTitle"].join('');
  dispatch(startAuthorTypesFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var authorTypes = results.map((result) => {
      var authorTypeInfo = {
          authorType: result.authorType.value,
          authorTypeShortId: result.authorTypeShortId.value,
          authorTypeTitle: result.authorTypeTitle.value
        }
        return authorTypeInfo
      });
      dispatch(completeAuthorTypesFetch(authorTypes));
    });
  }
};



///Chart Actions
export var toggleGraphDisplay = (current) => {
  return{
    type: "TOGGLE_GRAPH_DISPLAY",
    current
  };
}
export var startChartFetch = () => {
  return{
    type: "START_CHART_FETCH"
  };
};
export var completeChartFetch = (count) => {
  return{
    type: "COMPLETE_CHART_FETCH",
    count
  };
};
export var fetchChart = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var level = parseInt(state.search.searchParameters.expressionLevel)
    if (level === 1){
      level = 2;
    }
    var searchText = state.search.searchParameters.searchText || "";

    let expressionWorkGroupSparql = "";
    if (state.search.searchParameters.workGroup){
      const workGroup = state.search.searchParameters.workGroup;
      expressionWorkGroupSparql = [
        "?ref <http://purl.org/dc/terms/isPartOf> <http://scta.info/resource/" + workGroup + ">  . "
      ].join('');
    }

// BEGIN Expression author queries
    let expressionAuthorTypeSparql = ""
    if (state.search.searchParameters.expressionAuthorType){
      expressionAuthorTypeSparql = "?author <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthorType + "> ."
    }

    //Begin expression author date filter for expression author
    let expressionAuthorDateSparql = "";
    if (state.search.searchParameters.expressionAuthorDateAfter || state.search.searchParameters.expressionAuthorDateBefore){
      expressionAuthorDateSparql = "?author <http://scta.info/property/dateOfBirth> ?expressionAuthorDateOfBirth ."
    }
    let expressionAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateAfter){
      expressionAuthorDateAfterSparqlFilter = "FILTER (?expressionAuthorDateOfBirth >= '" + state.search.searchParameters.expressionAuthorDateAfter + "')."
    }
    let expressionAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateBefore){
        expressionAuthorDateBeforeSparqlFilter = "FILTER (?expressionAuthorDateOfBirth <= '" + state.search.searchParameters.expressionAuthorDateBefore + "')."
    }
    //END expression author date filter for expression author

    var expressionAuthorSparql = "";
    if (state.search.searchParameters.expressionAuthor){
      expressionAuthorSparql = "?ref <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> ."
    }

    var expressionAuthorCoreSparql = [
      "?ref <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
      expressionAuthorTypeSparql,
      expressionAuthorDateSparql,
      expressionAuthorSparql
    ].join('');
// End expression author queries

//BEGIN Quotation Author Queries
      var quotationAuthorTypeSparql = "";
      if (state.search.searchParameters.quotationAuthorType){
        var searchShortId = state.search.searchParameters.quotationAuthorType;
        quotationAuthorTypeSparql = "?quotationAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + searchShortId + ">  . ";
      }

      //Begin quotation author date filter for expression author
      let quotationAuthorDateSparql = "";
      if (state.search.searchParameters.quotationAuthorDateAfter || state.search.searchParameters.quotationAuthorDateBefore){
        quotationAuthorDateSparql =
            "?quotationAuthor <http://scta.info/property/dateOfBirth> ?quotationAuthorDateOfBirth ."
      }
      let quotationAuthorDateAfterSparqlFilter = "";
      if (state.search.searchParameters.quotationAuthorDateAfter){
        quotationAuthorDateAfterSparqlFilter = "FILTER (?quotationAuthorDateOfBirth >= '" + state.search.searchParameters.quotationAuthorDateAfter + "')."
      }
      let quotationAuthorDateBeforeSparqlFilter = "";
      if (state.search.searchParameters.quotationAuthorDateBefore){
          quotationAuthorDateBeforeSparqlFilter = "FILTER (?quotationAuthorDateOfBirth <= '" + state.search.searchParameters.quotationAuthorDateBefore + "')."
      }
      //END quotation author date filter for expression author

      var quotationAuthorSparql = "";
      if (state.search.searchParameters.quotationAuthor){
        var searchShortId = (state.search.searchParameters.quotationAuthor);
        quotationAuthorSparql = "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + searchShortId + ">  . "
      }
      var quotationAuthorCoreSparql = ""
      if (state.search.searchParameters.quotationAuthorDateAfter
        || state.search.searchParameters.quotationAuthorDateBefore
        || state.search.searchParameters.quotationAuthor
        || state.search.searchParameters.quotationAuthorType
      ){
        var quotationAuthorCoreSparql = [
          "{",
            "?element <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
            "?isInstanceOf <http://scta.info/property/source> ?source .",
            "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
            "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor . ",
            quotationAuthorTypeSparql,
            quotationAuthorDateSparql,
            quotationAuthorSparql,
          "}",
          "UNION",
          "{",
            "?element <http://scta.info/property/source> ?source .",
            "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
            "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor . ",
            quotationAuthorTypeSparql,
            quotationAuthorDateSparql,
            quotationAuthorSparql,
          "}"
        ].join('');
      }

// END Quotation Author Queries for Quotations List



    var quotationWorkGroupSparql = "";
    if (state.search.searchParameters.quotationWorkGroup){
      var searchShortId = (state.search.searchParameters.quotationWorkGroup);
      quotationWorkGroupSparql = [
        "{",
          "?element <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "?isInstanceOf <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
          "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?source_toplevel_expression .",
        "}",
        "UNION",
        "{",
          "?element <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
          "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?source_toplevel_expression .",
        "}"
      ].join('');
    }


    var quotationWorkSparql = "";
    if (state.search.searchParameters.quotationWork || state.search.searchParameters.quotationWorkPart){
      var searchShortId = (state.search.searchParameters.quotationWorkPart) ? state.search.searchParameters.quotationWorkPart : state.search.searchParameters.quotationWork
      quotationWorkSparql = [
      "{",
        "?element <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
        "{",
          "\n#check for quotation whose canonical source is a member of the search expression\n",
          "?isInstanceOf  <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
        "UNION",
        "{",
          "\n#check for quotation whose canonical source is search expression\n",
          "?isInstanceOf  <http://scta.info/property/source> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
      "}",
      "UNION",
      "{",
        "\n#check for quotation whose source is a member the search expression\n",
        "{",
          "?element <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
        "UNION",
        "\n#check for quotation whose source is the search expression\n",
        "{",
          "?element <http://scta.info/property/source> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
      "}"
    ].join('');
    }

    //BEGIN condition for choosing ref quote or combo
        var structureElementTypeSparql = "";
        if (state.search.searchParameters.structureElementType === "structureElementRef"){
          structureElementTypeSparql = [
            "{?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> .}",
            "MINUS",
            "{?element <http://scta.info/property/isReferenceTo> ?isReferenceTo . }",
            ].join('');
        }
        else if (state.search.searchParameters.structureElementType === "structureElementRefDup"){
          structureElementTypeSparql = "?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> ."
        }
        else if (state.search.searchParameters.structureElementType === "structureElementQuote"){
          structureElementTypeSparql = "?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> ."
        }
        else if (state.search.searchParameters.structureElementType === "allDup"){
          structureElementTypeSparql = [
            "{?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .}",
            "UNION",
            "{?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> . }"
          ].join('');
        }
        else{
          structureElementTypeSparql = [
            "{?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .}",
            "UNION",
            "{{?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> .}",
            "MINUS",
            "{?element <http://scta.info/property/isReferenceTo> ?isReferenceTo . }",

            "}"
          ].join('');
        }
    //END condition for choosing ref quote or combo



    //var expressionId = state.search.searchParameters.expressionPart ? state.search.searchParameters.expressionPart : state.search.searchParameters.expressionId
    if (state.search.searchParameters.expressionId){
      // query for quote frequency within a given expression
      var expressionId = state.search.searchParameters.expressionId
      var query = [
        "SELECT ?ref ?reftitle ?totalOrderNumber (count(?element) as ?count) ",
        "WHERE {",
        "?ref a <http://scta.info/resource/expression> .",
        "?ref <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + expressionId + "> .",
        "?ref <http://scta.info/property/level> '" + level + "' .",
        "?ref <http://purl.org/dc/elements/1.1/title> ?reftitle .",
        "OPTIONAL {",
        "?ref <http://scta.info/property/totalOrderNumber> ?totalOrderNumber .",
        "}",
        "OPTIONAL {",
        "?element <http://scta.info/property/isMemberOf> ?ref .",
        //"?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .",
        structureElementTypeSparql,
        "?element <http://scta.info/property/structureElementText> ?quotation_text .",
        quotationAuthorCoreSparql,
        quotationWorkGroupSparql,
        quotationWorkSparql,
        "}",
        quotationAuthorDateBeforeSparqlFilter,
        quotationAuthorDateAfterSparqlFilter,
        "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
        "}",
        "group by ?ref ?reftitle ?totalOrderNumber ",
        "ORDER BY ?totalOrderNumber "
      ].join('');
    }
    else {
      // query for quote frequency across top level expressions
      var query = [
        "SELECT ?ref ?reftitle ?totalOrderNumber (count(?element) as ?count) ",
        "WHERE {",
        "?ref a <http://scta.info/resource/expression> .",
        "?ref <http://scta.info/property/level> '1' .",
        expressionWorkGroupSparql,
        expressionAuthorCoreSparql,
        "?ref <http://purl.org/dc/elements/1.1/title> ?reftitle .",
        "OPTIONAL {",
        "?ref <http://scta.info/property/totalOrderNumber> ?totalOrderNumber .",
        "}",
        "OPTIONAL {",
        "?element <http://scta.info/property/isMemberOf> ?ref .",
        //"?element <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .",
        structureElementTypeSparql,
        "?element <http://scta.info/property/structureElementText> ?quotation_text .",
        quotationAuthorCoreSparql,
        quotationWorkGroupSparql,
        quotationWorkSparql,
        "}",
        quotationAuthorDateBeforeSparqlFilter,
        quotationAuthorDateAfterSparqlFilter,
        expressionAuthorDateBeforeSparqlFilter,
        expressionAuthorDateAfterSparqlFilter,
        "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
        "}",
        "group by ?ref ?reftitle ?totalOrderNumber ",
        "ORDER BY ?totalOrderNumber "
      ].join('');
    }

  dispatch(startChartFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var count = results.map((result) => {
        return {
          "item": result.ref ? result.ref.value : "",
          "title": result.reftitle ? result.reftitle.value : "",
          "count": result.count ? result.count.value : ""
        }
      });
      dispatch(completeChartFetch(count));
    });
  }
};

///Chart Actions
export var toggleImagesDisplay = (current) => {
  return{
    type: "TOGGLE_IMAGES_DISPLAY",
    current
  };
}
export var startImagesFetch = () => {
  return{
    type: "START_IMAGES_FETCH"
  };
};
export var completeImagesFetch = (images) => {
  return{
    type: "COMPLETE_IMAGES_FETCH",
    images
  };
};
export var fetchImages = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var manifestation_id = state.paragraph.manifestation_id
    var query = [
      "SELECT ?url ",
      "WHERE { ",
      "<" + manifestation_id + "> <http://scta.info/property/isOnSurface> ?surface .",
      "?surface <http://scta.info/property/hasISurface> ?isurface .",
      "?isurface <http://scta.info/property/hasCanvas> ?canvas .",
      "?canvas <http://iiif.io/api/presentation/2#hasImageAnnotations> ?anno .",
      "?canvas <http://iiif.io/api/presentation/2#hasImageAnnotations> ?anno .",
      "?anno <http://www.w3.org/1999/02/22-rdf-syntax-ns#first> ?imgres .",
      "?imgres <http://www.w3.org/ns/oa#hasBody> ?body .",
      "?body <http://rdfs.org/sioc/services#has_service> ?url .",
      "}"
    ].join('');

  dispatch(startImagesFetch());
  axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var images = results.map((result) => {
        return {
          "url": result.url.value,
        }
      });
      dispatch(completeImagesFetch(images));
    });
  }
};


// Quotation Actions
// ==================
export var addQuotations = (quotations) => {
  return{
    type: "ADD_QUOTATIONS",
    quotations
  };
};
export var clearQuotations = () => {
  return{
    type: "CLEAR_QUOTATIONS"
  };
};
export var startQuotationsFetch = () => {
  return{
    type: "START_QUOTATIONS_FETCH"
  };
};
export var clearQuotationsFocus = () => {
  return{
    type: "CLEAR_QUOTATIONS_FOCUS"
  };
};
export var completeQuotationsFetch = (quotations) => {
  return{
    type: "COMPLETE_QUOTATIONS_FETCH",
    quotations
  };
};
export var fetchQuotations = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var searchText = state.search.searchParameters.searchText || "";
    var expressionIdSparql = "";
    if (state.search.searchParameters.expressionId || state.search.searchParameters.expressionPart){
      var searchShortId = (state.search.searchParameters.expressionPart) ? state.search.searchParameters.expressionPart : state.search.searchParameters.expressionId
      var expressionIdSparql = [
      "?quotation <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> ."
      ].join('');

    }
// BEGIN Expression author queries
    let expressionAuthorTypeSparql = ""
    if (state.search.searchParameters.expressionAuthorType){
      expressionAuthorTypeSparql = "?author <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthorType + "> ."
    }

    //Begin expression author date filter for expression author
    let expressionAuthorDateSparql = "";
    if (state.search.searchParameters.expressionAuthorDateAfter || state.search.searchParameters.expressionAuthorDateBefore){
      expressionAuthorDateSparql = "?author <http://scta.info/property/dateOfBirth> ?dateOfBirth ."
    }
    let expressionAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateAfter){
      expressionAuthorDateAfterSparqlFilter = "FILTER (?dateOfBirth >= '" + state.search.searchParameters.expressionAuthorDateAfter + "')."
    }
    let expressionAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateBefore){
        expressionAuthorDateBeforeSparqlFilter = "FILTER (?dateOfBirth <= '" + state.search.searchParameters.expressionAuthorDateBefore + "')."
    }
    //END expression author date filter for expression author

    var authorSparql = "";
    if (state.search.searchParameters.expressionAuthor){
      authorSparql = "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> ."
    }

    var expressionAuthorCoreSparql = [
      "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
      expressionAuthorTypeSparql,
      expressionAuthorDateSparql,
      authorSparql,
      "?author <http://purl.org/dc/elements/1.1/title> ?author_title . "
      ].join('');
// End expression author queries


//BEGIN Quotation Author Queries
    var quotationAuthorTypeSparql = "";
    if (state.search.searchParameters.quotationAuthorType){
      var searchShortId = state.search.searchParameters.quotationAuthorType;
      quotationAuthorTypeSparql = "?quotationAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + searchShortId + ">  . ";
    }

    //Begin quotation author date filter for expression author
    let quotationAuthorDateSparql = "";
    if (state.search.searchParameters.quotationAuthorDateAfter || state.search.searchParameters.quotationAuthorDateBefore){
      quotationAuthorDateSparql =
          "?quotationAuthor <http://scta.info/property/dateOfBirth> ?quotationAuthorDateOfBirth ."
    }
    let quotationAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateAfter){
      quotationAuthorDateAfterSparqlFilter = "FILTER (?quotationAuthorDateOfBirth >= '" + state.search.searchParameters.quotationAuthorDateAfter + "')."
    }
    let quotationAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateBefore){
        quotationAuthorDateBeforeSparqlFilter = "FILTER (?quotationAuthorDateOfBirth <= '" + state.search.searchParameters.quotationAuthorDateBefore + "')."
    }
    //END quotation author date filter for expression author

    var quotationAuthorSparql = "";
    if (state.search.searchParameters.quotationAuthor){
      var searchShortId = (state.search.searchParameters.quotationAuthor);
      quotationAuthorSparql = "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + searchShortId + ">  . "
    }
    var quotationAuthorCoreSparql = ""
    if (state.search.searchParameters.quotationAuthorDateAfter
      || state.search.searchParameters.quotationAuthorDateBefore
      || state.search.searchParameters.quotationAuthor
      || state.search.searchParameters.quotationAuthorType
    ){
    var quotationAuthorCoreSparql = [
      "{",
        "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
        "?isInstanceOf <http://scta.info/property/source> ?source .",
        "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
        "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor . ",
        quotationAuthorTypeSparql,
        quotationAuthorDateSparql,
        quotationAuthorSparql,
      "}",
      "UNION",
      "{",
        "?quotation <http://scta.info/property/source> ?source .",
        "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
        "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor . ",
        quotationAuthorTypeSparql,
        quotationAuthorDateSparql,
        quotationAuthorSparql,
      "}"
    ].join('');
    }

// END Quotation Author Queries for Quotations List

    var quotationWorkGroupSparql = "";
    if (state.search.searchParameters.quotationWorkGroup){
      var searchShortId = (state.search.searchParameters.quotationWorkGroup);
      quotationWorkGroupSparql = [
        "{",
          "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "?isInstanceOf <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
          "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?source_toplevel_expression .",
        "}",
        "UNION",
        "{",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
          "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?source_toplevel_expression .",
        "}"
      ].join('');
    }


    //NEW QUERY
    var quotationWorkSparql = "";
    if (state.search.searchParameters.quotationWork || state.search.searchParameters.quotationWorkPart){
      var searchShortId = (state.search.searchParameters.quotationWorkPart) ? state.search.searchParameters.quotationWorkPart : state.search.searchParameters.quotationWork
      quotationWorkSparql = [
      "{",
        "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
        "{",
          "\n#check for quotation whose canonical source is a member of the search expression\n",
          "?isInstanceOf  <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
        "UNION",
        "{",
          "\n#check for quotation whose canonical source is search expression\n",
          "?isInstanceOf  <http://scta.info/property/source> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
      "}",
      "UNION",
      "{",
        "\n#check for quotation whose source is a member the search expression\n",
        "{",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
        "UNION",
        "\n#check for quotation whose source is the search expression\n",
        "{",
          "?quotation <http://scta.info/property/source> <http://scta.info/resource/" + searchShortId + "> .",
        "}",
      "}"
    ].join('');
    }

    //NEW QUERY
    let quotationExpressionTypeSparql = "";
    if (state.search.searchParameters.quotationExpressionType){
      const quotationExpressionTypeShortId = state.search.searchParameters.quotationExpressionType;
      quotationExpressionTypeSparql = [
      "{",
        "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
        "{",
          "\n#check for quotation whose canonical source is a member an expression with the designated type\n",
          "?isInstanceOf  <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> ?memberOf .",
          "?memberOf <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> .",
        "}",
        "UNION",
        "{",
          "\n#check for quotation whose canonical source is has designated type\n",
          "?isInstanceOf  <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> .",
        "}",
      "}",
      "UNION",
      "{",
        "\n#check for quotation whose source is a member the search expression\n",
        "{",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> ?memberOf .",
          "?memberOf <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> .",
        "}",
        "UNION",
        "\n#check for quotation whose source is the search expression\n",
        "{",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> .",
        "}",
      "}"
    ].join('');
    }

    var workGroupSparql = "";
    if (state.search.searchParameters.workGroup){
      workGroupSparql = [
      "<http://scta.info/resource/" + state.search.searchParameters.workGroup + "> <http://scta.info/property/hasExpression> ?toplevel_expression .",
      ].join('');
    }

    var expressionTypeSparql = "";
    if (state.search.searchParameters.expressionType){
      expressionTypeSparql = [
        "?quotation <http://scta.info/property/isMemberOf> ?expressionIsmemberOf .",
        "?expressionIsmemberOf <http://scta.info/property/expressionType> <http://scta.info/resource/" + state.search.searchParameters.expressionType + "> .",
      ].join('');
    }
//BEGIN condition for choosing ref quote or combo
    var structureElementTypeSparql = "";
    if (state.search.searchParameters.structureElementType === "structureElementRef"){
      structureElementTypeSparql = [
        "{?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> .}",
        "MINUS",
        "{?quotation <http://scta.info/property/isReferenceTo> ?isReferenceTo . }",
        ].join('');
    }
    else if (state.search.searchParameters.structureElementType === "structureElementRefDup"){
      structureElementTypeSparql = "?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> ."
    }
    else if (state.search.searchParameters.structureElementType === "structureElementQuote"){
      structureElementTypeSparql = "?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> ."
    }
    else if (state.search.searchParameters.structureElementType === "allDup"){
      structureElementTypeSparql = [
        "{?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .}",
        "UNION",
        "{?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> . }"
      ].join('');
    }
    else{
      structureElementTypeSparql = [
        "{?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .}",
        "UNION",
        "{{?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementRef> .}",
        "MINUS",
        "{?quotation <http://scta.info/property/isReferenceTo> ?isReferenceTo . }",

        "}"
      ].join('');
    }
//END condition for choosing ref quote or combo
    var query = ""
    if (state.canonicalQuotation){
      var canonicalQuotationId = state.canonicalQuotation.id;
      var query = [
            "SELECT ?quotation ?isInstanceOf ?quotation_text ?toplevel_expression_title ?author_title ?citation ?ref ?refText ",
            "WHERE {",
            "<" + canonicalQuotationId + "> <http://scta.info/property/hasInstance> ?quotation .",
            "OPTIONAL {",
            "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
            "}",
            "OPTIONAL {",
            "?quotation <http://scta.info/property/source> ?source .",
            "}",
            expressionIdSparql,
            quotationAuthorCoreSparql,
            quotationWorkGroupSparql,
            quotationWorkSparql,
            quotationExpressionTypeSparql,
            "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            //"?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            "?quotation <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression . ",
            expressionTypeSparql,
            workGroupSparql,
            "?toplevel_expression <http://purl.org/dc/elements/1.1/title> ?toplevel_expression_title . ",
            expressionAuthorCoreSparql,
            "OPTIONAL {",
              "?quotation <http://scta.info/property/citation> ?citation . ",
            "}",
            "OPTIONAL {",
              "?ref <http://scta.info/property/isReferenceTo> ?quotation . ",
              "?ref <http://scta.info/property/structureElementText> ?refText . ",
            "}",
            expressionAuthorDateAfterSparqlFilter,
            expressionAuthorDateBeforeSparqlFilter,
            quotationAuthorDateAfterSparqlFilter,
            quotationAuthorDateBeforeSparqlFilter,
            "}",
            "LIMIT 100"
          ].join('');
    }
    else{
      var query = [
          "SELECT ?quotation ?source ?isInstanceOf ?quotation_text ?toplevel_expression_title ?author_title ?citation ?ref ?refText ?refType ",
          "WHERE {",
          structureElementTypeSparql,
          "?quotation <http://scta.info/property/structureElementType> ?refType . ",
          "?quotation a <http://scta.info/resource/expression> .",
          "OPTIONAL {",
          "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "}",
          "OPTIONAL {",
          "?quotation <http://scta.info/property/source> ?source .",
          "}",
          expressionIdSparql,
          quotationAuthorCoreSparql,
          quotationWorkGroupSparql,
          quotationWorkSparql,
          quotationExpressionTypeSparql,
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
          "?quotation <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression . ",
          expressionTypeSparql,
          workGroupSparql,
          authorSparql,
          "?toplevel_expression <http://purl.org/dc/elements/1.1/title> ?toplevel_expression_title . ",
          expressionAuthorCoreSparql,
          "OPTIONAL {",
            "?quotation <http://scta.info/property/citation> ?citation . ",
          "}",
          "OPTIONAL {",
            "?ref <http://scta.info/property/isReferenceTo> ?quotation . ",
            "?ref <http://scta.info/property/structureElementText> ?refText . ",
          "}",
          expressionAuthorDateAfterSparqlFilter,
          expressionAuthorDateBeforeSparqlFilter,
          quotationAuthorDateAfterSparqlFilter,
          quotationAuthorDateBeforeSparqlFilter,
          "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
          "}",
          "ORDER BY ?quotation_text ",
          "LIMIT 100"
        ].join('');
      }
    dispatch(startQuotationsFetch());
    axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings

      dispatch(completeQuotationsFetch(results));
    });
  };
}

// Focused Quotation actions
export var changeQuotationsFocus = (id) => {
  return{
    type: "CHANGE_QUOTATIONS_FOCUS",
    id
  }
}

export var clearFocusedQuotation = () => {
  return{
    type: "CLEAR_FOCUSED_QUOTATION"
  }
}

export var createFocusedQuotation = (quotation) => {
  return{
    type: "CREATE_FOCUSED_QUOTATION",
    quotation
  };
};

// Canonical Quotation
export var createCanonicalQuotation = (quotation) => {
  return{
    type: "CREATE_CANONICAL_QUOTATION",
    quotation
  };
};
export var clearCanonicalQuotation = () => {
  return{
    type: "CLEAR_CANONICAL_QUOTATION"
  };
};


// CanonicalQuotations (plural) Actions
export var changeCanonicalQuotationsFocus = (id) => {
  return{
    type: "CHANGE_CANONICAL_QUOTATIONS_FOCUS",
    id
  }
}
export var clearCanonicalQuotationsFocus = () =>{
  return{
    type: "CLEAR_CANONICAL_QUOTATIONS_FOCUS",
  }
}
export var clearCanonicalQuotations = () => {
  return{
    type: "CLEAR_CANONICAL_QUOTATIONS"
  };
};
export var startCanonicalQuotationsFetch = () => {
  return{
    type: "START_CANONICAL_QUOTATIONS_FETCH"
  };
};
export var completeCanonicalQuotationsFetch = (canonicalQuotations) => {
  return{
    type: "COMPLETE_CANONICAL_QUOTATIONS_FETCH",
    canonicalQuotations
  };
};
export var fetchCanonicalQuotations = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var searchText = state.search.searchParameters.searchText || "";


    var quotationInstanceSparql = ""
    if (state.search.searchParameters.expressionId || state.search.searchParameters.expressionAuthor || state.search.searchParameters.workGroup){
      quotationInstanceSparql = [
      "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
      ].join('');
    }
    var topLevelExpressionSparql = ""
    if (state.search.searchParameters.expressionAuthor || state.search.searchParameters.workGroup){
      topLevelExpressionSparql = [
      "?quotationInstance <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression .",
      ].join('');
    }

    // var quotationTypeSparql = ""
    // if (state.search.searchParameters.quotationType){
    //   var quotationTypeSparql = "?quotation <http://scta.info/property/quotationType>	<http://scta.info/resource/" + state.search.searchParameters.quotationType + "> ."
    // }
    var expressionIdSparql = "";
    if (state.search.searchParameters.expressionId || state.search.searchParameters.expressionPart){
      var searchShortId = (state.search.searchParameters.expressionPart) ? state.search.searchParameters.expressionPart : state.search.searchParameters.expressionId
      var expressionIdSparql = [
      "?quotationInstance <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> .",
      ].join('');
    }

//END Expression author sparql for canonical quotations
    let expressionAuthorTypeSparql = "";
    if (state.search.searchParameters.expressionAuthorType){
      expressionAuthorTypeSparql = "?expressionAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthorType + ">  . "
    }
    //Begin expression author date filter for expression author
    let expressionAuthorDateSparql = "";
    if (state.search.searchParameters.expressionAuthorDateAfter || state.search.searchParameters.expressionAuthorDateBefore){
      expressionAuthorDateSparql =
          "?expressionAuthor <http://scta.info/property/dateOfBirth> ?expressionAuthorDateOfBirth ."
    }
    let expressionAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateAfter){
      expressionAuthorDateAfterSparqlFilter = "FILTER (?expressionAuthorDateOfBirth >= '" + state.search.searchParameters.expressionAuthorDateAfter + "')."
    }
    let expressionAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.expressionAuthorDateBefore){
        expressionAuthorDateBeforeSparqlFilter = "FILTER (?expressionAuthorDateOfBirth <= '" + state.search.searchParameters.expressionAuthorDateBefore + "')."
    }
    //END expression author date filter for expression author

    var authorSparql = "";
    if (state.search.searchParameters.expressionAuthor){
      authorSparql = "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> ."
    }

    var expressionAuthorCoreSparql = [
      "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
      "?quotationInstance <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression .",
      "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?expressionAuthor . ",
      expressionAuthorTypeSparql,
      expressionAuthorDateSparql,
      authorSparql
    ].join('');

//END Expression author sparql for canonical quotations

//BEGIN Quotation author sparql for canonical quotations
    let quotationAuthorTypeSparql = "";
    if (state.search.searchParameters.quotationAuthorType){
      const searchShortId = state.search.searchParameters.quotationAuthorType;
      quotationAuthorTypeSparql = "?quotationAuthor <http://scta.info/property/personType> <http://scta.info/resource/" + searchShortId + ">  . "
    }
    //Begin quotation author date filter for expression author
    let quotationAuthorDateSparql = "";
    if (state.search.searchParameters.quotationAuthorDateAfter || state.search.searchParameters.quotationAuthorDateBefore){
      quotationAuthorDateSparql =
          "?quotationAuthor <http://scta.info/property/dateOfBirth> ?quotationAuthorDateOfBirth ."
    }
    let quotationAuthorDateAfterSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateAfter){
      quotationAuthorDateAfterSparqlFilter = "FILTER (?quotationAuthorDateOfBirth >= '" + state.search.searchParameters.quotationAuthorDateAfter + "')."
    }
    let quotationAuthorDateBeforeSparqlFilter = "";
    if (state.search.searchParameters.quotationAuthorDateBefore){
        quotationAuthorDateBeforeSparqlFilter = "FILTER (?quotationAuthorDateOfBirth <= '" + state.search.searchParameters.quotationAuthorDateBefore + "')."
    }
    //END quotation author date filter for expression author
    var quotationAuthorSparql = "";
    if (state.search.searchParameters.quotationAuthor){
      var searchShortId = (state.search.searchParameters.quotationAuthor);
      quotationAuthorSparql = "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + searchShortId + ">  . "
    }
    var quotationAuthorCoreSparql = [
      "?quotation <http://scta.info/property/source> ?source .",
      "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
      "?source_toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?quotationAuthor .",
      quotationAuthorTypeSparql,
      quotationAuthorDateSparql,
      quotationAuthorSparql
    ].join('');

//END Quotation author sparql for canonical quotations

    var quotationWorkGroupSparql = "";
    if (state.search.searchParameters.quotationWorkGroup){
      var searchShortId = (state.search.searchParameters.quotationWorkGroup);
      quotationWorkGroupSparql = [
        "?quotation <http://scta.info/property/source> ?source .",
        "?source <http://scta.info/property/isPartOfTopLevelExpression> ?source_toplevel_expression . ",
        "<http://scta.info/resource/" + state.search.searchParameters.quotationWorkGroup + "> <http://scta.info/property/hasExpression> ?source_toplevel_expression .",
      ].join('');
    }

    var quotationWorkSparql = "";
    if (state.search.searchParameters.quotationWork || state.search.searchParameters.quotationWorkPart){
      var searchShortId = (state.search.searchParameters.quotationWorkPart) ? state.search.searchParameters.quotationWorkPart : state.search.searchParameters.quotationWork


    quotationWorkSparql = [
      "{",
        "\n#check for canonical quotation whose source is memberOf the search expression\n",
        "?quotation <http://scta.info/property/source> ?source .",
        "?source <http://scta.info/property/isMemberOf> <http://scta.info/resource/" + searchShortId + "> . ",
      "}",
      "UNION",
      "\n#check for canonical quotation whose source IS the search expression\n",
      "{",
        "?quotation <http://scta.info/property/source> <http://scta.info/resource/" + searchShortId + "> .",
      "}"
      ].join('');
    }

    let quotationExpressionTypeSparql = "";
    if (state.search.searchParameters.quotationExpressionType){
      const quotationExpressionTypeShortId = state.search.searchParameters.quotationExpressionType

      quotationExpressionTypeSparql = [
        "{",
          "\n#check for canonical quotation whose source is memberOf the search expression\n",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/isMemberOf> ?memberOf .",
          "?memberOf <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> . ",
        "}",
        "UNION",
        "\n#check for canonical quotation whose source IS the search expression\n",
        "{",
          "?quotation <http://scta.info/property/source> ?source .",
          "?source <http://scta.info/property/expressionType> <http://scta.info/resource/" + quotationExpressionTypeShortId + "> .",
        "}"
        ].join('');
      }

  var workGroupSparql = "";
    if (state.search.searchParameters.workGroup){
      workGroupSparql = [
      // "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
      // "?quotationInstance <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression .",
      "<http://scta.info/resource/" + state.search.searchParameters.workGroup + "> <http://scta.info/property/hasExpression> ?toplevel_expression .",
      ].join('');

    }

    let expressionTypeSparql = "";
    if (state.search.searchParameters.expressionType){
      expressionTypeSparql = [

        "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
        "?quotationInstance <http://scta.info/property/isMemberOf> ?expressionIsMemberOf .",
        "?expressionIsMemberOf <http://scta.info/property/expressionType> <http://scta.info/resource/" + state.search.searchParameters.expressionType + "> .",
      ].join('');
    }


    var query = [
          "SELECT DISTINCT ?quotation ?citation ?quotation_text ",
          "WHERE {",
          "?quotation a <http://scta.info/resource/quotation> .",
          "?quotation <http://scta.info/property/quotation> ?quotation_text .",
          expressionTypeSparql,
          quotationInstanceSparql,
          topLevelExpressionSparql,
          expressionAuthorCoreSparql,
          workGroupSparql,
          quotationAuthorCoreSparql,
          quotationWorkGroupSparql,
          quotationWorkSparql,
          quotationExpressionTypeSparql,
          expressionIdSparql,
          "OPTIONAL { ",
          "?quotation <http://scta.info/property/citation> ?citation .",
          "}",
          quotationAuthorDateAfterSparqlFilter,
          quotationAuthorDateBeforeSparqlFilter,
          expressionAuthorDateBeforeSparqlFilter,
          expressionAuthorDateAfterSparqlFilter,
          "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
          "}",
          "ORDER BY ?citation ",
          "LIMIT 1000"
        ].join('');
    dispatch(startQuotationsFetch());
    axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings
      dispatch(completeCanonicalQuotationsFetch(results));
    });
  };
}

//maifestation Quotations Actions
// CanonicalQuotations (plural) Actions
export var changeManifestationQuotationsFocus = (id) => {
  return{
    type: "CHANGE_MANIFESTATION_QUOTATIONS_FOCUS",
    id
  }
}
export var clearManifestationQuotationsFocus = () =>{
  return{
    type: "CLEAR_MANIFESTATION_QUOTATIONS_FOCUS",
  }
}
export var clearManifestationQuotations = () => {
  return{
    type: "CLEAR_MANIFESTATION_QUOTATIONS"
  };
};
export var startManifestationQuotationsFetch = () => {
  return{
    type: "START_MANIFESTATION_QUOTATIONS_FETCH"
  };
};
export var completeManifestationQuotationsFetch = (manifestationQuotations) => {
  return{
    type: "COMPLETE_MANIFESTATION_QUOTATIONS_FETCH",
    manifestationQuotations
  };
};
export var fetchManifestationQuotations = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var searchText = state.search.searchParameters.searchText || "";

    var query = ""

    if (state.focusedQuotation.id != undefined){
      var expressionQuotationId = state.focusedQuotation.id;
      query = [
            "SELECT ?quotation ?isManifestationOf ?quotation_text ",
            "WHERE {",
            "<" + expressionQuotationId + "> <http://scta.info/property/hasManifestation> ?quotation .",
            "?quotation <http://scta.info/property/isManifestationOf> ?isManifestationOf .",
            "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            "}"
          ].join('');
    }
    else{
      query = [
          "SELECT ?quotation ?isManifestationOf ?quotation_text ",
          "WHERE {",
          "?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .",
          "?quotation a <http://scta.info/resource/manifestation> .",
          "?quotation <http://scta.info/property/isManifestationOf> ?isManifestationOf .",
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
          "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
          "}",
          "ORDER BY ?isInstanceOf ",
          "LIMIT 100"
        ].join('');
      }

    dispatch(startManifestationQuotationsFetch());
    axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings

      dispatch(completeManifestationQuotationsFetch(results));
    });
  };
}

//paragraph actions

export var clearParagraph = () => {
  return{
    type: "CLEAR_PARAGRAPH"
  };
};

export var startParagraphFetch = () => {
  return{
    type: "START_PARAGRAPH_FETCH"
  };
};
export var completeParagraphFetch = (paragraph) => {
  return{
    type: "COMPLETE_PARAGRAPH_FETCH",
    paragraph
  };
};
export var fetchParagraph = () =>{
  return (dispatch, getState) => {
    var state = getState();

    if (state.focusedQuotation){
      var quotationId = state.focusedQuotation.id;
      //var expressionQuotationId = quotationid;
      var query = "";
      var idType = state.focusedQuotation.type

      if (idType === "expression"){
        query = [
          "CONSTRUCT",
          "{",
            "?expression_paragraph <http://scta.info/property/hasDefaultManifestation> ?manifestation_paragraph ;",
            "<http://scta.info/property/hasManifestations> ?manifestations ;",
            "<http://scta.info/property/hasDefaultTranscription> ?transcription_paragraph ;",
            "<http://scta.info/property/isPartOfStructureItem> ?transcription_item ;",
            "<http://scta.info/property/hasDocument> ?transcription_item_file ;",
            "<http://scta.info/property/hasXML> ?xml_url .",
          "}",
          "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?expression_paragraph .",
            "?expression_paragraph <http://scta.info/property/hasCanonicalManifestation> ?manifestation_paragraph .",
            "?expression_paragraph <http://scta.info/property/hasManifestation> ?manifestations .",
            "?manifestation_paragraph <http://scta.info/property/isManifestationOf> ?expression_paragraph .",
            "?manifestation_paragraph <http://scta.info/property/hasCanonicalTranscription> ?transcription_paragraph .",
            "?transcription_paragraph <http://scta.info/property/isPartOfStructureItem> ?transcription_item .",
            "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
            "?transcription_paragraph <http://scta.info/property/hasXML> ?xml_url .",
          "}"
          ].join('');
        }
      else if (idType === "manifestation"){
        query = [
          "CONSTRUCT",
          "{",
            "?expression_paragraph <http://scta.info/property/hasDefaultManifestation> ?manifestation_paragraph ;",
             "<http://scta.info/property/hasManifestations> ?manifestations ;",
             "<http://scta.info/property/hasDefaultTranscription> ?transcription_paragraph ;",
             "<http://scta.info/property/isPartOfStructureItem> ?transcription_item ;",
             "<http://scta.info/property/hasDocument> ?transcription_item_file ;",
             "<http://scta.info/property/hasXML> ?xml_url .",
          "}",
          "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?manifestation_paragraph . ",
            "?manifestation_paragraph <http://scta.info/property/isManifestationOf> ?expression_paragraph .",
            "?expression_paragraph <http://scta.info/property/hasManifestation> ?manifestations .",
            "?manifestation_paragraph <http://scta.info/property/hasCanonicalTranscription> ?transcription_paragraph .",
            "?transcription_paragraph <http://scta.info/property/isPartOfStructureItem> ?transcription_item .",
            "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
            "?transcription_paragraph <http://scta.info/property/hasXML> ?xml_url .",
          "}"
        ].join('');
      }

      dispatch(startParagraphFetch());
      axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
        var results = res.data
        if (results){
          axios.get(results.hasXML).then(function(res2){
            var paragraph = {
              expression_id: results["@id"],
              manifestations: results.hasManifestations,
              manifestation_id: results.hasDefaultManifestation,
              transcription_id: results.hasDefaultTranscription,
              transcription_item_file: results.hasDocument,
              paragraph_text: res2.data
            }
            dispatch(completeParagraphFetch(paragraph));
            dispatch(fetchReview());
          });
        }
      }).catch((err) => {
        console.log("error:", err)
      })
      ;
    };
  };
};
export var startReviewFetch = () => {
  return{
    type: "START_REVIEW_FETCH"
  };
};
export var completeReviewFetch = (review) => {
  return{
    type: "COMPLETE_REVIEW_FETCH",
    review
  };
};
export var fetchReview = () =>{
  return (dispatch, getState) => {
    var state = getState();

    if (state.paragraph.transcription_item_file){
      var url = state.paragraph.transcription_item_file;
      var reviewUrl = "http://dll-review-registry.scta.info/api/v1/reviews?url=" + url + "&society=MAA";
      dispatch(startReviewFetch());
      axios.get(reviewUrl).then(function(res){
        var review = res.data[0];
        dispatch(completeReviewFetch(review));
      });
    };
  };
};

//Source Paragraph Actions

export var clearSourceParagraph = () => {
  return{
    type: "CLEAR_SOURCE_PARAGRAPH"
  };
};

export var startSourceParagraphFetch = () => {
  return{
    type: "START_SOURCE_PARAGRAPH_FETCH"
  };
};
export var completeSourceParagraphFetch = (sourceParagraph) => {
  return{
    type: "COMPLETE_SOURCE_PARAGRAPH_FETCH",
    sourceParagraph
  };
};
export var fetchSourceParagraph = () =>{
  return (dispatch, getState) => {
    var state = getState();

    if (state.focusedQuotation){
      var sourceParagraphid = state.focusedQuotation.source;
      //var expressionQuotationId = quotationid;
      var query = [
        "CONSTRUCT",
        "{",
          "?expression_paragraph <http://scta.info/property/hasDefaultManifestation> ?manifestation_paragraph ;",
           "<http://scta.info/property/hasManifestations> ?manifestations ;",
           "<http://scta.info/property/hasDefaultTranscription> ?transcription_paragraph ;",
           "<http://scta.info/property/isPartOfStructureItem> ?transcription_item ;",
           "<http://scta.info/property/hasDocument> ?transcription_item_file ;",
           "<http://scta.info/property/hasXML> ?xml_url .",
        "}",
          "WHERE { ",
          "BIND(<" + sourceParagraphid + "> as ?expression_paragraph) .",
          "?expression_paragraph <http://scta.info/property/hasCanonicalManifestation> ?manifestation_paragraph .",
          "?expression_paragraph <http://scta.info/property/hasManifestation> ?manifestations .",
          "?manifestation_paragraph <http://scta.info/property/hasCanonicalTranscription> ?transcription_paragraph .",
          "?transcription_paragraph <http://scta.info/property/isPartOfStructureItem> ?transcription_item .",
          "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
          "?transcription_paragraph <http://scta.info/property/hasXML> ?xml_url .",
          "}"
        ].join('');

      dispatch(startSourceParagraphFetch());
      axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
        var results = res.data
        if (results){
          axios.get(results.hasXML).then(function(res2){
            var sourceParagraph = {
              expression_id: results["@id"],
              manifestations: results.hasManifestations,
              manifestation_id: results.hasDefaultManifestation,
              transcription_id: results.hasDefaultTranscription,
              transcription_item_file: results.hasDocument,
              paragraph_text: res2.data
            }
            dispatch(completeSourceParagraphFetch(sourceParagraph));
          //dispatch(fetchSourceParagraphReview());
          });
        }
      });
    };
  };
};
export var startSourceParagraphReviewFetch = () => {
  return{
    type: "START_SOURCE_PARAGRAPH_REVIEW_FETCH"
  };
};
export var completeSourceParagraphReviewFetch = (review) => {
  return{
    type: "COMPLETE_SOURCE_PARAGRAPH_FETCH",
    review
  };
};
export var fetchSourceParagraphReview = () =>{
  return (dispatch, getState) => {
    var state = getState();

    if (state.sourceParagraph.transcription_item_file){
      var url = state.sourceParagraph.transcription_item_file;
      var reviewUrl = "http://dll-review-registry.scta.info/api/v1/reviews?url=" + url + "&society=MAA";
      dispatch(startSourceParagraphFetch());
      axios.get(reviewUrl).then(function(res){
        var review = res.data[0];
        dispatch(completeSourceParagraphReviewFetch(review));
      });
    };
  };
};

// Full text actions

//paragraph actions

export var toggleFullTextDisplay = (current) => {
  return{
    type: "TOGGLE_FULL_TEXT_DISPLAY",
    current
  };
}
export var clearFullText = () => {
  return{
    type: "CLEAR_FULL_TEXT"
  };
};

export var startFullTextFetch = () => {
  return{
    type: "START_FULL_TEXT_FETCH"
  };
};
export var completeFullTextFetch = (text) => {
  return{
    type: "COMPLETE_FULL_TEXT_FETCH",
    text
  };
};
export var fetchFullText = (source=false) =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = "";
    if (state.focusedQuotation){
      var quotationId = state.focusedQuotation.id;
      //var expressionQuotationId = quotationid;
      var idType = state.focusedQuotation.type

      if (source === true){
        query = [
          "SELECT ?expression_item ?manifestation_item ?transcription_item ?xml_url ?transcription_item_file ",
          "WHERE { ",
          "BIND(<" + state.focusedQuotation.source + "> AS ?expression_block) .",
          "?expression_block <http://scta.info/property/isPartOfStructureItem> ?expression_item .",
          "?expression_item <http://scta.info/property/hasCanonicalManifestation> ?manifestation_item .",
          "?manifestation_item <http://scta.info/property/hasCanonicalTranscription> ?transcription_item .",
          "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
          "?transcription_item <http://scta.info/property/hasXML> ?xml_url .",
          "}"
        ].join('');
      }
      else if (idType === "expression"){
        query = [
            "SELECT ?expression_item ?manifestation_item ?transcription_item ?xml_url ?transcription_item_file ",
            "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?expression_block .",
            "?expression_block <http://scta.info/property/isPartOfStructureItem> ?expression_item .",
            "?expression_item <http://scta.info/property/hasCanonicalManifestation> ?manifestation_item .",
            "?manifestation_item <http://scta.info/property/hasCanonicalTranscription> ?transcription_item .",
            "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
            "?transcription_item <http://scta.info/property/hasXML> ?xml_url .",
            "}"
          ].join('');
        }
      else if (idType === "manifestation"){
        query = [
            "SELECT ?expression_item ?manifestation_item ?transcription_item ?xml_url ?transcription_item_file ",
            "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?manifestation_block . ",
            "?manifestation_block <http://scta.info/property/isPartOfStructureItem> ?manifestation_item .",
            "?manifestation_item <http://scta.info/property/isManifestationOf> ?expression_item .",
            "?manifestation_item <http://scta.info/property/hasCanonicalTranscription> ?transcription_item .",
            "?transcription_item <http://scta.info/property/hasDocument> ?transcription_item_file .",
            "?transcription_item <http://scta.info/property/hasXML> ?xml_url .",
            "}"
          ].join('');
      }
      console.log(query)
      dispatch(startFullTextFetch());
      axios.get(sparqlEndpoint, {params: {"query" : query, "output": "json"}}).then(function(res){
        var results = res.data.results.bindings[0];
        console.log("full text results", results)
        axios.get(results.xml_url.value).then(function(res2){
          var text = {
            expression_id: results.expression_item.value,
            manifestation_id: results.manifestation_item.value,
            transcription_id: results.transcription_item.value,
            transcription_item_file: results.transcription_item_file ? results.transcription_item_file.value : "",
            text: res2.data
          }
          dispatch(completeFullTextFetch(text));
          dispatch(fetchReview());
        });
      });
    };
  };
};

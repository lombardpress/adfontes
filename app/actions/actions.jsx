var axios = require('axios');

///search actions
//===============
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
          workGroupSparql,
          authorSparql,
          "?expression <http://scta.info/property/shortId> ?expressionShortId .",
          "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
          "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
          "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
          "?expression <http://purl.org/dc/terms/isPartOf> ?workGroup .",
          "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
          "}",
        "ORDER BY ?expressionTitle"].join('');

  dispatch(startSearchWorksFetch());
  axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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
export var startAuthorsFetch = () => {
  return{
    type: "START_AUTHORS_FETCH"
  };
};
export var completeAuthorsFetch = (authors) => {
  return{
    type: "COMPLETE_AUTHORS_FETCH",
    authors
  };
};
export var fetchAuthors = () =>{
  return (dispatch, getState) => {
    var state = getState();
    var query = [
        "SELECT ?author ?authorTitle ?authorShortId ",
        "WHERE { ",
        "?author a <http://scta.info/resource/person> .",
        "?author <http://scta.info/property/shortId> ?authorShortId .",
        "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
        "}",
        "ORDER BY ?authorTitle"].join('');

  dispatch(startAuthorsFetch());
  axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var authors = results.map((result) => {
        var authorInfo = {
          author: result.author.value,
          authorShortId: result.authorShortId.value,
          authorTitle: result.authorTitle.value,
        }
        return authorInfo

      });
      dispatch(completeAuthorsFetch(authors));
    });
  }
};
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
    var query = [
        "SELECT ?type ?expression ?expressionShortId ?expressionTitle ?author ?authorTitle ?workGroup ?workGroupTitle",
        "WHERE { ",
        "{",
        "?expression a <http://scta.info/resource/work> .",
        "?expression a ?type .",
        "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
        "}",
        "UNION{",
        "?expression a <http://scta.info/resource/expression> .",
        "?expression a ?type .",
        "?expression <http://scta.info/property/level> '1' . ",
        "?expression <http://scta.info/property/shortId> ?expressionShortId .",
        "?expression <http://purl.org/dc/elements/1.1/title> ?expressionTitle .",
        "?expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
        "?author <http://purl.org/dc/elements/1.1/title> ?authorTitle .",
        "?expression <http://purl.org/dc/terms/isPartOf> ?workGroup .",
        "?workGroup <http://purl.org/dc/elements/1.1/title> ?workGroupTitle .",
        "}",
        "}",
        "ORDER BY ?expressionTitle"].join('');

  dispatch(startQuotationWorksListFetch());
  axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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
        "SELECT ?expressionType ?expressionTypeTitle ?expressionTypeShortId",
        "WHERE { ",
        "?expressionType a <http://scta.info/resource/expressionType> .",
        "?expressionType <http://scta.info/property/shortId> ?expressionTypeShortId .",
        "?expressionType <http://purl.org/dc/elements/1.1/title> ?expressionTypeTitle .",
        "}",
        "ORDER BY ?expressionTypeTitle"].join('');

  dispatch(startExpressionTypeFetch());
  axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
    var results = res.data.results.bindings;
    var expressionTypes = results.map((result) => {
      var expressionTypeInfo = {
          expressionType: result.expressionType.value,
          expressionTypeShortId: result.expressionTypeShortId,
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
  axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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




// Quotation Actions
// ==================
export var addQuotations = (quotations) => {
  return{
    type: "ADD_QUOTATIONS",
    quotations
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
    ///
    // var quotationTypeSparql = ""
    // if (quotationType != ""){
    //   var quotationTypeSparql = "?quotation <http://scta.info/property/quotationType>	<http://scta.info/resource/" + quotationType + "> ."
    // }
    var expressionIdSparql = "";
    if (state.search.searchParameters.expressionId != ""){
      var expressionIdSparql = [
      "?quotation <http://scta.info/property/isPartOfTopLevelExpression> <http://scta.info/resource/" + state.search.searchParameters.expressionId + "> ."
      ].join('');

    }
    var authorSparql = "";
    if (state.search.searchParameters.expressionAuthor){
      authorSparql = [
      "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> .",
      ].join('');
    }
    var quotationTypeSparql = "";
    if (state.search.searchParameters.quotationType != "" ){
      var quotationTypeSparql = [
        "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
        "?isInstanceOf <http://scta.info/property/quotationType>	<http://scta.info/resource/" + state.search.searchParameters.quotationType + "> ."
      ].join('');
    }
    else if (state.search.searchParameters.quotationType != "" && state.canonicalQuotation){
      var quotationTypeSparql = [
        "?isInstanceOf <http://scta.info/property/quotationType>	<http://scta.info/resource/" + state.search.searchParameters.quotationType + "> ."
      ].join('');
    }
    else if (state.search.searchParameters.quotationWork){
     var quotationTypeSparql = "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf ."
    }
    else{
      var quotationTypeSparql = [
      "OPTIONAL {",
        "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
      "}"
    ].join('');
    }

    var quotationWorkSparql = "";
    if (state.search.searchParameters.quotationWork){
      quotationWorkSparql = [
      "?isInstanceOf <http://scta.info/property/fromBiblicalBook> <http://scta.info/resource/" + state.search.searchParameters.quotationWork + "> .",
      ].join('');
    }
    var workGroupSparql = "";
    if (state.search.searchParameters.workGroup){
      workGroupSparql = [
      "<http://scta.info/resource/" + state.search.searchParameters.workGroup + "> <http://scta.info/property/hasExpression> ?toplevel_expression .",
      ].join('');
    }
    var query = ""
    if (state.canonicalQuotation){
      var canonicalQuotationId = state.canonicalQuotation.id;
      var query = [
            "SELECT ?quotation ?isInstanceOf ?quotation_text ?toplevel_expression_title ?author_title ",
            "WHERE {",
            "<" + canonicalQuotationId + "> <http://scta.info/property/hasInstance> ?quotation .",
            expressionIdSparql,
            quotationTypeSparql,
            quotationWorkSparql,
            "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            "?quotation <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression . ",
            workGroupSparql,
            authorSparql,
            "?toplevel_expression <http://purl.org/dc/elements/1.1/title> ?toplevel_expression_title . ",
            "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
            "?author <http://purl.org/dc/elements/1.1/title> ?author_title . ",
            "}"
          ].join('');
    }
    else{
      var query = [
          "SELECT ?quotation ?isInstanceOf ?quotation_text ?toplevel_expression_title ?author_title ",
          "WHERE {",
          "?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .",
          "?quotation a <http://scta.info/resource/expression> .",
          expressionIdSparql,
          quotationTypeSparql,
          quotationWorkSparql,
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
          "?quotation <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression . ",
          workGroupSparql,
          authorSparql,
          "?toplevel_expression <http://purl.org/dc/elements/1.1/title> ?toplevel_expression_title . ",
          "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> ?author . ",
          "?author <http://purl.org/dc/elements/1.1/title> ?author_title . ",
          "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
          "}",
          "ORDER BY ?quotation_text ",
          "LIMIT 1000"
        ].join('');
      }
    dispatch(startQuotationsFetch());
    axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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

    var quotationTypeSparql = ""
    if (state.search.searchParameters.quotationType){
      var quotationTypeSparql = "?quotation <http://scta.info/property/quotationType>	<http://scta.info/resource/" + state.search.searchParameters.quotationType + "> ."
    }
    var expressionIdSparql = "";
    if (state.search.searchParameters.expressionId){
      var expressionIdSparql = [
      // "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
      "?quotationInstance <http://scta.info/property/isPartOfTopLevelExpression> <http://scta.info/resource/" + state.search.searchParameters.expressionId + "> .",
      ].join('');
    }
    var authorSparql = "";
    if (state.search.searchParameters.expressionAuthor){
      authorSparql = [
      // "?quotation <http://scta.info/property/hasInstance> ?quotationInstance .",
      // "?quotationInstance <http://scta.info/property/isPartOfTopLevelExpression> ?toplevel_expression .",
      "?toplevel_expression <http://www.loc.gov/loc.terms/relators/AUT> <http://scta.info/resource/" + state.search.searchParameters.expressionAuthor + "> .",
      ].join('');
    }
    var quotationWorkSparql = "";
    if (state.search.searchParameters.quotationWork){
      quotationWorkSparql = [
      "?quotation <http://scta.info/property/fromBiblicalBook> <http://scta.info/resource/" + state.search.searchParameters.quotationWork + "> .",
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

    var query = [
          "SELECT DISTINCT ?quotation ?citation ?quotation_text ",
          "WHERE {",
          "?quotation a <http://scta.info/resource/quotation> .",
          "?quotation <http://scta.info/property/quotation> ?quotation_text .",
          quotationInstanceSparql,
          topLevelExpressionSparql,
          authorSparql,
          workGroupSparql,
          quotationWorkSparql,
          expressionIdSparql,
          quotationTypeSparql,
          "OPTIONAL { ",
          "?quotation <http://scta.info/property/citation> ?citation .",
          "}",
          "FILTER (REGEX(STR(?quotation_text), '" + searchText + "', 'i')) .",
          "}",
          "ORDER BY ?citation "
        ].join('');
    dispatch(startQuotationsFetch());
    axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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
          "LIMIT 1000"
        ].join('');
      }

    dispatch(startManifestationQuotationsFetch());
    axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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
            "SELECT ?expression_paragraph ?manifestation_paragraph ?transcription_paragraph ?xml_url ",
            "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?expression_paragraph .",
            "?expression_paragraph <http://scta.info/property/hasCanonicalManifestation> ?manifestation_paragraph .",
            "?manifestation_paragraph <http://scta.info/property/hasCanonicalTranscription> ?transcription_paragraph .",
            "?transcription_paragraph <http://scta.info/property/hasXML> ?xml_url .",
            "}"
          ].join('');
        }
      else if (idType === "manifestation"){
        query = [
            "SELECT ?expression_paragraph ?manifestation_paragraph ?transcription_paragraph ?xml_url ",
            "WHERE { ",
            "<" + quotationId + "> <http://scta.info/property/isPartOfStructureBlock> ?manifestation_paragraph . ",
            "?manifestation_paragraph <http://scta.info/property/isManifestationOf> ?expression_paragraph .",
            "?manifestation_paragraph <http://scta.info/property/hasCanonicalTranscription> ?transcription_paragraph .",
            "?transcription_paragraph <http://scta.info/property/hasXML> ?xml_url .",
            "}"
          ].join('');
      }

      dispatch(startParagraphFetch());
      axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
        var results = res.data.results.bindings[0];
        axios.get(results.xml_url.value).then(function(res2){
          var paragraph = {
            expression_id: results.expression_paragraph.value,
            manifestation_id: results.manifestation_paragraph.value,
            transcription_id: results.transcription_paragraph.value,
            paragraph_text: res2.data
          }
          dispatch(completeParagraphFetch(paragraph));
        });
      });
    }
  };
}

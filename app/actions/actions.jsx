var axios = require('axios');

export var setSearchText = (searchText) => {
  return {
    type: "SET_SEARCH_TEXT",
    searchText
  };
};
export var toggleShowCompleted = () => {
  return {
    type: "TOGGLE_SHOW_COMPLETED"
  };
};
export var addTodo = (text) => {
  return {
    type: "ADD_TODO",
    text
  };
};
export var addTodos = (todos) => {
  return{
    type: "ADD_TODOS",
    todos
  };
};
export var toggleTodo = (id) => {
  return{
    type: "TOGGLE_TODO",
    id
  };
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
export var fetchQuotations = (searchText = "") =>{
  return (dispatch, getState) => {
    var state = getState();

    var query = ""
    if (state.canonicalQuotation){
      var canonicalQuotationId = state.canonicalQuotation.id;
      var query = [
            "SELECT ?quotation ?isInstanceOf ?quotation_text ",
            "WHERE {",
            "<" + canonicalQuotationId + "> <http://scta.info/property/hasInstance> ?quotation .",
            "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
            "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
            "}"
          ].join('');
    }
    else{
      var query = [
          "SELECT ?quotation ?isInstanceOf ?quotation_text ",
          "WHERE {",
          "?quotation <http://scta.info/property/structureElementType> <http://scta.info/resource/structureElementQuote> .",
          "?quotation a <http://scta.info/resource/expression> .",
          "OPTIONAL {",
            "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "}",
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
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
export var fetchCanonicalQuotations = (searchText = "") =>{
  return (dispatch, getState) => {
    var state = getState();


    var query = [
          "SELECT ?quotation ?citation ?quotation_text ",
          "WHERE {",
          "?quotation a <http://scta.info/resource/quotation> .",
          "?quotation <http://scta.info/property/quotation> ?quotation_text .",
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
export var fetchManifestationQuotations = (searchText = "") =>{
  return (dispatch, getState) => {
    var state = getState();

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
    axios.get('http://localhost:3030/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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
      axios.get('http://localhost:3030/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
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

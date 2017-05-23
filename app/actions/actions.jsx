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
export var completeQuotationsFetch = (quotations) => {
  return{
    type: "COMPLETE_QUOTATIONS_FETCH",
    quotations
  };
};
export var fetchQuotations = () =>{
  return (dispatch, getState) => {
    var state = getState();
    console.log(state);
    var canonicalQuotationId = state.canonicalQuotation.id;
    var query = [
          "SELECT ?quotation ?isInstanceOf ?quotation_text ",
          "WHERE {",
          "<" + canonicalQuotationId + "> <http://scta.info/property/hasInstance> ?quotation .",
          "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
          "}"
        ].join('');
    var queryText = [
          "SELECT ?quotation ?isInstanceOf ?quotation_text ",
          "WHERE {",
          "?quotation <http://scta.info/property/structureElementType><http://scta.info/resource/structureElementQuote> .",
          "?quotation <http://scta.info/property/isInstanceOf> ?isInstanceOf .",
          "?quotation <http://scta.info/property/structureElementText> ?quotation_text .",
          "FILTER (REGEX(STR(?quotation_text), 'fides', 'i')) .",
          "}",
          "ORDER BY ?quotation_text"
        ].join('');
    dispatch(startQuotationsFetch());
    axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings
      console.log(results);
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

export var clearQuotationFocus = () => {
  console.log("clear Quotation firing");
  return{
    type: "CLEAR_QUOTATION_FOCUS"
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

// CanonicalQuotations (plural) Actions
export var changeCanonicalQuotationsFocus = (id) => {
  return{
    type: "CHANGE_CANONICAL_QUOTATIONS_FOCUS",
    id
  }
}
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


    var query = [
          "SELECT ?quotation ?quotation_text ",
          "WHERE {",
          "?quotation a <http://scta.info/resource/quotation> .",
          "?quotation <http://scta.info/property/quotation> ?quotation_text .",
          "}"
        ].join('');
    dispatch(startQuotationsFetch());
    axios.get('http://sparql-staging.scta.info/ds/query', {params: {"query" : query, "output": "json"}}).then(function(res){
      var results = res.data.results.bindings
      console.log("results", results);
      dispatch(completeCanonicalQuotationsFetch(results));
    });
  };
}

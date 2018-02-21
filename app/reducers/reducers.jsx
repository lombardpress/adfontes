var uuid = require('node-uuid');
var moment = require('moment');

export var searchReducer = (state = {}, action) => {
  switch (action.type){
    case 'CLEAR_SEARCH_PARAMETERS':
      return {
        ...state,
        searchParameters: []
        }
    case 'SET_SEARCH_PARAMETERS':
      return {
        ...state,
        searchParameters: action.searchParameters
        }
    case 'START_SEARCH_WORKS_FETCH':
        return {
          ...state,
          searchWorks: []
        }
    case 'COMPLETE_SEARCH_WORKS_FETCH':
      return {
        ...state,
        searchWorks: action.listOfWorks
      }
    case 'START_QUOTATION_AUTHORS_FETCH':
        return {
          ...state,
          quotationAuthors: []
        }
    case 'COMPLETE_QUOTATION_AUTHORS_FETCH':
      return {
        ...state,
        quotationAuthors: action.authors
      }
    case 'START_EXPRESSION_AUTHORS_FETCH':
        return {
          ...state,
          expressionAuthors: []
        }
    case 'COMPLETE_EXPRESSION_AUTHORS_FETCH':
      return {
        ...state,
        expressionAuthors: action.authors
      }
    case 'START_QUOTATION_WORKS_LIST_FETCH':
        return {
          ...state,
          quotationWorksList: []
        }
    case 'COMPLETE_QUOTATION_WORKS_LIST_FETCH':
      return {
        ...state,
        quotationWorksList: action.quotationWorksList
      }
    case 'START_QUOTATION_WORK_PARTS_FETCH':
      return {
        ...state,
        quotationWorkParts: []
      }
    case 'COMPLETE_QUOTATION_WORK_PARTS_FETCH':
      return {
        ...state,
        quotationWorkParts: action.parts
      }
    case 'START_EXPRESSION_PARTS_FETCH':
      return {
        ...state,
        expressionParts: []
      }
    case 'COMPLETE_EXPRESSION_PARTS_FETCH':
      return {
        ...state,
        expressionParts: action.parts
      }
    case 'START_EXPRESSION_TYPE_FETCH':
        return {
          ...state,
          expressionTypes: []
        }
    case 'COMPLETE_EXPRESSION_TYPE_FETCH':
      return {
        ...state,
        expressionTypes: action.expressionTypes
      }
    case 'START_WORK_GROUPS_FETCH':
        return {
          ...state,
          workGroups: []
        }
    case 'COMPLETE_WORK_GROUPS_FETCH':
      return {
        ...state,
        workGroups: action.workGroups
      }
    case 'START_AUTHOR_TYPES_FETCH':
        return {
          ...state,
          authorTypes: []
        }
    case 'COMPLETE_AUTHOR_TYPES_FETCH':
      return {
        ...state,
        authorTypes: action.authorTypes
      }
    default:
      return state
  };
};
export var chartReducer = (state = {}, action) => {
  switch (action.type){
    case 'TOGGLE_GRAPH_DISPLAY':
        return {
          ...state,
          visible: !action.current
        }
    case 'START_CHART_FETCH':
        return {
          ...state,
          count: []
        }
    case 'COMPLETE_CHART_FETCH':
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  };
};

export var imagesReducer = (state = {}, action) => {
  switch (action.type){
    case 'TOGGLE_IMAGES_DISPLAY':
        return {
          ...state,
          visible: !action.current
        }
    case 'TOGGLE_GRAPH_DISPLAY':
      return {
        ...state,
        visible: false
      }
    case 'START_IMAGES_FETCH':
        return {
          ...state,
          images: []
        }
    case 'COMPLETE_IMAGES_FETCH':
      return {
        ...state,
        images: action.images
      }
    default:
      return state
  };
};

export var quotationsReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_QUOTATIONS':
      return [
        ...state,
        ...action.quotations
      ];
    case 'ADD_QUOTATIONS':
      return [
        ...state,
        ...action.quotations
      ];
    case 'CLEAR_QUOTATIONS':
      return [];
    case 'START_QUOTATIONS_FETCH':
      return [];
    case 'COMPLETE_QUOTATIONS_FETCH':
      return action.quotations.map((quotation)=>{
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          title: quotation.toplevel_expression_title.value,
          author: quotation.author_title.value,
          focused: false,
          isInstanceOf: quotation.isInstanceOf ? quotation.isInstanceOf.value : null,
          citation: quotation.citation ? quotation.citation.value : null,
          refText: quotation.refText ? quotation.refText.value : null,
        }
      });
    case 'CHANGE_QUOTATIONS_FOCUS':
      var updatedState = state.map((quotation) =>{
        if (quotation.id === action.id){
          return{
            ...quotation,
            focused: true
          }
        }
        else{
          return{
            ...quotation,
            focused: false
          }
        }
      });
      return [
        ...updatedState,
      ];
    default:
      return state;
  };
};

export var focusedQuotationReducer = (state = {}, action) => {
  switch (action.type){
    case 'CREATE_FOCUSED_QUOTATION':
      return action.quotation;
    case 'CLEAR_FOCUSED_QUOTATION':
      return {}
    default:
      return state;
  };
};
export var canonicalQuotationReducer = (state = {}, action) => {
  switch (action.type){
    case 'CREATE_CANONICAL_QUOTATION':
      return action.quotation;
    case 'CLEAR_CANONICAL_QUOTATION':
      return null;
    default:
      return state;
  };
};

/// Canonical Quotations Plural Reducer

export var canonicalQuotationsReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_CANONICAL_QUOTATIONS':
      return [
        ...state,
        ...action.quotations
      ];
    case 'CLEAR_CANONICAL_QUOTATIONS':
      return []
    case 'START_CANONICAL_QUOTATIONS_FETCH':
      return []
    case 'COMPLETE_CANONICAL_QUOTATIONS_FETCH':

      return action.canonicalQuotations.map((quotation) => {
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          citation: quotation.citation ? quotation.citation.value : "citation not yet recorded",
          focused: false,
        }
      });
    case 'CLEAR_CANONICAL_QUOTATIONS_FOCUS':
      return state.map((quotation) => {
        return{
          ...quotation,
          focused: false
        }
      });
    case 'CHANGE_CANONICAL_QUOTATIONS_FOCUS':
      var updatedState = state.map((quotation) =>{
        if (quotation.id === action.id){
          return{
            ...quotation,
            focused: true
          }
        }
        else{
          return{
            ...quotation,
            focused: false
          }
        }
      });
      return [
        ...updatedState,
      ];
    default:
      return state;
  };
};

/// manifestation quotations reducer
export var manifestationQuotationsReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_MANIFESTATION_QUOTATIONS':
      return [
        ...state,
        ...action.quotations
      ];
    case 'CLEAR_MANIFESTATION_QUOTATIONS':
      return []
    case 'START_MANIFESTATION_QUOTATIONS_FETCH':
      return []
    case 'COMPLETE_MANIFESTATION_QUOTATIONS_FETCH':

      return action.manifestationQuotations.map((quotation) => {
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          focused: false,
          isManifestationOf: quotation.isManifestationOf ? quotation.isManifestationOf.value : null
        }
      });
    case 'CLEAR_MANIFESTATION_QUOTATIONS_FOCUS':
      return state.map((quotation) => {
        return{
          ...quotation,
          focused: false
        }
      });
    case 'CHANGE_MANIFESTATION_QUOTATIONS_FOCUS':
      var updatedState = state.map((quotation) =>{
        if (quotation.id === action.id){
          return{
            ...quotation,
            focused: true
          }
        }
        else{
          return{
            ...quotation,
            focused: false
          }
        }
      });
      return [
        ...updatedState,
      ];
    default:
      return state;
  };
};

// paragraphReducer
export var paragraphReducer = (state = {}, action) => {
  switch (action.type){
    case 'ADD_PARAGRAPH':
      return action.paragraph;
    case 'CLEAR_PARAGRAPH':
      return {}
    case 'START_PARAGRAPH_FETCH':
      return {}
    case 'COMPLETE_PARAGRAPH_FETCH':
      return action.paragraph
    case 'START_REVIEW_FETCH':
      return state
    case 'COMPLETE_REVIEW_FETCH':
      return {
        ...state,
        review: action.review
      }
    default:
      return state;
  }
};

// paragraphReducer
export var fullTextReducer = (state = {}, action) => {
  switch (action.type){
    case 'TOGGLE_FULL_TEXT_DISPLAY':
      return {
        ...state,
        visible: !action.current
      }
    case 'ADD_FULL_TEXT':
      return {
        ...state,
        textInfo: action.text
      }
    case 'CLEAR_FULL_TEXT':
      return {
        ...state,
        textInfo: {}
      }
    case 'START_FULL_TEXT_FETCH':
      return {
        ...state,
        textInfo: {}
      }
    case 'COMPLETE_FULL_TEXT_FETCH':
      return {
        ...state,
        textInfo: action.text
      }
    default:
      return state;
  }
};

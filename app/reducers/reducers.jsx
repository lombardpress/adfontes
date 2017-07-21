var uuid = require('node-uuid');
var moment = require('moment');

export var searchReducer = (state = {}, action) => {
  switch (action.type){
    case 'SET_SEARCH_PARAMETERS':
      return action.searchParameters;
    default:
      return state
  };
};
export var showCompletedReducer = (state = false, action) => {
  switch (action.type){
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
};
// todos reducer,
export var todosReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
					text: action.text,
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined
        }
      ];
  // match item then change completed property to true
  // and update completed at
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id){
          return {
            ...todo,
  					completed: !todo.completed,
  					completedAt: !todo.completed ? moment().unix() : undefined
          };
        }
        else{
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
          ...state,
          ...action.todos
        ];


    default:
      return state;
  };
};

export var quotationsReducer = (state = [], action) => {
  switch (action.type){
    case 'ADD_QUOTATIONS':
      return [
        ...state,
        ...action.quotations
      ];
    case 'CLEAR_QUOTATIONS_FOCUS':
      return state.map((quotation) => {
        return{
          ...quotation,
          focused: false
        }
      });
    case 'START_QUOTATIONS_FETCH':
      return []
    case 'COMPLETE_QUOTATIONS_FETCH':
      return action.quotations.map((quotation)=>{
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          focused: false,
          isInstanceOf: quotation.isInstanceOf ? quotation.isInstanceOf.value : null
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
      return actiona.paragraph;
      case 'CLEAR_PARAGRAPH':
        return {}
      case 'START_PARAGRAPH_FETCH':
        return {}
      case 'COMPLETE_PARAGRAPH_FETCH':
        return action.paragraph
      default:
        return state;
  }
};

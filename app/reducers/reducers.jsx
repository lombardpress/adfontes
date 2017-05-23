var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
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
    case 'START_QUOTATIONS_FETCH':
      return []
    case 'COMPLETE_QUOTATIONS_FETCH':
      return action.quotations.map((quotation)=>{
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          focused: false,
          isIstanceOf: quotation.isInstanceOf.value ? quotation.isInstanceOf.value : null
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
    case 'CLEAR_QUOTATION_FOCUS':
      return {}
    default:
      return state;
  };
};
export var canonicalQuotationReducer = (state = {}, action) => {
  switch (action.type){
    case 'CREATE_CANONICAL_QUOTATION':
      return action.quotation;
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
    case 'START_CANONICAL_QUOTATIONS_FETCH':
      return []
    case 'COMPLETE_CANONICAL_QUOTATIONS_FETCH':

      return action.canonicalQuotations.map((quotation)=>{
        return {
          id: quotation.quotation.value,
          quotation: quotation.quotation_text.value,
          focused: false,
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

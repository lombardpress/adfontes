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

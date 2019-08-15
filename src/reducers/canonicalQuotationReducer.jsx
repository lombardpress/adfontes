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

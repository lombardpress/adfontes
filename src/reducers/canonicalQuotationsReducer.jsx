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

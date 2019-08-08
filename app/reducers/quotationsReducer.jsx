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
      //return [];
      return "fetching";
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
          refType: quotation.refType ? quotation.refType.value.split("/resource/").reverse()[0] : null,
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

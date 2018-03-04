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

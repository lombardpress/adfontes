export var sourceParagraphReducer = (state = {}, action) => {
  switch (action.type){
    case 'ADD_SOURCE_PARAGRAPH':
      return action.sourceParagraph;
    case 'CLEAR_SOURCE_PARAGRAPH':
      return {}
    case 'START_SOURCE_PARAGRAPH_FETCH':
      return {}
    case 'COMPLETE_SOURCE_PARAGRAPH_FETCH':
      return action.sourceParagraph
    case 'START_SOURCE_PARAGRAPH_REVIEW_FETCH':
      return state
    case 'COMPLETE_SOURCE_PARAGRAPH_REVIEW_FETCH':
      return {
        ...state,
        review: action.review
      }
    default:
      return state;
  }
};

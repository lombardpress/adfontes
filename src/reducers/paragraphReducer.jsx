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

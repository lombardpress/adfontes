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

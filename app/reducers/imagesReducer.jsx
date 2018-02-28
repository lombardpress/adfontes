export var imagesReducer = (state = {}, action) => {
  switch (action.type){
    case 'TOGGLE_IMAGES_DISPLAY':
        return {
          ...state,
          visible: !action.current
        }
    case 'TOGGLE_GRAPH_DISPLAY':
      return {
        ...state,
        visible: false
      }
    case 'START_IMAGES_FETCH':
        return {
          ...state,
          images: []
        }
    case 'COMPLETE_IMAGES_FETCH':
      return {
        ...state,
        images: action.images
      }
    default:
      return state
  };
};

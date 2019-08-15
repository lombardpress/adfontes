export var chartReducer = (state = {}, action) => {
  switch (action.type){
    case 'TOGGLE_GRAPH_DISPLAY':
        return {
          ...state,
          visible: !action.current
        }
    case 'START_CHART_FETCH':
        return {
          ...state,
          count: []
        }
    case 'COMPLETE_CHART_FETCH':
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  };
};

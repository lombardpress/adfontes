var redux = require('redux');
var thunk = require('redux-thunk').default;
var {searchTextReducer, showCompletedReducer, todosReducer, quotationsReducer, focusedQuotationReducer, canonicalQuotationReducer, canonicalQuotationsReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    quotations: quotationsReducer,
    focusedQuotation: focusedQuotationReducer,
    canonicalQuotation: canonicalQuotationReducer,
    canonicalQuotations: canonicalQuotationsReducer
  })

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ?window.devToolsExtension() : f => f
  ));
  return store;
}

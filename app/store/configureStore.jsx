var redux = require('redux');
var thunk = require('redux-thunk').default;
var {searchReducer, showCompletedReducer, todosReducer, quotationsReducer, focusedQuotationReducer, canonicalQuotationReducer, canonicalQuotationsReducer, manifestationQuotationsReducer, paragraphReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    search: searchReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    quotations: quotationsReducer,
    focusedQuotation: focusedQuotationReducer,
    canonicalQuotation: canonicalQuotationReducer,
    canonicalQuotations: canonicalQuotationsReducer,
    manifestationQuotations: manifestationQuotationsReducer,
    paragraph: paragraphReducer

  })

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ?window.devToolsExtension() : f => f
  ));
  return store;
}

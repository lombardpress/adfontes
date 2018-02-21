var redux = require('redux');
var thunk = require('redux-thunk').default;
var {searchReducer, quotationsReducer, focusedQuotationReducer, canonicalQuotationReducer, canonicalQuotationsReducer, manifestationQuotationsReducer, paragraphReducer, chartReducer, imagesReducer, fullTextReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    search: searchReducer,
    quotations: quotationsReducer,
    focusedQuotation: focusedQuotationReducer,
    canonicalQuotation: canonicalQuotationReducer,
    canonicalQuotations: canonicalQuotationsReducer,
    manifestationQuotations: manifestationQuotationsReducer,
    paragraph: paragraphReducer,
    chart: chartReducer,
    images: imagesReducer,
    fullText: fullTextReducer,

  })

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ?window.devToolsExtension() : f => f
  ));
  return store;
}

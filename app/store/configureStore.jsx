var redux = require('redux');
var thunk = require('redux-thunk').default;

import {searchReducer} from 'searchReducer';
import {chartReducer} from "chartReducer";
import {imagesReducer} from "imagesReducer";
import {quotationsReducer} from "quotationsReducer";
import {focusedQuotationReducer} from "focusedQuotationReducer";
import {canonicalQuotationReducer} from "canonicalQuotationReducer";
import {canonicalQuotationsReducer} from "canonicalQuotationsReducer";
import {manifestationQuotationsReducer} from "manifestationQuotationsReducer";
import {paragraphReducer} from "paragraphReducer";
import {fullTextReducer} from "fullTextReducer";

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

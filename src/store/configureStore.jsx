


import {searchReducer} from '../reducers/searchReducer';
import {chartReducer} from "../reducers/chartReducer";
import {imagesReducer} from "../reducers/imagesReducer";
import {quotationsReducer} from "../reducers/quotationsReducer";
import {focusedQuotationReducer} from "../reducers/focusedQuotationReducer";
import {canonicalQuotationReducer} from "../reducers/canonicalQuotationReducer";
import {canonicalQuotationsReducer} from "../reducers/canonicalQuotationsReducer";
import {manifestationQuotationsReducer} from "../reducers/manifestationQuotationsReducer";
import {paragraphReducer} from "../reducers/paragraphReducer";
import {sourceParagraphReducer} from "../reducers/sourceParagraphReducer";
import {fullTextReducer} from "../reducers/fullTextReducer";

var redux = require('redux')
var thunk = require('redux-thunk').default;

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    search: searchReducer,
    quotations: quotationsReducer,
    focusedQuotation: focusedQuotationReducer,
    canonicalQuotation: canonicalQuotationReducer,
    canonicalQuotations: canonicalQuotationsReducer,
    manifestationQuotations: manifestationQuotationsReducer,
    paragraph: paragraphReducer,
    sourceParagraph: sourceParagraphReducer,
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

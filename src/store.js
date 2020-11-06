import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'


const composedEnhancer = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  applyMiddleware()
  // other store enhancers if any
)

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(rootReducer, loadFromLocalStorage(), composedEnhancer)
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store





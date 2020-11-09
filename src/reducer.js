import { combineReducers } from 'redux';

import todosReducer from './reducers/todosReducer';

const rootReducer = combineReducers({
    itemList: todosReducer
})

export default rootReducer
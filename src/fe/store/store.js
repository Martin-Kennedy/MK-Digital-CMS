
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'
import {getUsers} from '../actions/users.actions'

const initalState = {
    user: []
}

const middleware = [thunk]

const store = createStore(rootReducer, initalState, applyMiddleware(thunk));
store.dispatch(getUsers());

export default store;
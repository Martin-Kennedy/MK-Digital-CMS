import {combineReducers} from 'redux';
import userReducer from './users.reducer';

export default combineReducers({
    user: userReducer
})
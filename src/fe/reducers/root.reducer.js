import {combineReducers} from 'redux';
import blogsReducer from './blogs.reducer';

export default combineReducers({
    blogs: blogsReducer
})
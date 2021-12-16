import {combineReducers} from 'redux';
import blogsReducer from './blogs.reducer';
import filtersReducer from './filters.reducer';

export default combineReducers({
    blogs: blogsReducer,
    filters: filtersReducer
})
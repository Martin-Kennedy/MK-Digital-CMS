import {combineReducers} from 'redux';
import blogsReducer from './blogs.reducer';
import homepageReducer from './homepage.reducer';
export default combineReducers({
    blogs: blogsReducer,
    homepage: homepageReducer
})
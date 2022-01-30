import {combineReducers} from 'redux';
import blogsReducer from './blogs.reducer';
import homepageReducer from './homepage.reducer';
import pagesReducer from './pages.reducer';
export default combineReducers({
    blogs: blogsReducer,
    homepage: homepageReducer,
    pages: pagesReducer
})
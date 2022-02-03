import {combineReducers} from 'redux';
import projectsReducer from './projects.reducer';
import blogsReducer from './blogs.reducer';
import homepageReducer from './homepage.reducer';
import pagesReducer from './pages.reducer';

export default combineReducers({
    homepage: homepageReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    pages: pagesReducer
})
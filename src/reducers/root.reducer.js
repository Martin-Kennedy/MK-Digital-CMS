import {combineReducers} from 'redux';
import projectsReducer from './projects.reducer';
import blogsReducer from './blogs.reducer';
import surfAppReducer from'./surfApp.reducer';
import homepageReducer from './homepage.reducer';
import pagesReducer from './pages.reducer';

export default combineReducers({
    homepage: homepageReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    surf: surfAppReducer,
    pages: pagesReducer
})
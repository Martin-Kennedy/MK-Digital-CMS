import {combineReducers} from 'redux';
import projectsReducer from './projects.reducer';
import blogsReducer from './blogs.reducer';
import surfAppReducer from'./surfApp.reducer';
import homepageReducer from './homepage.reducer';
import pagesReducer from './pages.reducer';
import initialUtilityReducer from './initialUtility.reducer';

export default combineReducers({
    keystoneToken: initialUtilityReducer,
    homepage: homepageReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    surf: surfAppReducer,
    pages: pagesReducer
})
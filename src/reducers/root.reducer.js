import {combineReducers} from 'redux';
import projectsReducer from './projects.reducer';
import blogsReducer from './blogs.reducer';
import surfAppReducer from'./surfApp.reducer';
import homepageReducer from './homepage.reducer';
import aboutReducer from './about.reducer'
import contactReducer from './contact.reducer';
import pagesReducer from './pages.reducer';
import initialUtilityReducer from './initialUtility.reducer';

export default combineReducers({
    initialUtility: initialUtilityReducer,
    homepage: homepageReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    about: aboutReducer,
    contact: contactReducer,
    surf: surfAppReducer,
    pages: pagesReducer
})
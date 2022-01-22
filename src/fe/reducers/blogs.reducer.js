import {GET_BLOGS} from '../helpers/types';
import {SORT_BY_BLOG_SUBJECT} from '../helpers/types'

const INITIAL_STATE = {
    blogData: [],
    filteredData: [],
    sortBy: '',
    activeButton: 1
}

const blogsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogData: action.payload
            }

        case SORT_BY_BLOG_SUBJECT:
            let value = action.subject;
            console.log(value);
            let filteredValues = state.blogData.filter(card => card.subject === value);
            return {
                ...state,
                sortBy: action.subject,
                filteredData: filteredValues,
                activeButton: action.index
            };
        default:
            return state;
    }
}

export default blogsReducer;
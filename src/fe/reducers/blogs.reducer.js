import {} from '../helpers/types';
import { GET_BLOGS, SORT_BY_BLOG_SUBJECT, GET_BLOG_ITEM} from '../helpers/types'

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

            case GET_BLOG_ITEM:
            return {
                ...state,
                blogItem: action.payload,
                sortByItem: action.title
            }

        case SORT_BY_BLOG_SUBJECT:
            let value = action.subject;
            let filteredValues = state.blogData.filter(card => card.subject === value);
            return {
                ...state,
                sortBy: action.subject,
                filteredData: filteredValues,
                activeButton: action.index
            }
        default:
            return state;
    }
}

export default blogsReducer;
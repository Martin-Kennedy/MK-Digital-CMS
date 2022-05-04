import {} from '../helpers/types';
import { GET_BLOGS, SORT_BY_BLOG_SUBJECT, GET_BLOG_ITEM, GET_NEXT_BLOG_ITEM} from '../helpers/types'

const INITIAL_STATE = {
    blogData: [],
    filteredData: [],
    sortBy: '',
    activeButton: 1
}

const blogsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BLOGS:
            action.payload.data.allBlogs.map((blog, index) => {
                blog.orderNum = index + 1;
            })
            return {
                ...state,
                blogData: action.payload.data.allBlogs
            }

        case GET_BLOG_ITEM:
            return {
                ...state,
                blogItem: action.payload.data.allBlogs,
                sortByItem: action.title
            }

        case GET_NEXT_BLOG_ITEM:
            console.log(action)
            let titleSlug = action.payload;
            titleSlug = titleSlug.replace(/\s+/g, '-');
            return {
                ...state,
                nextBlogItem: action.payload,
                nextBlogItemPathname: titleSlug
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
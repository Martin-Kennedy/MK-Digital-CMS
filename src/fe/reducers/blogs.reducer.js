import { GET_BLOGS } from '../helpers/types'

const INITIAL_STATE = {
  blogData: []
}

 const blogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogData: action.payload
      }

    default:
      return state;
  }
}

export default blogsReducer;
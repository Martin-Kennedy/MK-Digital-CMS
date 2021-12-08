import { GET_USERS } from '../helpers/types'

const INITIAL_STATE = {
  currentUser: []
}

 const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
}

export default userReducer;
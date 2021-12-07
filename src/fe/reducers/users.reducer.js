import { GET_USERS } from '../helpers/types'

export default function userReducer(state = [], action) {
  switch (action.type) {

    case GET_USERS:
      return [...action.payload];
    default:
      return state;
  }
}
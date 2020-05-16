import {
  ADD_ITEM_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  AUTH_SUCCESS,
  REGISTER_SUCCESS,
  FETCH_REQUEST,
  LOGOUT_SUCCESS,
  FILTER_NOTES,
  FETCH_SUCCESS,
} from "../actions";

const initialState = {
  userID: "",
  isLoading: false,
  authorized: false,
  filterVal: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_NOTES:
      return {
        ...state,
        filterVal: action.filter,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [...action.payload.data],
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authorized: true,
        userID: action.userID,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authorized: true,
        userID: action.payload.data._id,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authorized: false,
        userID: "",
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data,
        ],
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(
            (item) => item.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;

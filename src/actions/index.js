import axios from "axios";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import { deleteNote, createNote } from "../graphql/mutations";

export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export const REMOVE_ITEM_REQUEST = "REMOVE_ITEM_REQUEST";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILURE = "REMOVE_ITEM_FAILURE";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const FILTER_NOTES = "FILTER_NOTES";

export const filterArray = (filter) => {
  return { type: FILTER_NOTES, filter };
};

export const authenticate = (username, password) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const user = await Auth.signIn(username, password);
    const userID = user.signInUserSession.idToken.payload.sub;
    dispatch({ type: AUTH_SUCCESS, userID });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE });
    console.log("error signing in", error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });

  try {
    await Auth.signOut({ global: true });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE });
    console.log("error signing out: ", error);
  }
};

export const register = (username, password, email) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
    });
    console.log({ user });
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export const confirm = (username, code) => async (dispatch) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
};

export const fetchItems = (itemType) => async (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST });

  const filter = { userID: { eq: getState().userID }, type: { eq: itemType } };
  try {
    const data = await API.graphql(
      graphqlOperation(listNotes, { filter: filter })
    );
    console.log(data.data.listNotes.items);
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data: data.data.listNotes.items,
        itemType,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_FAILURE });
  }
};

export const removeItem = (itemType, id) => async (dispatch) => {
  dispatch({ type: REMOVE_ITEM_REQUEST });
  const input = { id };
  console.log(id);
  try {
    const data = await API.graphql(graphqlOperation(deleteNote, { input }));
    console.log(data);
    dispatch({
      type: REMOVE_ITEM_SUCCESS,
      payload: {
        itemType,
        id,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: REMOVE_ITEM_FAILURE });
  }
};

export const addItem = (itemType, itemContent) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ADD_ITEM_REQUEST });
  const { title, content, articleUrl, twitterName } = itemContent;
  let input = {};
  if (itemType === "notes") {
    input = { userID: getState().userID, type: itemType, title, content };
  }
  if (itemType === "twitters") {
    input = {
      userID: getState().userID,
      type: itemType,
      title,
      content,
      twitterName,
    };
  }
  if (itemType === "articles") {
    input = {
      userID: getState().userID,
      type: itemType,
      title,
      content,
      articleUrl,
    };
  }

  console.log(input);
  try {
    const data = await API.graphql(graphqlOperation(createNote, { input }));
    console.log(itemType, data);
    dispatch({
      type: ADD_ITEM_SUCCESS,
      payload: {
        itemType,
        data: data.data.createNote,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_ITEM_FAILURE });
  }
};

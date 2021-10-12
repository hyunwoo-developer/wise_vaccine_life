import { createRequestActionTypes } from "../libs/createRequestSaga";
import * as userAPI from "../libs/api/user";
import { createAction, handleActions } from "redux-actions";
import createRequestSaga from "../libs/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes("user/GET_PROFILE");

export const getProfile = createAction(GET_PROFILE);

const getUserSaga = createRequestSaga(GET_PROFILE, userAPI.getUserProfile);

export function* userSaga() {
  yield takeLatest(GET_PROFILE, getUserSaga);
}

const initState = {
  isLoggedIn: false,
};

const user = handleActions(
  {
    [GET_PROFILE_SUCCESS]: (state, { payload: userInfo }) => ({
      ...state,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initState
);

export default user;

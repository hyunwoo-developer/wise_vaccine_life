import { put, call } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSage(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      console.log(response);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (error) {
      console.log(error);
      const responseError = error.response;
      const errorPayload = {
        status: responseError.status,
        message: responseError.data.message,
      };
      yield put({
        type: FAILURE,
        payload: errorPayload,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}

// export function createAuthSaga(type, request) {
//   const SUCCESS = `${type}_SUCCESS`;
//   const FAILURE = `${type}_FAILURE`;
//   const GET_PROFILE = `account/GET_PROFILE`;

//   return function* (action) {
//     yield put(startLoading(type));
//     try {
//       console.log("EE");
//       const response = yield call(request, action.payload);
//       console.log(response);
//       const accessToken = response.data.data.accessToken;
//       if (accessToken) {
//         client.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${accessToken}`;
//         yield put(getProfileAction());
//         yield put(changeIsLoggedAction());

//         localStorage.setItem("userToken", accessToken);
//       }
//       yield put({
//         type: SUCCESS,
//         payload: response.data,
//         meta: response,
//       });
//     } catch (error) {
//       const responseError = error.response;
//       const errorPayload = {
//         status: responseError.status,
//         message: responseError.data.message,
//       };
//       yield put({
//         type: FAILURE,
//         payload: errorPayload,
//         error: true,
//       });
//     }
//     yield put(finishLoading(type));
//   };
// }

import { put, takeEvery, delay } from "redux-saga/effects"

function* loginWatchWorker(action) {
  try {
    let { username, password } = action.payload
    yield put({ type: "LOGIN_SHOW_LOADING", payload: true })
    yield delay(2000)
    yield put({ type: "LOGIN_SHOW_LOADING", payload: false })
    yield delay(200)
    yield put({ type: "NAV_HOME" })
  } catch (error) {
    console.log(error)
    yield put({ type: "LOGIN_SHOW_LOADING", payload: false })
  }
}

export default function* watch() {
  yield takeEvery("LOGIN_ACTION", loginWatchWorker)
}
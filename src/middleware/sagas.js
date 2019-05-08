import { Home, Login, Registration } from "@pages"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([
    Home.HomepageSaga(),
    Login.LoginpageSaga(),
    Registration.RegistrationSaga()
  ])
}

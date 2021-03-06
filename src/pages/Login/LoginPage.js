/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react"
import { connect } from "react-redux"
import { StyleSheet, Text, View, Button } from "react-native"
import {
  BaseContainer,
  CommonAlertPopup,
  InProcessPopup,
  BaseText,
  BaseTextInput,
  Const
} from "@shares"
import { colors } from "@styles"

class LoginPage extends BaseContainer {
  state = { username: null, password: null }

  componentDidMount() {
    const { user, goToMainPage } = this.props
    if (user.userInfo) {
      goToMainPage()
    }
  }

  render() {
    const { alertMessage, showLoading, closeAlertPopup } = this.props
    return (
      <View style={styles.container}>
        <BaseText style={styles.welcome}>
          Welcome to Harry Example App!!!
        </BaseText>

        <BaseTextInput
          style={styles.inputStyle}
          placeholder="Username"
          value={this.state.username}
          onChangeText={value =>
            this.setState({ ...this.state, username: value })
          }
        />

        <BaseTextInput
          placeholder="Password"
          style={styles.inputStyle}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={value =>
            this.setState({ ...this.state, password: value })
          }
        />

        <Button
          title="Login"
          onPress={() => {
            this.props.login(this.state.username, this.state.password)
          }}
        />

        <Button
          title="Registration"
          onPress={() => {
            this.props.goToRegistrationPage()
          }}
        />

        <CommonAlertPopup
          title={alertMessage}
          isShow={!!alertMessage}
          onOkay={closeAlertPopup}
        />
        <InProcessPopup isShow={showLoading} title="Loading..." />
      </View>
    )
  }
}

LoginPage.navigationOptions = {
  title: "Login Page"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BACKGROUND
  },
  inputStyle: {
    paddingLeft: 10,
    width: 300,
    height: 40,
    margin: 10,
    borderColor: colors.GRAY,
    borderWidth: 1
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    showLoading: state.loginReducer.showLoading,
    alertMessage: state.loginReducer.alertMessage,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { goBack } = ownProps.navigation
  return {
    login: (username, password) =>
      dispatch({ type: Const.LOGIN_ACTION, payload: { username, password } }),
    goToMainPage: () => dispatch({ type: Const.NAV_MAIN }),
    goToRegistrationPage: () => dispatch({ type: Const.NAV_REGISTRATION }),
    closeAlertPopup: () =>
      dispatch({ type: Const.SET_ALERT_MESSAGE, payload: null })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

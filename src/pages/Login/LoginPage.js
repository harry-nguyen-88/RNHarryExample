/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { connect } from "react-redux"
import { Platform, StyleSheet, Text, View, Button } from "react-native"
import {
  BaseContainer,
  CommonAlertPopup,
  CommonAlertPopupNoButton,
  InProcessPopup,
  BaseText,
  BaseTextInput
} from "@shares"

type Props = {}
class LoginPage extends BaseContainer<Props> {
  state = { username: null, password: null }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Harry Example App!!!</Text>

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
          title="Welcome to React Native Skeleton Project"
          isShow={false}
        />
        <InProcessPopup isShow={this.props.showLoading} title="Loading..." />
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
    backgroundColor: "#F5FCFF"
  },
  inputStyle: {
    paddingLeft: 10,
    width: 300,
    height: 40,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1
  }
})

const mapStateToProps = (state, ownProps) => {
  return state.loginReducer
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { goBack } = ownProps.navigation
  return {
    login: (username, password) =>
      dispatch({ type: "LOGIN_ACTION", payload: { username, password } }),
    goToHome: () => dispatch({ type: "NAV_HOME" }),
    goToRegistrationPage: () => dispatch({ type: "NAV_REGISTRATION" })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

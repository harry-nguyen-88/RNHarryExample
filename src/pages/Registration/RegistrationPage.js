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
  InProcessPopup,
  BaseText,
  BaseTextInput,
  Const
} from "@shares"
import { colors } from "@styles"

class RegistrationPage extends BaseContainer {
  state = { username: null, password: null, retypePassword: null }

  render() {
    const { alertMessage, closeAlertPopup, register } = this.props
    return (
      <View style={styles.container}>
        <BaseText style={styles.welcome}>
          Please provide those information to complete registration process
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

        <BaseTextInput
          placeholder="Retype Password"
          style={styles.inputStyle}
          secureTextEntry={true}
          value={this.state.retypePassword}
          onChangeText={value =>
            this.setState({ ...this.state, retypePassword: value })
          }
        />

        <Button
          title="Register"
          onPress={() => {
            register(
              this.state.username,
              this.state.password,
              this.state.retypePassword
            )
          }}
        />
        <CommonAlertPopup
          title={alertMessage}
          isShow={!!alertMessage}
          onOkay={closeAlertPopup}
        />
        <InProcessPopup isShow={this.props.showLoading} title="Loading..." />
      </View>
    )
  }
}

RegistrationPage.navigationOptions = {
  title: "Registration Page"
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
  return state.registrationReducer
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: (username, password, retypePassword) =>
      dispatch({
        type: Const.REGISTER_ACTION,
        payload: { username, password, retypePassword }
      }),
    closeAlertPopup: () =>
      dispatch({ type: Const.SET_ALERT_MESSAGE, payload: null })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage)

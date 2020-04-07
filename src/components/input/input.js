import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pane, Button, SearchInput, Heading, Icon, Popover, Text } from 'evergreen-ui'
import UserInfo from "../userInfo/userInfo"

class Input extends Component {
  state = {
    wasButtonClicked: false,
    isThereAnError: false,
  }
  componentWillMount() {
    this.timer = null;
  }
  onHandleChange = (e) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerChange, 1000)
    let { dispatch } = this.props;
    dispatch({ type: "UPDATE_USERNAME", username: e.target.value });
    this.setState({isThereAnError: false})
  }
  onHandleKeyDown = (e) => {
    e.keyCode === 13 &&
      this.triggerChange();
  }

  triggerChange = () => {
    this.onUserSearch()

  }
  handleErrors = (response) => {
    if (response.message) {
      let { dispatch } = this.props;
      dispatch({ type: 'SHOW_ERROR', error: response.message });
      this.setState({ isThereAnError: true })
    }
    return response;
  }
  onUserSearch = () => {
    this.setState({ wasButtonClicked: true })
    let { dispatch } = this.props;
    let { username } = this.props;
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        return response.json()
      })
      .then(response => { return this.handleErrors(response) })
      .then(response => {
        dispatch({ type: 'UPDATE_USER', userprofile: response })
      })
  }
  render() {
    return (
      <div>
        <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
          <Pane flex={1} alignItems="center" display="flex">
            <SearchInput type="text"
              onChange={this.onHandleChange}
              value={this.props.user}
              onKeyDown={this.onHandleKeyDown}
              placeholder="Insert username" />
          </Pane>
          <Pane>
            <Button onClick={this.onUserSearch} appearance="primary">Search User</Button>
          </Pane>
        </Pane>
        {this.state.wasButtonClicked === true && this.state.isThereAnError === false &&
          <UserInfo />}
        {this.state.isThereAnError === true &&
          <Pane
            display="flex">
            <Heading marginRight={30}>{this.props.error}</Heading>
            <Icon icon="error" />
          </Pane>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.repos,
    username: state.username,
    userprofile: state.userprofile,
    error: state.error
  }
}
export default connect(mapStateToProps)(Input)
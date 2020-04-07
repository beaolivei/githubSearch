import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from "./components/input/input"
import UserInfo from "./components/userInfo/userInfo"

class App extends Component {

    render () {
        let {userprofile} = this.props;
        return (
            <div>
              <Input/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        userprofile: state.userprofile,
        repos: state.repos,

    }
}
export default connect(mapStateToProps)(App)
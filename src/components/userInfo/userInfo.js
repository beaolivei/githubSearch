import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pane, Heading, Text } from 'evergreen-ui'
import ReposList from "../reposList/reposList"

class UserInfo extends Component {

    render() {
        let { userprofile } = this.props;
        return (
            <div>
                <Pane display="flex" padding={16} background="blueTint" borderRadius={3} elevation={1}>
                    <Pane
                        display='block'
                        float='left'
                        elevation={1}
                        marginRight={30}>

                        <img src={userprofile.avatar_url} />
                        <Pane
                            display="flex"
                            justifyContent="center"
                            padding={20}>
                            <Text size={300}>Lives in: {userprofile.location} </Text>
                        </Pane>
                    </Pane>
                    <Pane display='block'>
                        <Heading color='lightest' margin='auto'>{userprofile.name}</Heading>
                        <Text size={500} display='block' color='lightest' margin="auto">Bio: {userprofile.bio} </Text>
                        <Text size={500} display='block' color='lightest' margin="auto">Company: {userprofile.company} </Text>
                        <Text size={500} display='block' color='lightest' margin='auto'>Looking for a job? {userprofile.hireable ? 'YES!' : 'info unavailable'} </Text>
                    </Pane>
                </Pane>
                <ReposList />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userprofile: state.userprofile,
        error: state.error
    }
}
export default connect(mapStateToProps)(UserInfo)
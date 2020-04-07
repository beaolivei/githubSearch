import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pane, Button, Popover, Heading, Icon } from 'evergreen-ui';

class ReposList extends Component {
    state = {
        wasButtonClicked: false
    }

    onRepoFetch = () => {
        this.setState({ wasButtonClicked: !this.state.wasButtonClicked })
        let { dispatch } = this.props;
        let { repos_url } = this.props.userprofile;
        fetch(repos_url)
            .then(response => {
                return response.json()
            })
            .then(response => {
                dispatch({ type: "UPDATE_REPOS", repos: response })
            })
    }
    render() {
        let { error } = this.props;
        return (
            <Pane display='block'>
                <Pane display="flex" alignItems="center" justifyContent="center" padding={30} background="blueTint">
                    <Button appearance='primary' onClick={this.onRepoFetch}> Fetch Repos</Button>
                </Pane>
                {this.state.wasButtonClicked === true && error !== {} ?
                <Pane>
                    <Pane display='flex' alignItems='center' justifyContent='center' padding={10} background="blueTint">
                        <Heading> You can click on the itens in the table to learn more about them</Heading>
                        <Icon icon='flame' />
                    </Pane>
                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>
                                Repo Name
                        </Table.TextHeaderCell>
                            <Table.TextHeaderCell>
                                Languages
                        </Table.TextHeaderCell>
                            <Table.TextHeaderCell>
                                Created At
                            </Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body height={240}>
                            {this.props.repos.map((repo, index) => {
                                return <Popover
                                    content={({ close }) => (
                                        <Pane
                                            width={320}
                                            height={320}
                                            paddingX={40}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDirection="column"
                                        >
                                            <Heading padding={30}>{repo.description !== null ? repo.description : 'project description not available'}</Heading>
                                            <Button onClick={close}>Close</Button>
                                        </Pane>
                                    )}
                                ><Table.Row key={repo.id} isSelectable>
                                        <Table.TextCell>{repo.name}</Table.TextCell>
                                        <Table.TextCell>{repo.language}</Table.TextCell>
                                        <Table.TextCell>{repo.created_at}</Table.TextCell>
                                    </Table.Row>
                                </Popover>
                            })}
                        </Table.Body>
                    </Table>
                    </Pane>
                : <p>{error.message}</p>
                }
            </Pane>


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
export default connect(mapStateToProps)(ReposList)
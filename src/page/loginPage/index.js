import React, { Component } from 'react';
import { Container, Grid, Segment, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import UserData from '../../helper/userData';
import UserService from '../../service/userService';
import HistoryService from '../../service/historyService';

class LoginPage extends Component {
    
    userData = UserData.getInstance();
    userService = UserService.getInstance();
    historyService = HistoryService.getInstance();

    nickname = '';

    state = {
        playButtonDisabled: false
    }

    register = () => {
        if (this.nickname === '') return;
        this.setState({
            playButtonDisabled: true
        });
        
        this.userService.fetch(this.nickname).then(() => {
            this.historyService.forward('/game');
        });
    }
    
    render() {
        if (this.userData.userId !== null) {
            return (
                <Redirect to="/game"/>
            );
        }

        return (
            <div className="page">
                <Container>
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={5} mobile={12}>
                            <Segment basic>
                                <Input onChange={(event, data) => {
                                    this.nickname = data.value;
                                }} fluid type='text' icon='user' iconPosition='left' placeholder='Nickname' />
                                <br />
                                <br />
                                <Button disabled={this.state.playButtonDisabled} onClick={this.register} fluid secondary>PLAY</Button>
                            </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default LoginPage;
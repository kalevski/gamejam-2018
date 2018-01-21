import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import UserData from '../../helper/userData';
import Game from '../../game';

class GamePage extends Component {

    userData = UserData.getInstance();
    game = null;

    runGame() {
        this.game = new Game();
        this.game.run();
    }

    render() {
        if (this.userData.userId === null) {
            return (
                <Redirect to="/login"/>
            );
        } else {
            this.runGame();
        }
        return (
            <div className="page">
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16}><div id='canvas'></div></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default GamePage;
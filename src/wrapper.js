import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HistoryService from './service/historyService';
import IndexPage from './page/indexPage';
import GamePage from './page/gamePage';
import LoginPage from './page/loginPage';
import NotFoundPage from './page/notFoundPage';

class Wrapper extends PureComponent {
    
    historyService = HistoryService.getInstance();

    render() {
        return (
            <Router history={this.historyService.api}>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exact path="/game" component={GamePage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default Wrapper;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserData from '../../helper/userData';

class IndexPage extends Component {

    userData = UserData.getInstance();

    render() {
        if (this.userData.userId === null) {
            return (
                <Redirect to="/login"/>
            );
        } else {
            return (
                <Redirect to="/game"/>
            );
        }
        
    }
}

export default IndexPage;


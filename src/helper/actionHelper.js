class ActionHelper {
    
    worldSocket = null;
    userData = null;
    
    constructor(worldSocket, userData) {
        this.worldSocket = worldSocket;
        this.userData = userData;
    }

    move(path) {
        this.worldSocket.send('move', this.userData.nickname, {
            path: path
        });
    }

    removeDiamond(positionKey) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'removeDiamond',
            data: {
                positionKey: positionKey
            }
        });
    }

    ocupateAntena() {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'ocupateAntena',
            data: {
                antena: '0'
            }
        });
    }

    placeRock(positionKey) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'placeRock',
            data: {
                positionKey: positionKey
            }
        });
    }

    placeMine(positionKey) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'placeMine',
            data: {
                positionKey: positionKey
            }
        });
    }

    placePortal(positionKey) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'placePortal',
            data: {
                positionKey: positionKey
            }
        });
    }
}

export default ActionHelper;
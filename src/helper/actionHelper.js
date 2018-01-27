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
}

export default ActionHelper;
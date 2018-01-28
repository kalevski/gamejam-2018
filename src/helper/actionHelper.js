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

    ocupateAntena(positionKey, color) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'ocupateAntena',
            data: {
                positionKey: positionKey,
                color: color
            }
        });
    }

    placeRock(positionKey, deadFields, goToField) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'placeRock',
            data: {
                positionKey: positionKey,
                nickname: this.userData.nickname,
                deadFields: deadFields,
                goToField: goToField
            }
        });
    }

    placeMine(positionKey, mineFields) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'placeMine',
            data: {
                positionKey: positionKey,
                nickname: this.userData.nickname,
                mineFields: mineFields
            }
        });
    }

    mineExplode(positionKey) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'mineExplode',
            data: {
                positionKey: positionKey
            }
        });
    }

    gameOver(winner) {
        this.worldSocket.send('pushAction', this.userData.nickname, {
            type: 'gameOver',
            data: {
                nickname: this.userData.nickname,
                win: winner
            }
        });
    }
}

export default ActionHelper;
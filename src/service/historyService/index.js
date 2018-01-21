import createBrowserHistory from 'history/createBrowserHistory';

class History {
    
    api = createBrowserHistory({
        basename: '',
        forceRefresh: false,
        keyLength: 6,
        getUserConfirmation: this.userConfirmation
    });

    userConfirmation(message, callback) {
        console.log('user confirmation', message)
        return callback(window.confirm(message))
    }

    forward(path) {
        this.api.push(path);
    }
}

var instance = null;
History.getInstance = function() {
    if (instance === null) {
        instance = new History();
    }
    return instance;
}

export default History;
class UserData {
    
    nickname = null;
    userId = null;
    head = null;
    body = null;
    color = null;
    
    constructor() {
        var data  = sessionStorage.getItem('userData');
        if (data !== null) {
            this.nickname = data.nickname;
            this.userId = data.userId;
            this.head = data.head;
            this.body = data.body;
            this.color = data.color;
        }
    }

    set(key, value) {
        if (typeof this[key] === 'undefined') return;
        this[key] = value;
        this.persist();
    }

    setAll(user) {
        this.nickname = user.nickname;
        this.userId = user.userId;
        this.head = user.head;
        this.body = user.body;
        this.color = user.color;
        this.persist();
    }

    persist() {
        var data = JSON.stringify(this);
        sessionStorage.setItem('userData', data);
    }
}

var instance = null;
UserData.getInstance = function() {
    if (instance === null) {
        instance = new UserData();
    }
    return instance;
}

export default UserData;
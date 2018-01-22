class UserData {
    
    nickname = null;
    built = false;
    creature = null;
    abilityList = [];
    abilityData = null;
    
    constructor() {
        window.user = this; // for debugging
        var user = sessionStorage.getItem('userData');
        if (user !== null) {
            user = JSON.parse(atob(user));
            this.nickname = user.nickname;
            this.built = user.built;
            this.creature = user.creature;
            this.abilityList = user.abilityList;
            this.abilityData = user.abilityData;
        }
    }

    set(key, value) {
        if (typeof this[key] === 'undefined') return;
        this[key] = value;
        this.persist();
    }

    setAll(user) {
        this.nickname = user.nickname;
        this.built = user.built;
        this.creature = user.creature;
        this.abilityList = user.abilityList;
        this.abilityData = user.abilityData;
        this.persist();
    }

    persist() {
        var data = JSON.stringify(this);
        sessionStorage.setItem('userData', btoa(data));
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
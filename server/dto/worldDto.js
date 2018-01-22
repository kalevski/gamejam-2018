class WorldDto {
    id = null;
    type = null;
    user1 = null;
    user1Event = [];
    user2Event = [];
    user2 = null;
    grid = [];
    deadFields = [];
    turnTime = null;

    objects = [];
    health = {
        creature1: null,
        creature2: null
    };
    position = {
        creature1: null,
        creature2: null
    }
    turnStart = null;
}

export default WorldDto;
class WorldDto {
    id = null;
    ready = false;
    type = null;
    turnTime = null;
    description = null;
    winner = null;
    user1 = null;
    user2 = null;
    user1Event = [];
    user2Event = [];
    deadFields = [];
    objects = [];
    postiion = {
        creature1: null,
        creature2: null
    }
    turnStart = null;
}

export default WorldDto;
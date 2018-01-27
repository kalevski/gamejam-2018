export default (user, data, world) => {
    
    let out = {
        status: {
            send: true,
            toAll: false
        },
        world: world
    }
    
    let userList = world.userList;
    let opponent = null;
    for (let u of userList) {
        if (world.user[u].data.nickname !== user) {
            opponent = world.user[u].data.nickname;
        }
    }
    out.world.user[opponent].actions.push({
        type: 'move',
        data: data.path
    });

    return out;
};
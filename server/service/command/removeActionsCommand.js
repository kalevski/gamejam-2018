export default (user, data, world) => {
    let out = {
        status: {
            send: false,
            toAll: true
        },
        world: world
    }

    out.world.user[user].actions = [];

    return out;
}
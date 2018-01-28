import worldConfig from '../../config/worldConfig';

export default (user, data, world) => {
    
    let out = {
        status: {
            send: false,
            toAll: true
        },
        world: world
    }
    
    if (out.world.connected != 2) {
        out.world.connected += 1;
        out.world.userList.push(user);
        out.world.user[user] = {
            data: data,
            game: {
                flipped: worldConfig[out.world.type].spawn[out.world.connected - 1].flipped,
                spawn: worldConfig[out.world.type].spawn[out.world.connected - 1].key
            },
            actions: []
        };
        
        if (out.world.connected === 1) {
            out.world.onMove = 0;
        }

        if (out.world.connected === 2) {
            out.world.user[out.world.userList[0]].actions.push({
                type: 'startGame',
                data: out.world.user[out.world.userList[1]].data.creature
            });
            out.world.user[out.world.userList[1]].actions.push({
                type: 'startGame',
                data: out.world.user[out.world.userList[0]].data.creature
            });

            out.world.objects = worldConfig[out.world.type].objects;
            out.world.antena1Fields = worldConfig[out.world.type].antena1Fields;
            out.world.antena2Fields = worldConfig[out.world.type].antena2Fields;
            out.world.antena1 = worldConfig[out.world.type].antena1;
            out.world.antena2 = worldConfig[out.world.type].antena2;

            out.world.ready = true;
            out.status.send = true;
        }
    }

    return out;
};
export default {
    worldList: [0, 1],
    turnTime: 120,
    0: {
        description: 'example text',
        deadFields: ['00x00', '00x01', '03x07', '05x11'],
        objects: [
            {
                type: 'rock',
                position: '12x08'
            }
        ],
        spawn: [{flipped: false, key:'00x00'}, {flipped: true, key:'15x10'}]
    },
    1: {
        description: 'example text',
        deadFields: ['00x00', '00x01', '03x07', '05x11'],
        objects: [
            {
                type: 'rock',
                position: '12x08'
            }
        ],
        spawn: ['00x00', '15x10']
    }
}
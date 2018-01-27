export default {
    worldList: [0, 1],
    turnTime: 120,
    0: {
        description: 'example text',
        deadFields: ['00x00', '00x01', '03x07', '05x11'],
        objects: [
            {
                type: 'antena',
                position: '03x06',
                data: {
                    colored: null
                }
            },
            {
                type: 'antena',
                position: '58x05',
                data: {
                    colored: null
                }
            }
        ],
        spawn: [{flipped: false, key:'03x16'}, {flipped: true, key:'58x18'}]
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
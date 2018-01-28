export default {
    worldList: [0, 1],
    turnTime: 120,
    0: {
        description: 'example text',
        deadFields: ['35x07', '50x10', '51x10', '52x10', '53x11', '54x11', '55x11',
            '06x07', '07x07', '08x07', '08x08', '09x08'],
        antena1Fields: ['01x09', '02x09', '03x09', '04x09', '05x09', '01x10',
         '02x10', '03x10', '04x10', '05x10'],
        antena2Fields: ['56x09', '57x09', '58x09', '59x09', '60x09', '56x10',
        '57x10', '58x10', '59x10', '60x10'],
        antena1: '03x09',
        antena2: '58x09',
        objects: [
            {type: 'antena', position: '03x09'},
            {type: 'antena', position: '58x09'},
            {type: 'diamond', position: '20x04'},
            {type: 'diamond', position: '22x18'},
            {type: 'diamond', position: '36x14'},
            {type: 'diamond', position: '09x02'},
            {type: 'diamond', position: '58x20'},
            {type: 'diamond', position: '09x15'},
            {type: 'diamond', position: '43x17'},
            {type: 'diamond', position: '59x13'},
            {type: 'diamond', position: '10x10'},
            {type: 'diamond', position: '09x07'},
            {type: 'diamond', position: '41x15'},
            {type: 'diamond', position: '51x12'},
            {type: 'diamond', position: '39x14'},
            {type: 'diamond', position: '19x09'},
            {type: 'diamond', position: '20x13'},
            {type: 'diamond', position: '40x05'},
            {type: 'diamond', position: '45x05'},
            {type: 'diamond', position: '30x20'},
            {type: 'diamond', position: '28x09'},
            {type: 'diamond', position: '14x19'}
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
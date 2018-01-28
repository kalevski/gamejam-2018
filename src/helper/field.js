import Phaser from '../phaser';
import Graph from './graph';

class Field {

    field = {};
    fieldData = {};
    fieldArray = [];
    deadField = {};
    deadFieldsArray = [];
    graph = null;

    offset = {
        x: 20,
        y: 140
    };

    onClick = new Phaser.Signal();
    
    pushDeadFields(deadFieldsArray) {
        this.deadFieldsArray = this.deadFieldsArray.concat(deadFieldsArray);
        for (let deadField of deadFieldsArray) {
            this.deadField[deadField] = 1;
        }
    }

    createGrid(group) {
        let offsetX = this.offset.x;
        let offsetY = this.offset.y;
        
        for(let i = 0; i < 62; i++) {
            this.fieldArray.push([]);
            for (let j = 0; j < 22; j++) {
                let key = i < 10 ? '0' + i : i + '';
                key += 'x';
                key += j < 10 ? '0' + j : j + '';
                this.field[key] = group.create(offsetX + i * 20,
                    offsetY + j * 20, 'ui-pixel');
                this.field[key].alpha = .2;
                if (this.deadField[key] === 1) {
                    this.field[key].tint = 0xff0000;
                }
                this.field[key].inputEnabled = true;
                let fieldData = {
                    x: this.field[key].position.x + 10,
                    y: this.field[key].position.y + 10,
                    fieldX: i,
                    fieldY: j,
                    key: key
                };
                this.fieldData[key] = fieldData;
                this.fieldArray[i].push(fieldData);
                this.field[key].events.onInputDown.add(() => {
                    this.onClick.dispatch(fieldData);
                }, this);
            }
        }
        this.createGraph();
    }

    createGraph() {
        let map = {};
        for (let x = 0; x < this.fieldArray.length; x++) {
            for (let y = 0; y < this.fieldArray[x].length; y++) {
                let fieldData = this.fieldArray[x][y];

                if (typeof this.deadField[fieldData.key] !== 'undefined') {
                    continue;
                }
                let fieldsToMoveNormal = [];
                try {
                    fieldsToMoveNormal.push(this.fieldArray[x-1][y]);
                } catch(e) {}
                try {
                    fieldsToMoveNormal.push(this.fieldArray[x+1][y]);
                } catch(e) {}
                try {
                    fieldsToMoveNormal.push(this.fieldArray[x][y-1]);    
                } catch(e) {}
                try {
                    fieldsToMoveNormal.push(this.fieldArray[x][y+1]);    
                } catch(e) {}
                
                let fieldsToMoveDiagonal = [];
                try {
                    fieldsToMoveDiagonal.push(this.fieldArray[x-1][y-1]);    
                } catch(e) {}
                try {
                    fieldsToMoveDiagonal.push(this.fieldArray[x+1][y+1]);    
                } catch(e) {}
                try {
                    fieldsToMoveDiagonal.push(this.fieldArray[x+1][y-1]);    
                } catch(e) {}
                try {
                    fieldsToMoveDiagonal.push(this.fieldArray[x-1][y+1]);    
                } catch(e) {}
                
                let node = {};
                for (let field of fieldsToMoveNormal) {
                    
                    if (typeof field === 'undefined') {
                        continue;   
                    }
                    if (typeof this.deadField[field.key] !== 'undefined') {
                        continue;
                    }
                    node[field.key] = 1;
                }

                for (let field of fieldsToMoveDiagonal) {
                    if (typeof field === 'undefined') {
                        continue;   
                    }
                    if (typeof this.deadField[field.key] !== 'undefined') {
                        continue;
                    }
                    node[field.key] = 1.41;
                }
                map[fieldData.key] = node;
            }  
        }
        
        this.graph = new Graph(map);
    }

    getPath(startField, endField) {
        if (typeof this.deadField[endField.key] !== 'undefined') {
            return [startField];
        }
        let path = [];
        let pathKeys = this.graph.findShortestPath(startField.key, endField.key);
        
        for (let key of pathKeys) {
            path.push(this.fieldData[key]);
        }
        return path;
    }

    getNearField(key, horizontal = 1, vertical = 1) {
        let fieldData = this.getFieldData(key);
        let i = fieldData.fieldX + horizontal;
        let j = fieldData.fieldY + vertical;
        let newKey = i < 10 ? '0' + i : i + '';
        newKey += 'x';
        newKey += j < 10 ? '0' + j : j + '';
        if (this.deadField[newKey] !== 1) {
            return newKey;
        } else {
            return null;
        }
    }

    getFieldData(key) {
        return typeof this.fieldData[key] === 'undefined' ? null : this.fieldData[key];
    }

    destroy() {
        for (let i = 0; i < this.fieldArray.length; i++) {
            for (let j = 0; j < this.fieldArray[i].length; j++) {
                this.field[this.fieldArray[i][j].key].destroy();
            }
        }
    }
}

export default Field;
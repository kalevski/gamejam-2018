import Phaser from '../phaser';
import Graph from './graph';

class Field {

    field = {};
    fieldData = {};
    fieldArray = [];
    deadField = {};
    graph = null;

    onClick = new Phaser.Signal();

    constructor(group) {
        this.createGrid(20, 140, group);
        this.createGraph();
    }

    createGrid(offsetX, offsetY, group) {
        for(let i = 0; i < 62; i++) {
            this.fieldArray.push([]);
            for (let j = 0; j < 22; j++) {
                let key = i < 10 ? '0' + i : i + '';
                key += 'x';
                key += j < 10 ? '0' + j : j + '';
                this.field[key] = group.create(offsetX + i * 20,
                    offsetY + j * 20, 'ui-pixel');
                this.field[key].alpha = 1;
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
        let path = [];
        let pathKeys = this.graph.findShortestPath(startField.key, endField.key);
        
        for (let key of pathKeys) {
            path.push(this.fieldData[key]);
        }
        return path;
    }

    getFieldData(key) {
        return typeof this.fieldData[key] === 'undefined' ? null : this.fieldData[key];
    }
}

export default Field;
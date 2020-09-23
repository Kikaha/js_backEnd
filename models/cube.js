const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

class CubeModel {
    constructor() {
        this.data = require('../config/database')
    }
    _write(newData, resolvedData) {
        return new Promise((resolve, reject) => {
            // fs.writeFile(path.resolve('../config/database.json', JSON.stringify(data), (err) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData,null,2), (err) => {
                if (err) { reject(err); return; }
                this.data = newData;
                resolve(resolvedData);});
         
        })
    }

    find(predFn){
        return Promise.resolve(this.data.entities.filter(predFn));
    }

    create(name,description,imageUrl, difficultyLevel){
        return {name, description, imageUrl, difficultyLevel};
    }

    insert(newCube) {               
        const newIndex = ++this.data.lastIndex;
        newCube = { id: newIndex, ...newCube };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newCube)
        };
        return this._write(newData, newCube);
    }

    update(cubeId, updates) {
        const entityIndex = this.data.entities.findIndex(({ id }) => id === cubeId);
        const entity = this.data.entities[entityIndex];
        const updateEntity = { ...entity, ...updates };

        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [
                ...this.data.entities.slice(0, entityIndex),
                updateEntity,
                ...this.data.entities.slice(entityIndex + 1)
            ]
        };

        return this._write(newData, updateEntity)
    }

    delete(id) {
        const deletedEntity = this.getOne(id);
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(({ id: i }) => i !== id)
        }
        return this._write(newData, deletedEntity);
    }

    getOne(id) {
        //  return this.data.entities.find(({id})=>id===id)
        return Promise.resolve(this.data.entities.find(({ id: i }) => i === id));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }
}

module.exports = new CubeModel();
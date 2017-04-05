/**
 * Created by tehetenamasresha on 03/04/2017.
 */
const mongoose = require('mongoose')
const DB = require('../modules/database');

const catSchema = {
    name: String,
    age: Number,
    gender: {
        type: 'String',
        enum: ['male', 'female']
    },
    color: String,
    weight: Number
};

const Cat = DB.getSchema('Cat', catSchema);

module.exports = Cat
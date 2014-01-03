'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Todo Schema
 */
var TodoSchema = new Schema({
    createdTime: {
        type: Date,
        default: Date.now
    },
    summary: {
        type: String,
        default: '',
        trim: true
    },
    done: {
        type: Boolean,
        default: false,   
    }
});

/**
 * Validations
 */
TodoSchema.path('summary').validate(function(summary) {
    return summary.length;
}, 'Summary cannot be blank');

/**
 * Statics
 */
TodoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Todo', TodoSchema);

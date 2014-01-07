'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Group Schema
 */
var GroupSchema = new Schema({
    createdTime: {
        type: Date,
        default: Date.now
    },
    groupName: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    users: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    founders: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    admins: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    subGroup: [{
        type: Schema.ObjectId,
        ref: 'Group'
    }],
    parentGroup: {
        type: Schema.ObjectId,
        ref: 'Group'
    }
});

/**
 * Validations
 */
GroupSchema.path('groupName').validate(function(groupName) {
    return groupName.length;
}, 'Group name cannot be blank');

/**
 * Statics
 */
GroupSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Group', GroupSchema);

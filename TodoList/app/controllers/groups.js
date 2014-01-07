'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Group = mongoose.model('Group'),
    _ = require('lodash');


/**
 * Find group by id
 */
exports.group = function(req, res, next, id) {
    Group.load(id, function(err, group) {
        if (err) return next(err);
        if (!group) return next(new Error('Failed to load group ' + id));
        req.group = group;
        next();
    });
};

/**
 * Create a group
 */
exports.create = function(req, res) {
    var group = new Group(req.body);

    group.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                group: group
            });
        } else {
            res.jsonp(group);
        }
    });
};

/**
 * Update a group
 */
exports.update = function(req, res) {
    var group = req.group;
    group = _.extend(group, req.body);

    group.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                group: group
            });
        } else {
            res.jsonp(group);
        }
    });
};

/**
 * Delete a group
 */
exports.destroy = function(req, res) {
    var group = req.group;

    group.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                group: group
            });
        } else {
            res.jsonp(group);
        }
    });
};

/**
 * Show a group
 */
exports.show = function(req, res) {
    res.jsonp(req.group);
};

/**
 * List of group
 */
exports.all = function(req, res) {
    Group.find().sort('-createdTime').exec(function(err, groups) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(groups);
        }
    });
};
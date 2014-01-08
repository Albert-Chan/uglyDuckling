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
    group.founders.push(req.user);
    group.save(function (err) {
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
    var query;
    if (req.query.groupName == undefined) {
        query = Group.find().sort('-createdTime');
    }
    else {
        query = Group.find({groupName: req.query.groupName}).sort('-createdTime')
    }
    query.exec(function (err, groups) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(groups);
        }
    });
};

/**
 * join a group
 * @param req
 * @param res
 */
exports.join = function(req, res) {
    if (req.query.groupId == undefined) {
        return;
    }
    Group.findOne({_id: req.query.groupId}).exec(function (err, group) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            group.users.push(req.user);
            group.save(function (err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        group: group
                    });
                } else {
                    res.jsonp(group);
                }
            });
        }
    });
}
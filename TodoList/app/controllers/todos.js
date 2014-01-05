'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo'),
    _ = require('lodash');


/**
 * Find todo by id
 */
exports.todo = function(req, res, next, id) {
    Todo.load(id, function(err, todo) {
        if (err) return next(err);
        if (!todo) return next(new Error('Failed to load todo ' + id));
        req.todo = todo;
        next();
    });
};

/**
 * Create a todo
 */
exports.create = function(req, res) {
    var todo = new Todo(req.body);

    todo.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todo: todo
            });
        } else {
            res.jsonp(todo);
        }
    });
};

/**
 * Update a todo
 */
exports.update = function(req, res) {
    var todo = req.todo;

    todo = _.extend(todo, req.body);

    todo.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todo: todo
            });
        } else {
            res.jsonp(todo);
        }
    });
};

/**
 * Delete an todo
 */
exports.destroy = function(req, res) {
    var todo = req.todo;

    todo.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                todo: todo
            });
        } else {
            res.jsonp(todo);
        }
    });
};

/**
 * Show an todo
 */
exports.show = function(req, res) {
    res.jsonp(req.todo);
};

/**
 * List of Todo
 */
exports.all = function(req, res) {
    Todo.find().sort('-createdTime').exec(function(err, todos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(todos);
        }
    });
};
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Customer'
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: false
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        title: {
            type: mongoose.Schema.Types.String,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Order', schema);
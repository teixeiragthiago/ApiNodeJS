'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    const res = await Customer.find();
    return res;
}

exports.post = async (data) => {
    const customer = new Customer(data);
    await customer.save();
}

exports.delete = async (id) => {
    await Customer.findByIdAndRemove(id);
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

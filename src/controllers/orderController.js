'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const ValidationContract = require('../validators/fluent-validator');
const orderRepository = require('../repositories/orderRepository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        var data = await orderRepository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.post = async(req, res, next) => {

    try{
        await orderRepository.post({
            customer: req.body.customer,
            number: guid.raw().substring(0,6),
            items: req.body.items
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Erro ao cadastrar pedido!'
        });
    }
};
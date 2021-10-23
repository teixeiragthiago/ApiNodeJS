const orderRepository = require('../repositories/orderRepository');
const guid = require('guid');
const emailService = require('../services/emailService');
const authService = require('../services/authService');

exports.get = async (req, res, next) => {
    try {
        const data = await orderRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await orderRepository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.getItems = async (req, res, next) => {
    try {
        const data = await orderRepository.getItems(req.params.id);
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
        console.log(e);
    }
}

exports.post = async (req, res, next) => {

    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);


        await orderRepository.post({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });

        emailService.send(
            req.body.email,
            'Compra da Node Store',
            global.EMAIL_TMPLOrder.replace('{name}', req.body.name)
                .replace('{title}', req.body.items)
                .replace('{price}', req.body.items)
                .replace('{quantity}', req.body.items)
        );
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Erro ao cadastrar pedido!'
        });
    }
};

'use strict';

const express = require('express');
const router = express.Router();

const object = {
    nome: 'Thiago',
    idade: '21',
    profissao: 'Desenvolvedor'
};

JSON.stringify(object);

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        object
    });
});

module.exports = router;
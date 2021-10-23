'use strict'

const ValidationContract = require('../validators/fluent-validator');
const productRepository = require('../repositories/productRepository');

exports.get = async (req, res, next) => {
    try {
        const data = await productRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}


exports.getBySlug = async (req, res, next) => {
    try {
        const data = await productRepository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await productRepository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await productRepository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 10, 'A título deve conter pelo menos 10 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors().end());
        return;
    }

    try {
        await productRepository.post(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Erro ao cadastrar produto!'
        });
        console.log(e);
    }
};

exports.put = async (req, res, next) => {

    try {
        await productRepository.put(req.params.id, req.body)
        res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Erro ao atualizar produto!'
        });
    }
}

exports.del = async (req, res, next) => {
    try {
        await productRepository.delete(req.params.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Erro ao excluir produto!'
        });
    }
}

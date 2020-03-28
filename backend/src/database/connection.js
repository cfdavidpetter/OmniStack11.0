const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV == 'text' ? configuration.test : configuration.development;

const connection = knex(configuration.development);

module.exports= connection;
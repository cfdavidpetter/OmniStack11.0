const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const ong_id = req.headers.authorization;
        const ongs = await connection('incidents').where('ong_id', ong_id).select('*');
        return res.json(ongs);
    },
}
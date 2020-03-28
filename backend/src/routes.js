const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentContrtoller = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

routes.get('/', (req, res) => {
    return res.json({
        evento: "Semana OmniStack 11.0",
        aluno: "David Petter Alves",
        date: "03/24/2020"
    });
});

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })    
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()    
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })    
}), IncidentContrtoller.index);
routes.post('/incidents', IncidentContrtoller.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })    
}), IncidentContrtoller.delete);

module.exports = routes;
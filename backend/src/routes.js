const express = require('express');
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

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentContrtoller.index);
routes.post('/incidents', IncidentContrtoller.create);
routes.delete('/incidents/:id', IncidentContrtoller.delete);


module.exports = routes;
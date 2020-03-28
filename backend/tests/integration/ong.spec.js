const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shoult be able to create a new ONG', async () => {
        const respose = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contec@gmail.com",
                whatsapp: "47996512233",
                city: "Itajaí",
                uf: "SC"
            });
        
        expect(respose.body).toHaveProperty('id');
        expect(respose.body.id).toHaveLength(8);
    });
});
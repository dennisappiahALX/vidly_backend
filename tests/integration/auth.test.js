const {User} = require('../../models/user');
const request = require('supertest');

describe('auth middleware', () => {
    beforeEach(() => { server = require('../../app');})
    afterEach (async () => { server.close();})

    let token;
    
    const exec = () => {
        return request(server)
          .post('/api/genres')
          .set('x-auth-token', token)
          .send({name : 'genres1'});
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
      })

    it('should return 401 if token is not provided', async() => {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async() => {
        token = '1245';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async() => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
})
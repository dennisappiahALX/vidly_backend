 const {User} =  require('../../../models/user');
 const jwt = require('jsonwebtoken');
 const config = require('config');
 const mongoose = require('mongoose');


describe('user.generateAuthToken', () => {
    test('should return a valid JWT', () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString()
            , isAdmin:true}
         const user = new User();
         const token = user.generateAuthToken();
         const decoded = jwt.verify(token, config.get('jwtPrivatekey'));

         expect(decoded).toMatchObject({payload});

    })
})
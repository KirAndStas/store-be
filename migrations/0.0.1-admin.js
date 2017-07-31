import keystone from 'keystone';
// import { adminEmail } from '../etc/config.json';

const User = keystone.list('User');

export default function (done) {
    new User.model({
        email             : 'vesground@gmail.com',
        createdAt         : '2017-06-22T19:49:10.948Z',
        updatedAt         : '2017-06-22T19:49:10.948Z',
        canAccessKeystone : true
    }).save(done);
}

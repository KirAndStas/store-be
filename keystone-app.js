import keystone from 'keystone';
import { adminPort, secret, db } from './etc/config.json';

const trueFind = Array.prototype.find;

// eslint-disable-next-line
process.nextTick(() => Array.prototype.find = trueFind);

keystone.init({
    'name'          : 'STORE BE',
    'mongo'         : `mongodb://${db.host}/${db.name}`,
    'brand'         : 'Comet',
    'updates'       : 'migrations',
    'session'       : false,
    'auth'          : true,
    'port'          : adminPort,
    'user model'    : 'User',
    'headless'      : true,
    'admin path'    : 'admin',
    'auto update'   : true,
    'cookie secret' : secret
});

keystone.import('./lib/models/');

// eslint-disable-next-line
keystone.set('routes', require('./app'));

// keystone.start();

export default keystone;

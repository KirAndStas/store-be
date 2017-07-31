import keystone      from 'keystone';
import { promisify } from 'bluebird';
import jwt           from 'jsonwebtoken';
import Base          from 'service-layer/Base';
import Exception     from 'service-layer/Exception';
import moment        from 'moment';
import { secret }    from '../../../etc/config.json';

const User = keystone.list('User').model;

const jwtVerify = promisify(jwt.verify);
const TODAY = moment().valueOf();

export default class Check extends Base {
    static validationRules = {
        token : [ 'required' ]
    };

    async execute({ token }) {
        let userData;

        try {
            userData = await jwtVerify(token, secret);
        } catch (e) {
            throw new Exception({
                code   : 'WRONG_TOKEN',
                fields : {
                    token : 'WRONG_TOKEN'
                }
            });
        }

        const user = await User.findOne({ email: userData.email });

        if (TODAY > userData.expireAt) {
            throw new Exception({
                code   : 'TOKEN_EXPIRED',
                fields : {
                    token : 'TOKEN_EXPIRED'
                }
            });
        }

        if (!user) {
            throw new Exception({
                code   : 'AUTHENTICATION_FAILED',
                fields : {
                    email : 'INVALID'
                }
            });
        }

        if (userData.password !== user.password) {
            throw new Exception({
                code   : 'AUTHENTICATION_FAILED',
                fields : {
                    password : 'INVALID'
                }
            });
        }

        return userData;
    }
}

import keystone  from 'keystone';
import { promisify } from 'bluebird';
import Base      from 'service-layer/Base';
import Exception from 'service-layer/Exception';
import jwt       from 'jsonwebtoken';
import moment    from 'moment';

import { dumpUser } from '../../utils/services.js';
import { secret, expiredPeriod } from '../../../etc/config.json';

const User = keystone.list('User').model;

export default class Create extends Base {
    static validationRules = {
        data : ['required', { 'nested_object' : {
            password : [ 'required' ],
            email    : ['required', 'email']
        } } ]
    }

    async execute({ data }) {
        const user = await User.findOne({ email: data.email });
        const expireAt = moment().add(...expiredPeriod).valueOf();

        if (!user) {
            throw new Exception({
                code   : 'AUTHENTICATION_FAILED',
                fields : {
                    email : 'INVALID'
                }
            });
        }

        const asyncCompare = promisify(user._.password.compare);
        const compareResult = await asyncCompare(data.password);

        if (!compareResult) {
            throw new Exception({
                code   : 'AUTHENTICATION_FAILED',
                fields : {
                    password : 'INVALID'
                }
            });
        }

        return {
            data : {
                jwt : jwt.sign({ ...dumpUser(user), expireAt }, secret)
            }
        };
    }
}

import { makeServiceRunner } from '../expressServiceRunning';

export default {
    create : makeServiceRunner('users/Create', req => req.body),
    update : makeServiceRunner('users/Update', req => req.body)
};

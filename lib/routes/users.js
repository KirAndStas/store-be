import { makeServiceRunner } from '../expressServiceRunning';

export default {
    update : makeServiceRunner('users/Update', req => req.body)
};

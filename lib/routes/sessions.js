import { makeServiceRunner, returnErrorResponse, runService }  from '../expressServiceRunning';

export default {
    create : makeServiceRunner('sessions/Create', req => req.body),

    async check(req, res, next) {
        try {
            const userData = await runService('sessions/Check', {
                params : {
                    token : req.query.token
                }
            });

            /* eslint no-param-reassign: 0 */
            req.session.context = userData;

            return next();
        } catch (error) {
            returnErrorResponse(req, res, error);
        }
    }
};

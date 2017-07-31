/* eslint import/imports-first:0  import/newline-after-import:0 */
import path          from 'path';
import bluebird from 'bluebird';
global.Promise = bluebird;

import express       from 'express';
import cors          from 'cors';
import bodyParser    from 'body-parser';
import logger        from 'bunyan-singletone-facade';
import Emb           from 'express-markdown-browser';
import multipart     from 'connect-multiparty';
import routesInit    from './lib/routes';
import { appPort, staticPath }   from './etc/config.json';

import './lib/registerValidationRules';

const routes = routesInit();
const app    = express();
const router = express.Router();
const multipartMiddleware = multipart();
const emb = new Emb({ path: path.join(__dirname, 'apidoc') });

console.log(`APP STARTING ATT PORT ${appPort}`);

logger.init({
    directory : path.join(__dirname, 'logs'),
    name      : 'pet-be'
});

app.use(multipartMiddleware);
const checkSession = routes.sessions.check;

app.use(bodyParser.json({ limit  : 1024 * 1024,
    verify : (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.send({
                status : 0,
                error  : {
                    code    : 'BROKEN_JSON',
                    message : 'Please, verify your json'
                }
            });
        }
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' })); // We allow any origin because we DO NOT USE cookies and basic auth
app.use(multipartMiddleware);

app.listen(appPort);

app.use('/api/', router);
app.use('/apidoc', emb);
app.use('/static', express.static(path.join(__dirname, staticPath)));

// Sessions
router.post('/sessions', routes.sessions.create);

// Users
router.post('/users/:id', routes.users.update);
router.post('/users', routes.users.create);

export default app;

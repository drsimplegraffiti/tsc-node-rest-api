import express from 'express';
import config from 'config';

//import logger
import log from './logger';

//import db
import connect from './db/connect';

//import routes
import routes from './routes';
import { deserializeUser } from './middleware';



// Get config variables
const port = config.get('port') as number;
const host = config.get('host') as string;

// Create a new instance of express app
const app = express();

// import middleware
app.use(deserializeUser);

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Listen
app.listen(port, host, () => {
    log.info(`App is running on http://${host}:${port}`);

    // invoke db connect
    connect();

    //connect routes
    routes(app);
})
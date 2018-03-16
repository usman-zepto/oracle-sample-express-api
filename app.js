
'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const routes = require('./routes');


class Server{

    constructor(){
        this.port =  process.env.PORT || 3000;
        //this.host = `localhost`;
        this.app = express();
    }

    appConfig(){
        this.app.use(
            bodyParser.json()
        );
    }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
    }
    /* Including app Routes ends*/

    appExecute(){

        this.appConfig();
        this.includeRoutes();

        this.app.listen(this.port, () => {
            console.log(`Listening on http://0.0.0.0:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors');

const residential = require('./routes/residentialRoutes')

const port = process.env.PORT || 3000;



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

app.use(cors())
app.disable('x-powered-by')

app.set('port', port);

residential(app);

server.listen(3000, '192.168.0.5' || 'localhost', function(){
    console.log('Estamos en el puerto ', port);
});



//HADLER ERROR 
app.get((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 501).send(err.stack)
})

module.exports = {

    app: app,
    server: server

}
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors');
const passport = require('passport');

/*
    RUTAS
*/

const residential = require('./routes/residentialRoutes')
const user = require('./routes/userRoutes')

const port = process.env.PORT || 3000;


app.use(
    session({
        secret: "angeles-32",
        resave: false,
        saveUninitialized: false,
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')

app.set('port', port);

/*
  LLAMADO A RUTAS  
*/

residential(app);
user(app);

server.listen(3000, '192.168.0.2' || 'localhost', function(){
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
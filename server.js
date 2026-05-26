const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const serviceAccountKey = require('./serviceAccountKey.json');
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

const upload = multer({
    storage: multer.memoryStorage()
})

/*
*    RUTAS
*/

const residential = require('./routes/residentialRoutes')
const user = require('./routes/userRoutes')
const orders = require('./routes/orderRoutes');
const sets = require('./routes/setRoutes')

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
user(app, upload);
orders(app, upload);
sets(app);

server.listen(3000, process.env.IP || '0.0.0.0', function(){
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
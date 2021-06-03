const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const mysql = require('mysql');
const myConnection = require('express-myconnection');

//mysql connection
const connOptions = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
}
app.use(myConnection(mysql, connOptions, 'single'))

//requerimos las rutas
const inscriptionRoute = require('./routes/inscription.js');

//middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded());

//rutas
app.use('/inscripcion', inscriptionRoute);

app.get('/lista', (req, res)=>{
    res.sendFile(`${__dirname}/public/lista.html`)
})

app.get('/about', (req, res)=>{
    res.sendFile(`${__dirname}/public/about.html`)
})

app.get('*', (req, res)=>{
    res.status(404).send(`
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background: #D9EEF3">
            <div style="max-width: 800px; margin: 10% auto;">
                <h1 style="font-size: 5rem; text-align: center;">404</h1>
                <h1>Pagina no encontrada</h1>
                <a href="/">Volver a la pagina Principal</a>
            </div>
        </body>
    `)
})

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});

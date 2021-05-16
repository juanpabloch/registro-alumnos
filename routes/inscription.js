const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', (req, res)=>{
    res.sendFile('form.html', {root: `${__dirname}/../public`});
})


router.post('/', [
    check('nombre').trim().escape(),
    check('apellido').trim().escape(),
    check('telefono').isNumeric().trim().escape(),
    check('email').isEmail().normalizeEmail().trim(),
    check('provincia'),
    check('curso'),
    check('turno')
], (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
    }else{
        const data = req.body;
        req.getConnection((error, conn)=>{
            if(error)throw Error(`Error! ${error}`);
            conn.query('INSERT INTO inscripcion SET ?', [data], (err, alumnos)=>{
                console.log(alumnos)
                res.redirect('/lista');
            });
        });
    };
});


router.get('/lista', (req, res)=>{
    try {
        req.getConnection((err, conn)=>{
            if(err)throw Error(`Error! ${err}`)
            conn.query('SELECT * FROM inscripcion', (err, alumnos)=>{
                if(err)throw Error(`Error! ${err}`);
                res.json(alumnos);
            });
        });
    } catch (error) {
        console.log(error);
    };
});


router.get('/lista/:id', (req, res)=>{
    const data = req.params.id;
    req.getConnection((err, conn)=>{
        if(err)throw new Error(`Error! ${err}`);
        conn.query('SELECT * FROM inscripcion WHERE id = ?', [data], (err, alumno)=>{
            if(err)throw new Error(`Error! ${err}`);
            res.json(alumno[0]);
        });
    });
});


router.get('/delete', (req, res)=>{
    const id = Number(req.query.id);
    req.getConnection((err, conn)=>{
        if(err)throw new Error(`Error! ${err}`);
        conn.query('DELETE FROM inscripcion WHERE id = ?', [id], (err, alumno)=>{
            if(err)throw new Error(`Error! ${err}`);
            res.redirect('/lista');
        });
    });
});


router.get('/actualizar/:id', (req, res)=>{
    const dataId = req.params.id;
    req.getConnection((err, conn)=>{
        if(err)throw new Error(`Error! ${err}`);
        conn.query('SELECT * FROM inscripcion WHERE id = ?', [dataId], (err, alumno)=>{
            if(err)throw new Error(`Error! ${err}`);
            const data = alumno[0];
            const style = `
                background: #d7f4fbc0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 300px;
                margin-top: 80px;
                padding: 20px;
            `;

            const styleDiv = `
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            `;

            const styleBtn = `
                border: 1px solid #000;
                padding: 8px 15px;
                margin-right: 20px;
                font-size: 1.2rem;
                text-decoration: none;
                color: #000;
            `

            res.send(`
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div style='${styleDiv}'>
                    <form style='${style}'  action="/inscripcion/actualizar" method="post">
                        <input style="margin-bottom: 10px;" type="text" name="id" value="${dataId}" hidden>
                        <input style="margin-bottom: 10px;" type="text" name="nombre" id="nombre" placeholder="Nombre" value='${data.nombre}'>
                        <input style="margin-bottom: 10px;" type="text" name="apellido" id="apellido" placeholder="Apellido" value='${data.apellido}'>
                        <input style="margin-bottom: 10px;" type="number" name="telefono" id="telefono" placeholder="Telefono" value='${data.telefono}'>
                        <input style="margin-bottom: 10px;" type="email" name="email" id="email" placeholder="Email" value='${data.email}'>
                        <input style="margin-bottom: 10px;" type="submit" value="Enviar">
                    </form>
                    <a style='${styleBtn}' href="/lista">Volver</a>
                </div>
            </body>
            `);
        });
    });
});

router.post('/actualizar', (req, res)=>{
    console.log(req.body)
    const { id, nombre, apellido, telefono, email } = req.body;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM inscripcion WHERE id = ?', [Number(id)], (err, alumno)=>{
            if(err)throw new Error(`Error! ${err}`);
            const data = alumno[0];
            conn.query(`UPDATE inscripcion SET nombre = ?, apellido = ?, telefono = ?, email = ?, provincia = ?, curso = ?, disponibilidad = ? WHERE id = ?`, 
        [nombre, apellido, telefono, email, data.provincia, data.curso, data.disponibilidad, id], (err, alumno)=>{
                        if(err)console.log(err);
                        console.log(alumno);
                        res.redirect('/lista');
                    });
        });
    });
});

module.exports = router;
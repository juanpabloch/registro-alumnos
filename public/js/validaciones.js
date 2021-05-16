const validarNombre = (nombre)=>{
    if(nombre.length === 0){
       errores.push('El Nombre debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(nombre)){
        errores.push('El Nombre debe contener solo letras y un solo espacio')
    }
}

const validarApellido = (apellido)=>{
    if(apellido.length === 0){
       errores.push('El Apellido debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(apellido)){
        errores.push('El Apellido debe contener solo letras y un solo espacio')
    }
}

const validarNumero = (numero)=>{
    if(numero.length < 8){
       errores.push('El Telefono debe tener mas de 8 numeros') 
    }
    if(!/^[0-9]+$/i.test(numero)){
        errores.push('El Telefono debe contener solo numeros')
    }
}

const validarProvincia = (provincia)=>{
    if(!provincia){
        errores.push('Debe seleccionar una Provincia')
    }
}

const validarCurso = (curso)=>{
    if(!curso){
        errores.push('Debe seleccionar un Curso')
    }
}

const formulario = document.querySelector('#formulario');
const listaErrores = document.querySelector('#errores ul');

let errores = [];

formulario.addEventListener('submit', e=>{
    const {nombre, apellido, telefono, email, provincias, curso} = e.target.elements;

    errores = [];

    validarNombre(nombre.value);
    validarApellido(apellido.value);
    validarNumero(telefono.value);
    validarProvincia(provincias.value);
    validarCurso(curso.value);
    
    if(errores.length !== 0){
        listaErrores.innerHTML = '';
        e.preventDefault();
        errores.forEach(error=>{
            const li = document.createElement('li');
            li.textContent = error;
            listaErrores.appendChild(li);
        })
    }
})
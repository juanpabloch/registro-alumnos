const lista = document.querySelector('.lista');
const showCard = document.querySelector('#showCard');
    showCard.style.display = 'none';
    const cerrar = document.querySelector('#cerrar');
    const alumno = document.querySelector('.alumno-info');
    cerrar.addEventListener('click', e=>{
        showCard.style.display = 'none';
        alumno.innerHTML = '';
    })



const fragment = document.createDocumentFragment(); 


const renderList = (alumnos)=>{
    lista.innerHTML = '';
    fragment.innerHTML = '';
    alumnos.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('alumno');
        div.innerHTML = `
        <div class="nombre flex">
            <p>${item.nombre}</p>
            <p>${item.apellido}</p>
        </div>
        <p class="email">${item.email}</p>
        <button data-id="${item.id}" class="btn" id="botonVer">VER</button>
        `;
        fragment.appendChild(div);
        lista.appendChild(fragment);
    });
}

async function getData(){
    const response =  await fetch('/inscripcion/lista');
    if(response.status === 200){
        const data = await response.json();
        renderList(data);
        buttonFunctions(renderAlumno);
    }else{
        throw new Error('error al recuperar informacion')
    }
}

getData()

/* alumno */
function buttonFunctions(render){
    const botones = document.querySelectorAll('#botonVer');

    botones.forEach(item=>{
        item.addEventListener('click', e=>{
            console.log(e.target.dataset.id)
            render(e.target.dataset.id)
        })
    })
}

async function renderAlumno(id){
    const response =  await fetch(`inscripcion/lista/${id}`);
    if(response.status === 200){
        const data = await response.json();
        console.log(data)
        renderData(data)
        console.log('hola1')
    }else{
        throw new Error('error al recuperar informacion')
    }
    
 async function renderData(data){
        const datos = await data;
        showCard.style.display = 'block'
        alumno.innerHTML = '';
        alumno.innerHTML = `
            <h2><span class="nombre-alumno">${datos.nombre}</span> ${datos.apellido}</h2>
            <div class="info-alumno">
                <p>Email: <span class="spanInfo">${datos.email}</span></p>
                <p>Telefono: <span class="spanInfo">${datos.telefono}</span></p>
                <p>Provincia: <span class="spanInfo">${datos.provincia}</span></p>
                <p>Curso seleccionado: <span class="spanInfo">${datos.curso}</span></p>
                <p>Disponibilidad Horaria: <span class="spanInfo">${datos.disponibilidad}</span></p>
            </div>
            <div class="botones">
                <a class="btn" href="/inscripcion/actualizar/${datos.id}">Modificar</a>
                <a class="btn" href="/inscripcion/delete?id=${datos.id}">Eliminar</a>
            </div>
        `
    }
}

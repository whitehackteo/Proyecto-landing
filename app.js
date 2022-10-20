
let listaEstudiantes = [];

const objEstudiante = {
    id: '',
    nombre: '',
    apellido: '',
    curso: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const cursoInput = document.querySelector('#curso');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || cursoInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarEstudiante();
        editando = false;
    } else {
        objEstudiante.id = Date.now();
        objEstudiante.nombre = nombreInput.value;
        objEstudiante.apellido = apellidoInput.value;
        objEstudiante.curso = cursoInput.value;

        agregarEstudiante();
    }
}

function agregarEstudiante() {
    listaEstudiantes.push({...objEstudiante});

    mostrarEstudiantes();

    formulario.reset();

    limpiarObjeto();

    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes));
}

function limpiarObjeto(){
    objEstudiante.id = '';
    objEstudiante.nombre = '';
    objEstudiante.apellido = '';
    objEstudiante.curso = '';
}

function mostrarEstudiantes() {

    limpiarHTML();

    const divEstudiantes = document.querySelector('.div-estudiantes');

    listaEstudiantes.forEach( estudiante => {
        const {id, nombre, apellido, curso} = estudiante;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${curso} `; parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstudiante(estudiante); 
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEstudiantes.appendChild(parrafo);
        divEstudiantes.appendChild(hr);

        localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes));
    });
}

function cargarEstudiante(estudiante) {

    const {id, nombre, apellido, curso} = estudiante;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    cursoInput.value = curso;

    objEstudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes));
}

function editarEstudiante(){
    objEstudiante.nombre = nombreInput.value;
    objEstudiante.apellido = apellidoInput.value;
    objEstudiante.curso = cursoInput.value;

    listaEstudiantes.map( estudiante => {
        if(estudiante.id === objEstudiante.id) {
            estudiante.id = objEstudiante.id;
            estudiante.nombre = objEstudiante.nombre;
            estudiante.apellido = objEstudiante.apellido;
            estudiante.curso = objEstudiante.curso;
        }
    });

    limpiarHTML();
    mostrarEstudiantes();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar'

    editando = false;
} 

function eliminarEstudiante(id) {
    listaEstudiantes = listaEstudiantes.filter(estudiante => estudiante.id !== id);

    limpiarHTML();
    mostrarEstudiantes();
    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes));
}

function limpiarHTML(){
    const divEstudiantes = document.querySelector('.div-estudiantes');
    while(divEstudiantes.firstChild){
        divEstudiantes.removeChild(divEstudiantes.firstChild);
    }
}

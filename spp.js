if(localStorage.getItem('listaEstudiantes') === null) {
    let listaEstudiantes = []
    listaEstudiantes.push(estudiante)
    localStorage.setItem('listaEstudiantes', JSON.stringify(listaEstudiantes))
}else{
    let listaEstudiantes = JSON.parse(localStorage.getItem("listaEstudiantes"))
    listaEstudiantes.push(listaEstudiantes)
    localStorage.setItem("listaEstudiantes", JSON.stringify(listaEstudiantes))
}

document.getElementById("formulario").reset();
console.log("Lista de estudiante guardada correctamente")
e.preventDefault()
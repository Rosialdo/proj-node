const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
  const response = await fetch("http://localhost:3000/cursos");
  const cursos = await response.json();
  preencheTela(cursos);
  console.log(cursos);
}


function preencheTela(cursos) {
  cursos.forEach((curso) => {
    const novoCursoHTML = `
    <div class="cursos">
        <h3>${curso.nome}</h3>
        <p>Carga Horária: ${curso.ch} h</p>
        <a href="editar.html?id=${curso.id}"><button class="edit"><i class="fa fa-edit"></i></button></a>
        <button class="remove" onclick="deletecurso(${curso.id})"><i class="fa fa-trash"></i></button></button> 
       
    `;
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
  });
}

async function consultaCurso(id) {
  const response = await fetch(`http://localhost:3000/cursos/${id}`);
  return await response.json()[0];
}

async function deletecurso(id) {
  const response = await fetch(`http://localhost:3000/cursos/delete/${id}`, {
    method:"DELETE" 

  });
  window.location.assign("index.html");
}

async function updatecurso(id, data) {
  const response = await fetch(`http://localhost:3000/update/${id}`, {
    method:"PUT",
    headers: {"Content-Type":"application/json"},
    body:JSON.stringify(data)
    
  });

}


consultaCursos();

const botoesremove = document.querySelectorAll(".remove")

console.log(botoesremove)

botoesremove.forEach(botao => {
  botao.addEventListener("click", async(event) => {
    const id = event.target.id.match(/\d+/g).map(Number)
    await deletecurso(id)
  } )
})



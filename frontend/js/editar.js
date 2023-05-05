
const formulario = document.querySelector(".formulario")
const id_curso = new URLSearchParams(window.location.search).get('id')

async function preencherFormulario() {
    const idDoCurso = await consultaCurso(id_curso)
    
    formulario.innerHTML = `
    <label for="nome">Nome do Curso:</label>
    <input type="text" id="nome" name="nome" value="${idDoCurso.nome}" required><br><br>
    <label for="carga-horaria">Carga Horária:</label>
    <input type="text" id="carga-horaria" name="carga-horaria" value="${idDoCurso.ch}" required><br><br>
    <button type="submit">Salvar</button>
    `
}

formulario.addEventListener("submit", async(event ) => {

    event.preventDefault()
    await atualizarCurso(id_curso, {nome: event.target[0].value, ch: event.target[1].value})
    window.location.assign("index.html")

})

async function consultaCurso(id) {
    const response = await fetch(`http://localhost:3000/cursos/${id}`);
    const curso = await response.json()
    
    return curso;
  }

async function atualizarCurso(id, data) {
	await fetch(`http://localhost:3000/cursos/update/${id}`, {
		method: "PUT",
		body: JSON.stringify({ nome: data.nome, ch: data.ch }),
		headers: {
			"Content-Type": "application/json",
		},
	});
    window.location.assign("index.html");
}

preencherFormulario()
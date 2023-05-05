const formulario = document.querySelector(".formulario")
formulario.addEventListener("submit", async(event ) => {

    event.preventDefault()
    await createcurso({nome: event.target[0].value, ch: event.target[1].value})
    window.location.assign("index.html")

})


async function createcurso(data) {
    const response = await fetch(`http://localhost:3000/cursos/create`, {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({nome: data.nome, ch: data.ch})
      
    });
  
}
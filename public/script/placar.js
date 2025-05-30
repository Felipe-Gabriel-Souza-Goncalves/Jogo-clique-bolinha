var maioresPontuacoes = []
let contador = 0

ftPerfil.forEach((ft, i) =>{
    const img = document.createElement("img")
    img.src = ft

    let descricao = ft.slice(ft.indexOf("l/")+2, ft.indexOf("."))
    img.alt = descricao

    img.setAttribute("onclick", `mudarPerfil(${i})`)

    img.classList.add("foto")

    if(i >= 0 && i <= 8){
        document.getElementsByClassName("gridPerfil")[0].appendChild(img)
    } else if(i >= 9 && i <= 17){
        document.getElementsByClassName("gridPerfil")[1].appendChild(img)

    } else if(i >= 18 && i <= 26){
        document.getElementsByClassName("gridPerfil")[2].appendChild(img)
    }

})

function maisContador(){
  contador++
  if(contador == 3){
    contador = 0
  }
  slideFotos()
}
function menosContador(){
  contador--
  if(contador == -1){
    contador = 2
  }
  slideFotos()
}

function slideFotos(){
  document.getElementsByClassName("gridPerfil")[0].style.display = "none"
  document.getElementsByClassName("gridPerfil")[1].style.display = "none"
  document.getElementsByClassName("gridPerfil")[2].style.display = "none"

  document.getElementsByClassName("gridPerfil")[contador].style.display = "grid"
}

slideFotos()

document.querySelector("#formNickname").addEventListener("submit", e =>{

  e.preventDefault()  

  if(document.getElementById("nickname").value.trim() !== ""){
    jogador = document.getElementById("nickname").value.trim()
    document.getElementById("nickname").disabled = true
    document.getElementById("aviso").style.display = "none"
  } else{
    console.log("Nome inválido")
    return
  }

  
  document.querySelector("#formNickname").style.display = "none"
})

function abrirPlacar(){
  document.getElementById('placar').style.display = 'flex';
  carregarPlacar();
}

// PARA VERIFICAR (isso tá fazendo alguma coisa?)
function filtrarPontuacoes(){
  maioresPontuacoes.sort((a, b) => {
    return b[0] - a[0]
  })
  return maioresPontuacoes
}

let placarDesktop = true 
async function carregarPlacar(dificuldade = "geral") {
    try {
        const resposta = await fetch('/placar');
        const dados = await resposta.json();

        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";

        let colocacao = 1
        dados.forEach((item, index) => {
          if(item.foto == undefined){
            item.foto = 2
          } 
          if(item.jogador.includes('<style>')){
              item.jogador = item.jogador.replace('<style>', '-style-')
          }
          if(item.isDesktop == placarDesktop && (item.dificuldade == dificuldade || dificuldade == "geral") ){
            console.log("teste ", item.isDesktop == placarDesktop)
            const tr = document.createElement("tr")
            tr.classList.add("linhaPlacar")
            tr.innerHTML = `
              <td>
                ${colocacao}º-
              </td>
              <td>
                <img src='${ftPerfil[item.foto]}' alt='foto'>
              </td>
              <td>
                ${item.jogador}
              </td>
              <td>
                ${item.pontuacao}
              </td>
              <td>
                ${item.dificuldade}
              </td>
            `
            leaderboard.appendChild(tr);

            colocacao++
          }
        });
    } catch (error) {
        console.error('Erro ao carregar placar:', error);
    }
}

socket.on('atualizar placar', () => {
  carregarPlacar();
});

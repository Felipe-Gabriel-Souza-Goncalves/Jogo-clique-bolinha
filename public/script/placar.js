var maioresPontuacoes = []

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


function filtrarPontuacoes(){
  maioresPontuacoes.sort((a, b) => {
    return b[0] - a[0]
  })
  return maioresPontuacoes
}


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
          if(item.dificuldade == dificuldade || dificuldade == "geral"){
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

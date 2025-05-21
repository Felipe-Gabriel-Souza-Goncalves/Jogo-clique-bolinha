var maioresPontuacoes = []

document.querySelector("#formNickname").addEventListener("submit", e =>{

  e.preventDefault()  

  if(document.getElementById("nickname").value.trim() !== ""){
    jogador = document.getElementById("nickname").value.trim()
    document.getElementById("nickname").disabled = true
    document.getElementById("aviso").style.display = "none"
  }


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


async function carregarPlacar() {
    try {
        const resposta = await fetch('/placar');
        const dados = await resposta.json();

        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";

        dados.forEach((item, index) => {
            const p = document.createElement("p");
            p.innerText = `${index + 1} - Jogador ${item.jogador} marcou ${item.pontuacao} na dificuldade: ${item.dificuldade}!`;
            leaderboard.appendChild(p);
        });
    } catch (error) {
        console.error('Erro ao carregar placar:', error);
    }
}

socket.on('atualizar placar', () => {
  carregarPlacar();
});

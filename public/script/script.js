const socket = io();

const bolinha = document.getElementById("bolinha")
const maiorPontuacao = document.getElementById("maiorPontuacao")
const elementPontuacao = document.getElementById("pontuacao")
const fotoSelecionada = document.getElementsByClassName("fotoSelecionada")

const config = {

}

let jogando = false
let marcou = true
let pontuacao = 0
var jaAcicionou = false
var tempo = 1500
let dificuldade = "Médio"
var intervalo;
var saldo = 0
let jogador = null
let indexPerfil = undefined
var posicaoAnteriorX = 50; 
var ftPerfil = ["/imagem/ftPerfil/defensor_esterco.png",
                "/imagem/ftPerfil/falso_cavaleiro.webp",
                "/imagem/ftPerfil/knight.png",
                "/imagem/ftPerfil/lordes_louva_deus.png",
                "/imagem/ftPerfil/receptaculo_quebrado.png",
                "/imagem/ftPerfil/sentinela.webp",
                "/imagem/ftPerfil/xero.webp",
                "/imagem/ftPerfil/colmeia.webp",
                "/imagem/ftPerfil/domador_deuses.webp"]



if(localStorage.getItem("saldo") !=null){
    saldo = parseInt(localStorage.getItem("saldo"))
    document.getElementById("saldo").innerHTML = localStorage.getItem("saldo")
} else{
    document.getElementById("saldo").innerHTML = saldo
}


function gerenciarTempo(param){
    switch (param) {
        case 2000:
            dificuldade = "Fácil"
            break;
        case 1500:
            dificuldade = "Médio"
            break;
        case 1000:
            dificuldade = "Difícil"
            break;
        case 800:
            dificuldade = "Extremo"
            break;
        default:
            alert("como você fez isso?")
            break;
    }
    if(window.innerWidth < 700){
        switch (param) {
            case 2000:
                tempo = 1500
                break;
            case 1500:
                tempo = 1075
                break;
            case 1000:
                tempo = 775
                break;
            case 800:
                tempo = 500
                break;
            default:
                alert("como você fez isso?")
                break;
        }
    }
}

function pegarMaiorPontuacao(){
        if(localStorage.getItem("maiorPontuacao") != null){
            maiorPontuacao.innerHTML = "Maior pontuação: " + localStorage.getItem("maiorPontuacao")
        } else if(localStorage.getItem("maiorPontuacao") == null){
            localStorage.setItem("pontuacao", pontuacao)
        }
}

function comecar(){
    pontuacao = 0
    gerados = 0
    document.getElementsByClassName("divDificuldade")[0].style.display = "none"
    document.getElementById("loja").style.display = "none"
    document.getElementById("placar").style.display = "none"
    if(jogando == true){
        marcou = true
        intervalo = setInterval(gerarBola, tempo)
    } 
    document.getElementById("botaoJogar").disabled = true
}


function gerarBola() {
    socket.emit('atualizar verificador')
    bolinha.style.filter = "invert(0)";
    elementPontuacao.style.color = 'var(--corFonte)';
    elementPontuacao.innerHTML = pontuacao;

    document.getElementById("gameOver").style.visibility = 'hidden';
    
    if (!marcou) {
        perder();
        return;
    }

    // Gera nova posição X com limite de variação de 30%
    let minX = Math.max(0, posicaoAnteriorX - 35);
    let maxX = Math.min(95, posicaoAnteriorX + 35);
    let novoX = Math.random() * (maxX - minX) + minX;
    posicaoAnteriorX = novoX; // atualiza a posição anterior

    let y = Math.ceil(Math.random() * 90);

    bolinha.style.marginLeft = `${novoX}%`;
    bolinha.style.top = `${y}%`;
    bolinha.style.display = "block";

    marcou = false;
    jaAcicionou = false;
}

bolinha.addEventListener("click", ()=>{
    if(!jaAcicionou){
        marcou = true
        jaAcicionou = true
        bolinha.style.filter = "invert(1)"
        contarPontuacao()
    }  
})

async function perder(){

    if(jogador != null && pontuacao != 0){
        socket.emit('chat message', { jogador, pontuacao, dificuldade, indexPerfil});
    }
    socket.emit("restart verificador")

    if(pontuacao >= parseInt(localStorage.getItem("maiorPontuacao"))){
        localStorage.setItem("pontuacao", pontuacao)
        localStorage.setItem("dificuldade", dificuldade)
    }
        pegarMaiorPontuacao()
        elementPontuacao.style.color = 'red'
        bolinha.style.display = "none"
        document.getElementById("gameOver").style.visibility = 'visible'
        document.getElementById("botaoJogar").disabled = false
        
        saldo = parseInt(saldo)+parseInt(pontuacao)
        localStorage.setItem('saldo', saldo)
        document.getElementById("saldo").innerHTML = saldo

        pontuacao = 0
        jogando = false
        clearInterval(intervalo)
        return
}

function contarPontuacao(){
    if(marcou == true){
        pontuacao +=1
        elementPontuacao.innerHTML = pontuacao
    }
}

function reiniciar(){
    location.reload()
}

function mudarPerfil(index){
    indexPerfil = index

    for(let j = fotoSelecionada.length -1; j > -1; j--){
        fotoSelecionada[j].classList.remove("fotoSelecionada")
    }
    document.getElementsByClassName("foto")[index].classList.add("fotoSelecionada")
}

pegarMaiorPontuacao()


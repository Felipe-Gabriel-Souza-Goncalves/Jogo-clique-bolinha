const bolinha = document.getElementById("bolinha")
const maiorPontuacao = document.getElementById("maiorPontuacao")
const elementPontuacao = document.getElementById("pontuacao")
let jogando = false
let marcou = true

let pontuacao = 0
var jaAcicionou = false
var tempo = 1500
var intervalo;
var saldo = 0

if(localStorage.getItem("saldo") !=null){
    saldo = localStorage.getItem("saldo")
    document.getElementById("saldo").innerHTML = localStorage.getItem("saldo")
} else{
    document.getElementById("saldo").innerHTML = saldo
}


function gerenciarTempo(param){
    if(window.innerWidth < 700){
        switch (param) {
            case 2000:
                tempo = 1650
                break;
            case 1500:
                tempo = 1200
                break;
            case 1000:
                tempo = 850
                break;
            case 800:
                tempo = 575
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
    document.getElementsByClassName("divDificuldade")[0].style.display = "none"
    document.getElementById("loja").style.display = "none"
    if(jogando == true){
        marcou = true
        intervalo = setInterval(gerarBola, tempo)

    } 
}

let posicaoAnteriorX = 50; 

function gerarBola() {
    console.log(tempo)
    bolinha.style.filter = "invert(0)";
    elementPontuacao.style.color = 'black';
    elementPontuacao.innerHTML = pontuacao;

    document.getElementById("gameOver").style.visibility = 'hidden';
    
    if (!marcou) {
        perder();
        return;
    }

    // Gera nova posição X com limite de variação de 30%
    let minX = Math.max(0, posicaoAnteriorX - 35);
    let maxX = Math.min(100, posicaoAnteriorX + 35);
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

function perder(){
    if(pontuacao >= parseInt(localStorage.getItem("maiorPontuacao"))){
        localStorage.setItem("pontuacao", pontuacao)
    }
        pegarMaiorPontuacao()
        elementPontuacao.style.color = 'red'
        bolinha.style.display = "none"
        document.getElementById("gameOver").style.visibility = 'visible'
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

pegarMaiorPontuacao()
   
// document.body.addEventListener("mousemove", () =>{
//     if(window.innerWidth < 700){
//         tempo = 500
//     }
// })
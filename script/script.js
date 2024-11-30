const bolinha = document.getElementById("bolinha")
const maiorPontuacao = document.getElementById("maiorPontuacao")
const elementPontuacao = document.getElementById("pontuacao")
let jogando = false
let marcou = true

let pontuacao = 1000
var jaAcicionou = false
var tempo = 1500
var intervalo;
var saldo = 0

document.getElementById("saldo").innerHTML = saldo

function pegarMaiorPontuacao(){
        if(localStorage.getItem("pontuacao") != null){
            maiorPontuacao.innerHTML = "Maior pontuação: " + localStorage.getItem("pontuacao")
        } else if(localStorage.getItem("pontuacao") == null){
            localStorage.setItem("pontuacao", pontuacao)
        }
}

function comecar(){
    document.getElementsByClassName("divDificuldade")[0].style.display = "none"
    setTimeout("", 1000)
    if(jogando == true){
        marcou = true
        intervalo = setInterval(gerarBola, tempo)

    } 
}

function gerarBola(){
    bolinha.style.filter = "invert(0)"
    elementPontuacao.style.color = 'black'
    elementPontuacao.innerHTML = pontuacao

    document.getElementById("gameOver").style.visibility = 'hidden'
    if(marcou == false){
        perder()
        return
    }

    var x = Math.max(Math.random()*90)
    var y = Math.max(Math.random()*90)

    bolinha.style.marginLeft = `${x}%`
    bolinha.style.top = `${y}%`
    bolinha.style.display = "block"

    marcou = false
    jaAcicionou = false
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
    if(pontuacao >= parseInt(localStorage.getItem("pontuacao"))){
        localStorage.setItem("pontuacao", pontuacao)
    }
        pegarMaiorPontuacao()
        elementPontuacao.style.color = 'red'
        bolinha.style.display = "none"
        document.getElementById("gameOver").style.visibility = 'visible'
        saldo +=pontuacao
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
   


var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
    pincel.fillStyle = 'lightgrey'
 
let jogando = false
let marcou = true
var x;
var y;
let pontuacao = 0
var jaAcicionou = false

function comecar(){
    if(jogando == true){
        setTimeout(gerarBola, 2000)
    } else{

    }
}

function gerarBola(){

    if(!marcou){
        document.getElementById("pontuacao").style.color = 'red'
        document.getElementById("gameOver").style.visibility = 'visible'
        jogando = false
    }

    x = Math.ceil(Math.random()*1490)+20;
    y = Math.ceil(Math.random()*459)+20;

    pincel.clearRect(0,0, tela.width,window.innerHeight)
    pincel.fillStyle = 'lightgrey'
    pincel.beginPath();
    pincel.ellipse(x, y, 20, 20, 2 * Math.PI, 0, 2 * Math.PI);
    pincel.fill();
    // console.log("desenhou")

    marcou = false
    jaAcicionou = false

    comecar()
}

document.body.addEventListener("click", clique =>{
    var x2 = clique.pageX - tela.offsetLeft
    var y2 = clique.pageY - tela.offsetTop;


    console.log(x + " " + y)
    console.log(x2 + " " + y2)

    if(jogando != true){
        return
    }
    if(x2 > x-30 && x2 < x+30 && y2 > y-20 && y2 < y+20 && jaAcicionou == false) {
        marcou = true
        pontuacao+=1
        document.getElementById('pontuacao').innerHTML = pontuacao
        jaAcicionou = true

        pincel.fillStyle = 'red'
        pincel.beginPath();
        pincel.ellipse(x, y, 20, 20, 2 * Math.PI, 0, 2 * Math.PI);
        pincel.fill();
    }
})

function reiniciar(){
    location.reload()
}


   

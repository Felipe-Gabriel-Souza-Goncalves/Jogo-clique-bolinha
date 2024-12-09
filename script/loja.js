
function corBola(cor, id, img){
    for(let i = 0; i < document.getElementsByClassName('comprado').length; i++){
        document.getElementsByClassName('comprado')[i].innerHTML = "Selecionar"
    }
    
    document.getElementById(id).innerHTML = "Selecionado"
    if(cor != ''){
        bolinha.style.backgroundColor = cor
    }
    if(img != ''){
        document.getElementById('imgBola').src = img
    }
}

function comprarBola(id, cor, preco, img){
    if(saldo >= preco){
        saldo -=preco
        document.getElementById('saldo').innerHTML = saldo
        document.getElementById(id).setAttribute('onclick', `corBola('${cor}', '${id}','${img}')`)  
        document.getElementById(id).innerHTML = "Selecionar"
        document.getElementById(id).classList.add("comprado")
    }
}

function corFundo(cor, id, img){
    for(let i = 0; i < document.getElementsByClassName('comprado').length; i++){
        document.getElementsByClassName('comprado')[i].innerHTML = "Selecionar"
    }
    document.getElementById(id).innerHTML = "Selecionado"

    if(cor != ''){
        document.getElementById('areaDoJogo').style.backgroundColor = cor
    }
    if(img != ''){
        document.getElementById('areaDoJogo').style.background = `url(${img})`
        document.getElementById('areaDoJogo').style.backgroundRepeat = "no-repeat"
        document.getElementById('areaDoJogo').style.backgroundSize = "cover"
        document.getElementById('areaDoJogo').style.backgroundPosition = "center"
        document.getElementById('areaDoJogo').style.backgroundAttachment = "fixed"
    }
    if(img == "imagem/fundo/fundo_xadrez.jpg"){
        document.getElementById('areaDoJogo').style.backgroundRepeat = "repeat-x"
    }
}

function comprarFundo(id, cor, preco, img){
    if(saldo >= preco){
        saldo -=preco
        document.getElementById('saldo').innerHTML = saldo
        document.getElementById(id).setAttribute('onclick', `corFundo('${cor}', '${id}','${img}')`)  
        document.getElementById(id).innerHTML = "Selecionar"
        document.getElementById(id).classList.add("comprado")
    }
}
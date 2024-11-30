
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
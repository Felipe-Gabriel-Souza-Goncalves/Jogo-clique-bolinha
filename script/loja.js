
function corBola(cor, id){
    for(let i = 0; i < document.getElementsByClassName('comprado').length; i++){
        document.getElementsByClassName('comprado')[i].innerHTML = "Selecionar"
    }
    
    document.getElementById(id).innerHTML = "Selecionado"
    bolinha.style.backgroundColor = cor
}

function comprarBola(id, cor, preco){
    if(saldo >= preco){
        saldo -=preco
        document.getElementById('saldo').innerHTML = saldo
        document.getElementById(id).setAttribute('onclick', `corBola('${cor}', '${id}')`)  
        document.getElementById(id).innerHTML = "Selecionar"
        document.getElementById(id).classList.add("comprado")
    }
}
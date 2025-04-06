function corBola(cor, id, img){
    for(let i = 0; i < document.getElementsByClassName('comprado').length; i++){
        document.getElementsByClassName('comprado')[i].innerHTML = "Selecionar"
    }
    
    document.getElementById(id).innerHTML = "Selecionado"
    if(cor != ''){
        bolinha.style.backgroundColor = cor
        document.getElementById('imgBola').style.display = "none"
    }
    if(img != ''){
        document.getElementById('imgBola').style.display = "block"
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
        saldo -= preco
        document.getElementById('saldo').innerHTML = saldo
        document.getElementById(id).setAttribute('onclick', `corFundo('${cor}', '${id}','${img}')`)  
        document.getElementById(id).classList.add("comprado")
    }
}

async function carregarBolas(){
    fetch("bolas.json").then(response => response.json())
    .then(bolas =>{
        bolas.forEach(bola => {
            const opcaoContainer = document.createElement("div")
            opcaoContainer.classList.add("opcaoContainer")

            // Para visualizar como ficará a bola
            const viewBola = document.createElement("div")
            viewBola.classList.add("viewBola")
            if(bola.tipo == "cor"){
                viewBola.style.backgroundColor = bola.cor
            } else{
                viewBola.style.background = `url(${bola.imagem})`
            }

            // O texto do item
            const textoItem = document.createElement("p")
            textoItem.innerHTML = bola.texto + "<br>" + bola.preco + " - pontos"
            
            // O botão de comprar
            const btnComprar = document.createElement("button")
            btnComprar.innerText = "Comprar"
            btnComprar.id = bola.id
            btnComprar.setAttribute("onclick", `comprarBola('${bola.id}', '${bola.cor}', '${bola.preco}', '${bola.imagem}')`)
            btnComprar.classList.add("btnComprar")

            opcaoContainer.appendChild(viewBola)
            opcaoContainer.appendChild(textoItem)
            opcaoContainer.appendChild(btnComprar)

            document.getElementById("opcoesBolas").appendChild(opcaoContainer)
        });
    })
}

async function carregarFundo() {
    fetch("fundos.json").then(response => response.json())
    .then(fundos =>{
        fundos.forEach(fundo =>{
            const opcaoContainer = document.createElement("div")
            opcaoContainer.classList.add("opcaoContainer")
            opcaoContainer.classList.add("opcaoFundo")

            // Para visualizar como ficará o fundo
            const viewFundo = document.createElement("div")
            viewFundo.classList.add("viewFundo")
            if(fundo.tipo == "cor"){
                viewFundo.style.backgroundColor = fundo.cor
            } else{
                viewFundo.style.background = `url(${fundo.imagem})`
            }

            // O texto do item
            const textoItem = document.createElement("p")
            textoItem.innerHTML = fundo.texto + "<br>" + fundo.preco + " - pontos"
            
            // O botão de comprar
            const btnComprar = document.createElement("button")
            btnComprar.innerText = "Comprar"
            btnComprar.id = fundo.id
            btnComprar.setAttribute("onclick", `comprarFundo('${fundo.id}', '${fundo.cor}', '${fundo.preco}', '${fundo.imagem}')`)
            btnComprar.classList.add("btnComprar")

            opcaoContainer.appendChild(viewFundo)
            opcaoContainer.appendChild(textoItem)
            opcaoContainer.appendChild(btnComprar)

            document.getElementById("opcoesFundos").appendChild(opcaoContainer)
        })
    })
}
carregarBolas()
carregarFundo()
const root = document.querySelector(":root")

if(sessionStorage.getItem("modoEscuro") == "true"){
    document.getElementById("inputModoEscuro").checked = true
    tornarModoEscuro()
} else{
    tornarModoClaro()
}

function toggleModoEscuro(){
    if(document.getElementById("inputModoEscuro").checked == true){
        tornarModoEscuro()
    } else{
        tornarModoClaro()
    }
}
function tornarModoEscuro(){
    root.style.setProperty("--corFundo", "rgb(34 47 55)")
    root.style.setProperty("--corFundoHeader", "rgb(29, 36, 43)")
    root.style.setProperty("--corFonte", "rgb(255,255,255)")
    root.style.setProperty("--filtroSvg", "brightness(0) invert(100%) contrast(100%)")

    sessionStorage.setItem("modoEscuro", "true") 
}

function tornarModoClaro(){
    root.style.setProperty("--corFundo", "rgb(218, 230, 240)")
    root.style.setProperty("--corFundoHeader", "rgb(179, 195, 207) ")
    root.style.setProperty("--corFonte", "rgb(0,0,0)")
    root.style.setProperty("--filtroSvg", "brightness(0) saturate(100%)")

    sessionStorage.setItem("modoEscuro", "false")
}

function closeAll(id){
    document.getElementById("configuracoes").style.display = "none"
    document.getElementById("comoJogar").style.display = "none"
    document.getElementById("loja").style.display = "none"

    if(id == ''){
        return
    }
    document.getElementById(id).style.display = 'block'
}

document.getElementById("inputModoEscuro").addEventListener("change", toggleModoEscuro)

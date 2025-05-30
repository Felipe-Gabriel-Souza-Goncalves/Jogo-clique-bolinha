const express = require('express');
const http = require('http');
const fs = require('fs');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PLACAR_PATH = './placar.json';

let verificadores = {}

app.use(express.static('public')); // ajuste conforme sua pasta de frontend

// Garante que o arquivo exista
if (!fs.existsSync(PLACAR_PATH)) {
    fs.writeFileSync(PLACAR_PATH, JSON.stringify([]));
}

io.on('connection', (socket) => {
    console.log('Um jogador se conectou');
    
    verificadores[socket.id] = 0

    socket.on('restart verificador', () =>{verificadores[socket.id] = 0;console.log("Verificador reiniciado")})

    socket.on('atualizar verificador', () =>{verificadores[socket.id]++})

    socket.on('disconnect', () =>{delete verificadores[socket.id]})

    socket.on('chat message', (dados) => {

        if(verificadores[socket.id] - dados.pontuacao !== 2){
            console.log("Jogador "+ dados.jogador + " teve uma pontuação incoerente com sua partida!" + verificadores[socket.id] + dados.pontuacao)
            return
        }

        // Lê placar atual
        fs.readFile(PLACAR_PATH, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler placar:', err);
                return;
            }

            let placar = [];
            try {
                placar = JSON.parse(data);
            } catch (e) {
                console.error('Erro ao parsear placar.json:', e);
            }

            // Novos dados enviados pelo usuário
            placar.push({
                jogador: dados.jogador,
                pontuacao: dados.pontuacao,
                dificuldade: dados.dificuldade,
                foto: dados.indexPerfil,
                isDesktop: dados.isDesktop
            });


            let facil = []
            let medio = []
            let dificil = []
            let extremo = []

            for(let i = 0; i< placar.length; i++){
                switch (placar[i].dificuldade) {
                    case "Fácil":
                        facil.push(placar[i])
                        break;
                    case "Médio":
                        medio.push(placar[i])
                        break;
                    case "Difícil":
                        dificil.push(placar[i])
                        break;
                    case "Extremo":
                        extremo.push(placar[i])
                        break;
                }
            }

            // Filtrar 10 melhores do Fácil
            
            facil.sort((a, b) => b.pontuacao - a.pontuacao);
            facil = facil.slice(0, 20)

            // Filtrar 10 melhores do Médio
            medio.sort((a, b) => b.pontuacao - a.pontuacao);
            medio = medio.slice(0, 20)

            // Filtrar 10 melhores do Difícil
            dificil.sort((a, b) => b.pontuacao - a.pontuacao);
            dificil = dificil.slice(0, 20)

            // Filtrar 10 melhores do Extremo
            extremo.sort((a, b) => b.pontuacao - a.pontuacao);
            extremo = extremo.slice(0, 20)

            // Junta tudo no placar de maneira organizada
            placar = []
            placar = [...facil, ...medio, ...dificil, ...extremo]
            placar.sort((a, b) => b.pontuacao - a.pontuacao);
            
            // Salva novamente no arquivo
            fs.writeFile(PLACAR_PATH, JSON.stringify(placar, null, 2), (err) => {
                if (err) {
                    console.error('Erro ao salvar placar:', err);
                } else {
                    console.log('Placar atualizado com sucesso.');
                }
            });

            // Opcional: enviar o placar atualizado para o cliente
            io.emit('atualizar placar', placar);
        });
    });
});


app.get('/placar', (req, res) => {
    fs.readFile(PLACAR_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler placar.json:', err);
            return res.status(500).json({ erro: 'Erro ao carregar o placar' });
        }

        try {
            const placar = JSON.parse(data);
            res.json(placar);
        } catch (e) {
            res.status(500).json({ erro: 'Erro ao interpretar placar' });
        }
    });
});



const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

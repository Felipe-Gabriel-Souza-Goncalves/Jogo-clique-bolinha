const express = require('express');
const http = require('http');
const fs = require('fs');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PLACAR_PATH = './placar.json';

app.use(express.static('public')); // ajuste conforme sua pasta de frontend

// Garante que o arquivo exista
if (!fs.existsSync(PLACAR_PATH)) {
    fs.writeFileSync(PLACAR_PATH, JSON.stringify([]));
}

io.on('connection', (socket) => {
    console.log('Um jogador se conectou');

    socket.on('chat message', (dados) => {

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

            placar.push({
                jogador: dados.jogador,
                pontuacao: dados.pontuacao,
                dificuldade: dados.dificuldade,
                foto: dados.indexPerfil
            });

            // Ordena e limita os 10 melhores
            placar.sort((a, b) => b.pontuacao - a.pontuacao);
            placar = placar.slice(0, 10);

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

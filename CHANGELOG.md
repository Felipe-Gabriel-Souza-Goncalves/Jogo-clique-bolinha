# ATUALIZAÇÕES DO PROJETO - Versão atual: [1.8]
&nbsp;
## [1.1] Atualização 19/11/2024
    
- Novo sistema de dificuldade:
  - Fácil: 2 seg;
  - Médio (padrão): 1,5 seg;
  - Difícil: 1 seg;
  - Extremo: 0,75 seg;
  
- Nova loja **(EM PROGRESSO)**
  - Bolas:
    - Vermelha, Verde, Amarela, Azul
  - Fundo:
    - **(EM PROGRESSO)**

## [1.2] Atualização 29/11/2024

- Mais opções de personalização para a bola
  - +2 cores
  - +8 imagens

## [1.2.1] Atualização 04/12/2024

- Corrigido bug em que a imagem da bola não carregava
- Corrigido problema que a pontuação começava no 1000
    
## [1.3] Atualização 09/12/2024

- 6 Opções de personalização para o fundo
- uso de localStorage para armazenar a informação do saldo
- Ajuste para fechar a loja quando iniciar o jogo

## [1.4] Atualização 06/04/2025
- Modo escuro
- Seção de "como jogar"
- Novos tempos para versão mobile para equilibrar dificuldade
  - Fácil: 1,65s
  - Médio: 1,2s
  - Difícil: 0,85s
  - Extremo: 0,575s
- Diferenças leves de design
- Melhora na responsividade
- Loja agora consome as informações de um json ao invés de ser estático no HTML
- Limite de 30% de movimentação em relação a posição anterior da bola (código fornecido por IA)

## [1.4.1] Correção 12/04/2025
- Salva modo escuro em sessionStorage
- Correção do saldo não funcionar ao reiniciar a página
- Correção de não aparecer o texto de "Selecionar" para os fundos
- Ajuste para evitar da bola sair do campo do jogo
- Ajustes leves na responsividade

## [1.5] Atualização 20/05/2025
- Servidor por express
- Nova função de placar público
  - Placar é salvo no servidor
  - Necessário de um nome de usuário
- Pequenas correções de design

## [1.6] Atualização 25/05/2025 (edição HK)
- Melhorias no placar
- Design adaptado para edição do jogo Hollow Knight
- Correção de bugs no placar
- Implementação de fotos pré definidas para os usuários
- Opção de desativar a transição da bola
- Por padrão o jogo está em modo escuro

## [1.6.1] Correção 26/05/2025
- Correção de responsividade
- Salvar configuração de transição em sessionStorage

## [1.6.2] Correção de segurança 27/05/2025
- Medidas de prevenção de burlar a pontuação

## [1.7] Atualização 27/05/2025
### ATUALIZAÇÃO
- Placar para até 40 colocações
- Novas seções de placar referente a dificuldade
### CORREÇÕES
- Nome inválido
- Imagens desproporcionais no campo do jogo
- Pontuação não enviando
- Botão de fechar do placar transbordando
- Botão de jogar agora fica desativado durante a partida

## [1.8] Atualização 29/05/2025
- Placar agora é separado por Desktop/Mobile e suas respectivas dificuldades
- Largura da tela determina o tipo de dispositivo
- + 18 escolhas de fotos de perfil para o placar
- Footer e créditos aos desenvolvedores 

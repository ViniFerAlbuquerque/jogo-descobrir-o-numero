<h1>🎲 Jogo Descubra o Número!</h1>

Um divertido e simples jogo de adivinhação de números onde o objetivo é acertar um número secreto entre 1 e 100 com um número limitado de tentativas e um limite de jogos por sessão.

<h2>Sobre o Projeto</h2>

Este projeto é um jogo interativo desenvolvido com HTML, CSS e JavaScript puro. Ele desafia o jogador a adivinhar um número secreto gerado aleatoriamente, oferecendo dicas de "maior" ou "menor" a cada tentativa. O jogo registra o histórico de apostas, a quantidade de erros, as chances restantes e mantém um placar de vitórias e derrotas.

Uma funcionalidade adicional foi implementada para limitar o número de jogos (vitórias ou derrotas) por sessão e permitir que o jogador reinicie o placar total a qualquer momento, mantendo os dados persistidos no navegador.

<h2>Funcionalidades</h2>

*   **Geração Aleatória:** Um número secreto entre 1 e 100 é gerado a cada nova partida.

*   **Feedback Inteligente:** O jogador recebe dicas se o número secreto é maior ou menor que sua aposta.

*   **Contagem de Chances:** Limite de 6 chances para acertar o número secreto.

*   **Histórico de Apostas:** Exibe as últimas apostas feitas para ajudar o jogador a traçar estratégias.

*   **Placar de Vitórias e Derrotas:** Acompanha o desempenho do jogador ao longo das partidas.

*   **Limite de Jogos por Sessão:** O jogo permite um número configurável de partidas (vitórias ou derrotas) antes de exigir um reset do placar total. (Atualmente configurado para 5 jogos).

*   **Reiniciar Placar Total:** Opção para zerar o placar de vitórias/derrotas e o contador de jogos, permitindo iniciar um novo ciclo de partidas.

*   **Persistência de Dados:** O placar de vitórias, derrotas e o contador de jogos são salvos no navegador utilizando `localStorage`, mantendo o progresso entre as sessões.

*   **Interface Intuitiva:** Design responsivo e fácil de usar, adaptando-se a diferentes tamanhos de tela.

*   **Reiniciar Jogo:** Botão para iniciar uma nova partida a qualquer momento (ou reiniciar o placar total, dependendo do limite de jogos).

<h2>🕹️ Como Jogar</h2>

1.  O jogo irá gerar um número secreto aleatório entre 1 e 100.

2.  Digite seu palpite no campo de entrada "Seu N°".

3.  Clique no botão "Apostar".

4.  O jogo lhe dará uma dica se o número secreto é maior ou menor que sua aposta.

5.  Você tem 6 chances para acertar o número. Se suas chances acabarem, você perde a rodada.

6.  As estatísticas de "Erros", "Chances", "Vitórias", "Derrotas" e "Últimas Apostas" serão atualizadas em tempo real.

7.  **Limite de Jogos:** Após um certo número de jogos (vitórias ou derrotas), o botão "Novo Jogo" se transformará em "Reiniciar Placar Total". Você precisará clicar nele para zerar o placar e poder jogar novamente.

8.  Para começar uma nova partida (dentro do limite), clique no botão "Novo Jogo".


<h2>💻 Tecnologias Utilizadas</h2>

*   **HTML5:** Estrutura semântica e acessível do jogo.

*   **CSS3:** Estilização moderna, layout flexível e responsividade para garantir uma boa experiência em qualquer dispositivo.

*   **JavaScript:** Lógica principal do jogo, manipulação do DOM, interatividade, gerenciamento de estado e persistência de dados via `localStorage`.

<img src="https://github.com/ViniFerAlbuquerque/jogo-descobrir-o-numero/blob/main/img/descubra-o-numero-responsivo.png?raw=true">

[🔗Clique Aqui Para Acessar]( https://viniferalbuquerque.github.io/jogo-descobrir-o-numero/)


const form = document.querySelector("#gameForm");
const inputNumero = document.querySelector("#inNumero");
const btnApostar = document.querySelector("#btSubmit");
const btnNovo = document.querySelector("#btNovo");

const outErros = document.querySelector("#outErros");
const outChances = document.querySelector("#outChances");
const outDica = document.querySelector("#outDica");
const outVitorias = document.querySelector("#outVitorias");
const outDerrotas = document.querySelector("#outDerrotas");
const outHistoricoApostas = document.querySelector("#outHistoricoApostas");

let numeroSorteado = Math.floor(Math.random() * 100) + 1;
let numerosApostados = [];
const CHANCES_MAXIMAS = 6;

let historicoApostas = [];
const MAX_HISTORICO = 5;

let vitorias = Number(localStorage.getItem("vitorias")) || 0;
let derrotas = Number(localStorage.getItem("derrotas")) || 0;


let jogosJogados = Number(localStorage.getItem("jogosJogados")) || 0; 
const MAX_JOGOS = 5; // Limite de jogos (vitórias ou derrotas)

const atualizarPlacar = () => {
    outVitorias.textContent = vitorias;
    outDerrotas.textContent = derrotas;

    outVitorias.style.color = "green";
    outVitorias.style.fontWeight = "bold";

    outDerrotas.style.color = "red";
    outDerrotas.style.fontWeight = "bold";
};

const atualizarStatusJogo = () => {
    const numErros = numerosApostados.length;
    const chancesRestantes = CHANCES_MAXIMAS - numErros;

    outErros.textContent = `${numErros} (${numerosApostados.join(", ")})`;
    outChances.textContent = chancesRestantes;

    outErros.style.color = "darkred";
    outErros.style.fontWeight = "bold";

    if (chancesRestantes > CHANCES_MAXIMAS / 2) {
        outChances.style.color = "green";
    } else if (chancesRestantes > 1) {
        outChances.style.color = "orange";
    } else {
        outChances.style.color = "red";
    }
    outChances.style.fontWeight = "bold";

    const jogoTerminado = (chancesRestantes === 0 || numeroSorteado === Number(inputNumero.value));
    const limiteAtingido = (jogosJogados >= MAX_JOGOS);

    btnApostar.disabled = (jogoTerminado || limiteAtingido);

    btnNovo.classList.toggle("oculta", !jogoTerminado && !limiteAtingido);
    btnNovo.classList.toggle("exibe", jogoTerminado || limiteAtingido); // Exibe se o jogo terminou ou o limite foi atingido

    if (limiteAtingido && jogoTerminado) { // Se o limite foi atingido E o jogo atual terminou
        btnNovo.textContent = "Reiniciar Placar Total";
        exibirDica(`Limite de ${MAX_JOGOS} jogos atingido! Reinicie o placar para jogar novamente.`, "purple");
    } else {
        btnNovo.textContent = "Novo Jogo";
    }


    inputNumero.focus();
};

const exibirDica = (mensagem, cor = "darkblue") => {
    outDica.textContent = mensagem;
    outDica.style.color = cor;
    outDica.style.fontWeight = "bold";
};

const atualizarHistoricoApostas = () => {
    const ultimasApostas = historicoApostas.slice(-MAX_HISTORICO);
    outHistoricoApostas.textContent = ultimasApostas.length === 0 ? "Nenhum" : ultimasApostas.join(", ");
    outHistoricoApostas.style.color = "gray";
};

// --- NOVA FUNÇÃO PARA RESETAR TODO O PROGRESSO (PLACAR E CONTADOR DE JOGOS) ---
const resetarProgressoTotal = () => {
    if (confirm("Deseja realmente zerar o placar de vitórias/derrotas e o contador de jogos?")) {
        vitorias = 0;
        derrotas = 0;
        jogosJogados = 0; // Zera o contador de jogos
        localStorage.removeItem("vitorias");
        localStorage.removeItem("derrotas");
        localStorage.removeItem("jogosJogados"); // Remove do localStorage
        atualizarPlacar(); // Atualiza o placar para 0
        resetarJogo(); // Reseta o jogo atual para começar um novo ciclo
    }
};

const processarAposta = (numeroApostado) => {
    // Se o limite de jogos já foi atingido, não permite mais apostas
    if (jogosJogados >= MAX_JOGOS) {
        exibirDica(`Limite de ${MAX_JOGOS} jogos atingido. Por favor, reinicie o placar total.`, "purple");
        return;
    }

    if (numerosApostados.includes(numeroApostado)) {
        exibirDica(`Você já apostou o número ${numeroApostado}. Tente outro!`, "orange");
        return;
    }

    numerosApostados.push(numeroApostado);
    historicoApostas.push(numeroApostado);

    if (numeroApostado === numeroSorteado) {
        vitorias++;
        localStorage.setItem("vitorias", vitorias);
        jogosJogados++; // Incrementa jogos jogados ao vencer
        localStorage.setItem("jogosJogados", jogosJogados); // Salva no localStorage
        exibirDica(`Parabéns! Você acertou! O número sorteado era ${numeroSorteado}.`, "green");
    } else {
        const numErros = numerosApostados.length;
        const chancesRestantes = CHANCES_MAXIMAS - numErros;

        if (chancesRestantes === 0) {
            derrotas++;
            localStorage.setItem("derrotas", derrotas);
            jogosJogados++; // Incrementa jogos jogados ao perder
            localStorage.setItem("jogosJogados", jogosJogados); // Salva no localStorage
            exibirDica(`Suas chances acabaram! O número sorteado era ${numeroSorteado}.`, "red");
        } else {
            const dica = numeroApostado < numeroSorteado ? "Maior" : "Menor";
            exibirDica(`Dica: O número é ${dica} que ${numeroApostado}.`, "darkblue");
        }
    }
    atualizarStatusJogo();
    atualizarPlacar();
    atualizarHistoricoApostas();
    inputNumero.value = "";
};

const resetarJogo = () => {
    // Se o limite de jogos foi atingido, o botão "Novo Jogo" agora chama o reset total
    if (jogosJogados >= MAX_JOGOS) {
        resetarProgressoTotal(); 
        return;
    }

    // Lógica de reset de jogo normal (para quando o limite ainda não foi atingido)
    numeroSorteado = Math.floor(Math.random() * 100) + 1;
    numerosApostados = [];
    historicoApostas = [];
    exibirDica("Dica: É um número entre 1 e 100", "darkblue");
    inputNumero.value = "";
    btnApostar.disabled = false;
    btnNovo.classList.replace("exibe", "oculta"); // Garante que o botão de novo jogo está oculto
    atualizarStatusJogo(); // Isso vai reativar o btnApostar e ocultar o btnNovo
    atualizarHistoricoApostas();
    inputNumero.focus();
};

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o recarregamento da página

    // Se o limite de jogos já foi atingido, não permite mais apostas via submit
    if (jogosJogados >= MAX_JOGOS) {
        exibirDica(`Limite de ${MAX_JOGOS} jogos atingido. Por favor, reinicie o placar total.`, "purple");
        inputNumero.value = "";
        inputNumero.focus();
        return;
    }

    const numeroApostado = Number(inputNumero.value);

    if (isNaN(numeroApostado) || numeroApostado < 1 || numeroApostado > 100) {
        exibirDica("Por favor, digite um número válido entre 1 e 100.", "red");
        inputNumero.value = "";
        inputNumero.focus();
        return;
    }

    processarAposta(numeroApostado);
});

btnNovo.addEventListener("click", resetarJogo); // O mesmo listener, mas a função resetarJogo agora tem lógica condicional

document.addEventListener("DOMContentLoaded", () => {
    atualizarPlacar();
    atualizarHistoricoApostas();
    // A ordem é importante: primeiro atualizar o status, que pode mudar a dica e botão
    atualizarStatusJogo();
    // Depois exibir a dica inicial, que pode ser sobrescrita se o limite de jogos já foi atingido
    if (jogosJogados < MAX_JOGOS) {
        exibirDica("Dica: É um número entre 1 e 100", "darkblue");
    }
});

/* =========================================
   PATINHAS - JOGO COMPLETO
   ========================================= */

const CHAVE_CONTAS = "patinhasContas";

const pets = {
    bob: { nome: "Bob", emoji: "🐶", ataque: 7, defesa: 7, velocidade: 6 },
    mimi: { nome: "Mimi", emoji: "🐱", ataque: 6, defesa: 5, velocidade: 9 },
    floquinho: { nome: "Floquinho", emoji: "🐰", ataque: 5, defesa: 9, velocidade: 6 },
    thor: { nome: "Thor", emoji: "🐯", ataque: 9, defesa: 6, velocidade: 5 },
    luna: { nome: "Luna", emoji: "🦊", ataque: 7, defesa: 5, velocidade: 9 },
    paco: { nome: "Paco", emoji: "🦜", ataque: 6, defesa: 6, velocidade: 8 },
    nina: { nome: "Nina", emoji: "🐢", ataque: 4, defesa: 10, velocidade: 3 },
    pingo: { nome: "Pingo", emoji: "🐧", ataque: 5, defesa: 8, velocidade: 6 },
    mel: { nome: "Mel", emoji: "🐼", ataque: 8, defesa: 8, velocidade: 4 },
    dory: { nome: "Dory", emoji: "🐬", ataque: 6, defesa: 7, velocidade: 10 }
};

// Dados do abrigo: cada criatura é um objeto e a coleção é um array.
const criaturasIniciais = [
    { id: "drako", nome: "Drako", especie: "Dragão", energia: 82, personalidade: "Corajosa", raridade: "Épico", status: "Disponível", imagem: "", emoji: "🐲", descricao: "Aventureiro e apaixonado por voar.", favorito: false, adocao: null },
    { id: "bubbles", nome: "Bubbles", especie: "Polvo", energia: 64, personalidade: "Calma", raridade: "Raro", status: "Disponível", imagem: "", emoji: "🐙", descricao: "Gentil, adora água e fazer bolhas.", favorito: false, adocao: null },
    { id: "luna", nome: "Luna", especie: "Gato", energia: 91, personalidade: "Brincalhona", raridade: "Raro", status: "Disponível", imagem: "", emoji: "🐱", descricao: "Curiosa e muito ágil nas explorações.", favorito: false, adocao: null },
    { id: "pingo", nome: "Pingo", especie: "Pinguim", energia: 76, personalidade: "Curioso", raridade: "Comum", status: "Disponível", imagem: "", emoji: "🐧", descricao: "Um pinguim brincalhão que adora água geladinha.", favorito: false, adocao: null },
    { id: "mel", nome: "Mel", especie: "Panda", energia: 88, personalidade: "Calma", raridade: "Raro", status: "Disponível", imagem: "", emoji: "🐼", descricao: "Uma panda doce que ama descansar e dividir seu bambu.", favorito: false, adocao: null },
    { id: "dory", nome: "Dory", especie: "Golfinho", energia: 93, personalidade: "Brincalhona", raridade: "Épico", status: "Disponível", imagem: "", emoji: "🐬", descricao: "Uma golfinha animada que gosta de saltar pelas ondas.", favorito: false, adocao: null },
    { id: "pipoca", nome: "Pipoca", especie: "Hamster", energia: 86, personalidade: "Brincalhona", raridade: "Comum", status: "Disponível", imagem: "", emoji: "🐹", descricao: "Um hamster animado que adora correr e guardar sementinhas.", favorito: false, adocao: null },
    { id: "tobias", nome: "Tobias", especie: "Cachorro", energia: 77, personalidade: "Brincalhão", raridade: "Comum", status: "Disponível", imagem: "", emoji: "🐕", descricao: "Um cãozinho amigável que adora passeios e companhia.", favorito: false, adocao: null },
    { id: "nuvem", nome: "Nuvem", especie: "Coelha", energia: 84, personalidade: "Calma", raridade: "Comum", status: "Disponível", imagem: "", emoji: "🐇", descricao: "Uma coelhinha tranquila que ama jardins floridos.", favorito: false, adocao: null },
    { id: "sol", nome: "Sol", especie: "Periquito", energia: 96, personalidade: "Curioso", raridade: "Épico", status: "Disponível", imagem: "", emoji: "🦜", descricao: "Um passarinho esperto que aprende melodias novas.", favorito: false, adocao: null }
];

const catalogo = {
    racao: { nome: "Ração especial", emoji: "🍖", preco: 10 },
    osso: { nome: "Osso delicioso", emoji: "🦴", preco: 15 },
    bola: { nome: "Bola colorida", emoji: "🎾", preco: 20 },
    caminha: { nome: "Caminha fofa", emoji: "🛏️", preco: 30 },
    banho: { nome: "Kit de banho", emoji: "🧴", preco: 15 },
    pocao: { nome: "Poção de XP", emoji: "✨", preco: 25 }
};

let contas = carregarContas();
let emailAtual = null;
let contaAtual = null;
let temporizadorNotificacao = null;
let inimigo = {};
let batalhaAtiva = false;
let defendendo = false;
let aguardandoContraAtaque = false;
let locaisVisitados = [];
let localAtualExploracao = null;
let mapaConcluido = false;
let posicaoPetMapa = { x: 8, y: 72 };
let movimentoMapaEmCurso = false;

function novoJogo() {
    return {
        pet: null,
        fasesBatalha: { concluidas: [], cuidadosContabilizados: 0 },
        nivel: 1,
        xp: 0,
        moedas: 100,
        pontos: 0,
        vitorias: 0,
        derrotas: 0,
        vida: 100,
        fome: 100,
        felicidade: 100,
        energia: 100,
        inventario: {},
        missoesConcluidas: [],
        acoes: {
            alimentar: 0,
            brincar: 0,
            carinho: 0,
            banho: 0,
            descansar: 0,
            treinar: 0,
            explorar: 0,
            vencer: 0
        },
        ataqueExtra: 0,
        defesaExtra: 0,
        velocidadeExtra: 0,
        recordeCeu: 0,
        identidadeAbrigo: { nome: "Patinhas", tema: "claro" },
        criaturas: criaturasIniciais.map(criatura => ({ ...criatura }))
    };
}

function carregarContas() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_CONTAS)) || {};
    } catch {
        return {};
    }
}

function salvarContas() {
    try {
        localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
    } catch {
        notificar("Não foi possível salvar os dados neste navegador.");
    }
}

function salvarJogo() {
    if (!emailAtual || !contas[emailAtual] || !contaAtual) return;
    contas[emailAtual].jogo = contaAtual;
    salvarContas();
}

function limitar(valor, minimo = 0, maximo = 100) {
    return Math.max(minimo, Math.min(maximo, valor));
}

function obterPet() {
    return contaAtual && contaAtual.pet ? pets[contaAtual.pet] : null;
}

function nomePet() {
    return obterPet()?.nome || "Seu pet";
}

function emojiPet() {
    return obterPet()?.emoji || "🐾";
}

function atualizarTexto(id, texto) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    renderizarTextoMoedas(elemento, texto);
}

function renderizarTextoMoedas(elemento, texto) {
    if (!String(texto).includes("🪙")) { elemento.textContent = texto; return; }
    elemento.replaceChildren();
    String(texto).split("🪙").forEach((parte, indice) => {
        if (indice) {
            const moeda = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            moeda.setAttribute("class", "coin-icon");
            moeda.setAttribute("aria-hidden", "true");
            moeda.setAttribute("focusable", "false");
            moeda.setAttribute("viewBox", "0 0 48 48");
            const desenho = document.createElementNS("http://www.w3.org/2000/svg", "use");
            desenho.setAttribute("href", "#iconeMoeda");
            moeda.append(desenho);
            elemento.append(moeda);
        }
        if (parte) elemento.append(document.createTextNode(parte));
    });
}

function atualizarBarra(id, valor, maximo = 100) {
    const barra = document.getElementById(id);
    if (!barra) return;
    barra.style.width = limitar((valor / maximo) * 100) + "%";
}

/* =========================================
   TELAS E NAVEGAÇÃO
   ========================================= */

function mostrarTela(idTela) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(idTela)?.classList.add("ativa");
    window.scrollTo({ top: 0, behavior: "instant" });
}

function mostrarFormulario(tipo) {
    document.getElementById("areaLogin").classList.toggle("oculto", tipo !== "login");
    document.getElementById("areaCadastro").classList.toggle("oculto", tipo !== "cadastro");

    const mensagem = document.getElementById("mensagemLogin");
    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

function mostrarMensagemLogin(texto, tipo = "erro") {
    const elemento = document.getElementById("mensagemLogin");
    elemento.textContent = texto;
    elemento.className = "mensagem " + tipo;
}

function abrirPagina(nome) {
    if (!contaAtual) return;
    if (!contaAtual.pet && !["criaturas", "meus-animais"].includes(nome)) {
        notificar("Adote seu primeiro animal para liberar as páginas do jogo.");
        return;
    }

    document.querySelectorAll(".pagina").forEach(pagina => {
        pagina.classList.remove("ativa");
    });

    document.getElementById("pagina-" + nome)?.classList.add("ativa");

    document.querySelectorAll(".item-menu").forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.pagina === nome);
    });

    if (nome === "arena" && !inimigo.vidaMaxima) iniciarBatalha();

    if (nome === "minigame") {
        prepararMiniGame();
    }

    if (nome === "criaturas") renderizarCriaturas();
    if (nome === "meus-animais") renderizarMeusAnimais();

    atualizarTela();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".item-menu").forEach(botao => {
    botao.addEventListener("click", () => abrirPagina(botao.dataset.pagina));
});

document.querySelectorAll("[data-ir]").forEach(botao => {
    botao.addEventListener("click", () => abrirPagina(botao.dataset.ir));
});

function aplicarIdentidadeAbrigo() {
    if (!contaAtual) return;
    contaAtual.identidadeAbrigo = {
        nome: String(contaAtual.identidadeAbrigo?.nome || "Patinhas").trim() || "Patinhas",
        tema: contaAtual.identidadeAbrigo?.tema === "escuro" ? "escuro" : "claro"
    };
    document.body.dataset.tema = contaAtual.identidadeAbrigo.tema;
    atualizarTexto("nomeAbrigoTopo", contaAtual.identidadeAbrigo.nome);
    atualizarTexto("nomeAbrigoRodape", contaAtual.identidadeAbrigo.nome);
    document.getElementById("campoNomeAbrigo").value = contaAtual.identidadeAbrigo.nome;
    atualizarTexto("previaNomeAbrigo", `🐾 ${contaAtual.identidadeAbrigo.nome}`);
    atualizarTexto("previaTemaAbrigo", `Tema ${contaAtual.identidadeAbrigo.tema}`);
    document.querySelectorAll("[data-tema-abrigo]").forEach(botao => {
        botao.setAttribute("aria-pressed", String(botao.dataset.temaAbrigo === contaAtual.identidadeAbrigo.tema));
    });
}

document.getElementById("campoNomeAbrigo").addEventListener("input", evento => {
    atualizarTexto("previaNomeAbrigo", `🐾 ${evento.currentTarget.value.trim() || "Seu abrigo"}`);
});

document.getElementById("formIdentidadeAbrigo").addEventListener("submit", evento => {
    evento.preventDefault();
    const nome = document.getElementById("campoNomeAbrigo").value.trim();
    if (nome.length < 2 || nome.length > 32) {
        notificar("O nome do abrigo precisa ter entre 2 e 32 caracteres.");
        return;
    }
    contaAtual.identidadeAbrigo.nome = nome;
    aplicarIdentidadeAbrigo();
    salvarJogo();
    notificar(`Identidade salva: ${nome}.`);
});

document.querySelectorAll("[data-tema-abrigo]").forEach(botao => {
    botao.addEventListener("click", () => {
        contaAtual.identidadeAbrigo.tema = botao.dataset.temaAbrigo;
        aplicarIdentidadeAbrigo();
        salvarJogo();
        notificar(`Tema ${contaAtual.identidadeAbrigo.tema} ativado e salvo.`);
    });
});

/* =========================================
   LOGIN E CADASTRO
   ========================================= */

document.getElementById("irCadastro").addEventListener("click", () => {
    mostrarFormulario("cadastro");
});

document.getElementById("irLogin").addEventListener("click", () => {
    mostrarFormulario("login");
});

document.getElementById("formCadastro").addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = document.getElementById("cadastroNome").value.trim();
    const email = document.getElementById("cadastroEmail").value.trim().toLowerCase();
    const senha = document.getElementById("cadastroSenha").value;
    const confirmar = document.getElementById("confirmarSenha").value;

    if (nome.length < 2) {
        mostrarMensagemLogin("Digite um nome com pelo menos 2 letras.");
        return;
    }

    if (senha.length < 4) {
        mostrarMensagemLogin("A senha precisa ter pelo menos 4 caracteres.");
        return;
    }

    if (senha !== confirmar) {
        mostrarMensagemLogin("As senhas não são iguais.");
        return;
    }

    if (contas[email]) {
        mostrarMensagemLogin("Este e-mail já está cadastrado. Faça login.");
        return;
    }

    contas[email] = {
        nome,
        email,
        senha,
        jogo: novoJogo()
    };

    salvarContas();
    document.getElementById("formCadastro").reset();
    // Criar a conta não inicia uma sessão; o próximo passo é autenticar no login.
    document.getElementById("loginEmail").value = email;
    document.getElementById("loginSenha").value = "";
    mostrarFormulario("login");
    mostrarMensagemLogin("Conta criada com sucesso! Agora entre com seu e-mail e senha.", "sucesso");
});

document.getElementById("formLogin").addEventListener("submit", evento => {
    evento.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const senha = document.getElementById("loginSenha").value;

    if (!contas[email] || contas[email].senha !== senha) {
        mostrarMensagemLogin("E-mail ou senha incorretos.");
        return;
    }

    emailAtual = email;
    contaAtual = contas[email].jogo || novoJogo();

    // Compatibilidade com contas criadas pela versão anterior.
    const modelo = novoJogo();

    Object.keys(modelo).forEach(chave => {
        if (contaAtual[chave] === undefined) {
            contaAtual[chave] = modelo[chave];
        }
    });

    contaAtual.acoes = { ...modelo.acoes, ...(contaAtual.acoes || {}) };
    contaAtual.fasesBatalha = { concluidas: [], ...(contaAtual.fasesBatalha || {}) };
    if (!Array.isArray(contaAtual.fasesBatalha.concluidas)) contaAtual.fasesBatalha.concluidas = [];
    contaAtual.inventario = contaAtual.inventario || {};
    contaAtual.missoesConcluidas = contaAtual.missoesConcluidas || [];
    let criaturasSalvas = Array.isArray(contaAtual.criaturas) ? contaAtual.criaturas : [];
    // Remove a gata duplicada do catálogo antigo, mas preserva adoções já feitas.
    criaturasSalvas = criaturasSalvas.filter(criatura => !(criatura.id === "amora" && criatura.status !== "Adotado"));
    const idsSalvos = new Set(criaturasSalvas.map(criatura => criatura.id));
    contaAtual.criaturas = [...criaturasSalvas, ...criaturasIniciais.filter(criatura => !idsSalvos.has(criatura.id)).map(criatura => ({ ...criatura }))];
    contaAtual.criaturas.filter(criatura => criatura.status === "Adotado").forEach(criatura => {
        criatura.petJogo ||= `resgate-${criatura.id}`;
        pets[criatura.petJogo] ||= { nome: criatura.nome, emoji: criatura.emoji || "🐾", ataque: 6, defesa: 6, velocidade: 6 };
    });

    document.getElementById("loginSenha").value = "";

    entrarNoJogo();
    if (!contaAtual.pet) abrirPagina("criaturas");
});

document.getElementById("sairJogo").addEventListener("click", sair);

function sair() {
    salvarJogo();
    encerrarMiniGame();
    document.body.dataset.tema = "claro";

    emailAtual = null;
    contaAtual = null;
    batalhaAtiva = false;
    inimigo = {};
    locaisVisitados = [];
    localAtualExploracao = null;
    mapaConcluido = false;
    movimentoMapaEmCurso = false;
    posicaoPetMapa = { x: 8, y: 72 };

    mostrarFormulario("login");
    mostrarTela("telaLogin");
}

function entrarNoJogo() {
    if (!contaAtual || !emailAtual) return;
    const temCompanheiro = Boolean(contaAtual.pet && pets[contaAtual.pet]);
    contaAtual.identidadeAbrigo = { nome: "Patinhas", tema: "claro", ...(contaAtual.identidadeAbrigo || {}) };
    aplicarIdentidadeAbrigo();

    atualizarTexto("nomeJogador", contas[emailAtual].nome.split(" ")[0]);

    document.querySelectorAll(".pagina").forEach(pagina => pagina.classList.remove("ativa"));
    document.querySelectorAll(".item-menu").forEach(botao => botao.classList.remove("ativo"));

    const paginaInicial = temCompanheiro ? "casa" : "criaturas";
    document.getElementById("pagina-" + paginaInicial).classList.add("ativa");
    document.querySelector(`[data-pagina="${paginaInicial}"]`).classList.add("ativo");

    inimigo = {};
    batalhaAtiva = false;

    atualizarTela();
    atualizarFasesBatalha();
    mostrarTela("telaJogo");
    salvarJogo();
}

/* =========================================
   ATUALIZAÇÃO DO JOGO
   ========================================= */

function atualizarTela() {
    if (!contaAtual) return;

    if (!contaAtual.pet || !pets[contaAtual.pet]) {
        atualizarTexto("nomeJogador", contas[emailAtual].nome.split(" ")[0]);
        atualizarTexto("nomePetMenu", "Adote seu primeiro animal");
        atualizarTexto("petMenu", "🐾");
        atualizarTexto("avatarMini", "🐾");
        atualizarTexto("moedasTopo", contaAtual.moedas);
        atualizarTexto("nivelTopo", contaAtual.nivel);
        atualizarTexto("nivelMenu", "Nível " + contaAtual.nivel);
        atualizarTexto("totalMoedas", contaAtual.moedas);
        renderizarCriaturas();
        renderizarMeusAnimais();
        return;
    }

    const pet = obterPet();
    const xpNecessario = contaAtual.nivel * 100;

    atualizarTexto("nomeJogador", contas[emailAtual].nome.split(" ")[0]);
    atualizarTexto("moedasTopo", contaAtual.moedas);
    atualizarTexto("nivelTopo", contaAtual.nivel);
    atualizarTexto("nivelMenu", "Nível " + contaAtual.nivel);
    atualizarTexto("avatarMini", pet.emoji);
    atualizarTexto("petMenu", pet.emoji);
    atualizarTexto("nomePetMenu", pet.nome);
    atualizarTexto("petCasa", pet.emoji);
    atualizarTexto("petCuidados", pet.emoji);
    atualizarTexto("nomePetCuidados", pet.nome);
    atualizarTexto("nomePetResumo", pet.nome);
    atualizarTexto("petEvolucao", pet.emoji);
    atualizarTexto("nomePetEvolucao", pet.nome);
    atualizarTexto("nivelEvolucao", contaAtual.nivel);
    atualizarTexto("petMiniGame", pet.emoji);

    atualizarTexto("textoVida", contaAtual.vida + "/100");
    atualizarTexto("textoFome", contaAtual.fome + "/100");
    atualizarTexto("textoFelicidade", contaAtual.felicidade + "/100");
    atualizarTexto("textoEnergia", contaAtual.energia + "/100");
    atualizarNecessidadesCuidados();
    atualizarProgressoCuidados();

    atualizarBarra("barraVida", contaAtual.vida);
    atualizarBarra("barraFome", contaAtual.fome);
    atualizarBarra("barraFelicidade", contaAtual.felicidade);
    atualizarBarra("barraEnergia", contaAtual.energia);

    atualizarTexto("totalVitorias", contaAtual.vitorias);
    atualizarTexto("totalMoedas", contaAtual.moedas);
    atualizarTexto("totalPontos", contaAtual.pontos);
    atualizarTexto("moedasLoja", contaAtual.moedas);

    atualizarTexto("xpTexto", contaAtual.xp + " / " + xpNecessario + " XP");
    atualizarTexto("xpEvolucao", contaAtual.xp + " / " + xpNecessario + " XP");
    atualizarBarra("barraXP", contaAtual.xp, xpNecessario);
    atualizarBarra("barraXPEvolucao", contaAtual.xp, xpNecessario);

    atualizarTexto("ataquePet", pet.ataque + contaAtual.ataqueExtra);
    atualizarTexto("defesaPet", pet.defesa + contaAtual.defesaExtra);
    atualizarTexto("velocidadePet", pet.velocidade + contaAtual.velocidadeExtra);
    atualizarBarra("barraAtaquePet", pet.ataque + contaAtual.ataqueExtra, 15);
    atualizarBarra("barraDefesaPet", pet.defesa + contaAtual.defesaExtra, 15);
    atualizarBarra("barraVelocidadePet", pet.velocidade + contaAtual.velocidadeExtra, 15);

    atualizarInventario();
    atualizarMissoes();
    renderizarCriaturas();
    renderizarMeusAnimais();

    if (inimigo.vidaMaxima) atualizarArena();
}

function atualizarNecessidadesCuidados() {
    const fome = contaAtual.fome;
    const diversao = contaAtual.felicidade;
    atualizarTexto("nivelFomePet", `${fome}/100`);
    atualizarTexto("nivelDiversaoPet", `${diversao}/100`);
    const barraFome = document.getElementById("barraFomePet");
    const barraDiversao = document.getElementById("barraDiversaoPet");
    if (barraFome) { barraFome.style.width = `${fome}%`; barraFome.dataset.nivel = fome <= 25 ? "baixo" : fome <= 55 ? "medio" : "alto"; }
    if (barraDiversao) { barraDiversao.style.width = `${diversao}%`; barraDiversao.dataset.nivel = diversao <= 25 ? "baixo" : diversao <= 55 ? "medio" : "alto"; }
    atualizarTexto("mensagemFomePet", fome <= 25 ? `${nomePet()} está com muita fome. Alimente seu pet!` : fome <= 55 ? `${nomePet()} está começando a sentir fome.` : `${nomePet()} está satisfeito e bem alimentado.`);
    atualizarTexto("mensagemDiversaoPet", diversao <= 25 ? `${nomePet()} precisa brincar. Está sentindo falta de diversão!` : diversao <= 55 ? `${nomePet()} está um pouco entediado. Que tal brincar?` : `${nomePet()} está feliz e se divertindo.`);
}

function atualizarProgressoCuidados() {
    if (!contaAtual) return;
    const cuidados = [
        { chave: "carinho", nome: "Carinho", emoji: "💗" },
        { chave: "banho", nome: "Banho", emoji: "🛁" },
        { chave: "descansar", nome: "Descanso", emoji: "😴" },
        { chave: "treinar", nome: "Treino", emoji: "🏋️" }
    ];
    const meta = 5;
    cuidados.forEach(({ chave, nome, emoji }) => {
        const total = contaAtual.acoes?.[chave] || 0;
        const valor = document.getElementById(`progresso${chave}`);
        const barra = document.getElementById(`barraProgresso${chave}`);
        const mensagem = document.getElementById(`mensagemProgresso${chave}`);
        if (valor) valor.textContent = `${total} ${total === 1 ? "vez" : "vezes"}`;
        if (barra) {
            barra.style.width = `${Math.min(total / meta * 100, 100)}%`;
            barra.setAttribute("aria-valuenow", String(Math.min(total, meta)));
        }
        if (mensagem) mensagem.textContent = total >= meta
            ? `Meta de ${meta} cuidados alcançada! Continue cuidando de ${nomePet()}.`
            : `${emoji} Mais ${meta - total} ${meta - total === 1 ? "ação" : "ações"} para completar a meta de ${meta}.`;
    });
}

let criaturaEmEdicao = null;

function salvarCriaturas() {
    if (!contaAtual) return;
    localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
}

function renderizarCriaturas() {
    const grade = document.getElementById("listaCriaturas");
    if (!grade || !contaAtual) return;
    const criaturas = Array.isArray(contaAtual.criaturas) ? contaAtual.criaturas : [];
    const busca = document.getElementById("buscaCriaturas").value.trim().toLocaleLowerCase("pt-BR");
    const especie = document.getElementById("filtroEspecie").value;
    const personalidade = document.getElementById("filtroPersonalidade").value;
    const raridade = document.getElementById("filtroRaridade").value;
    const soFavoritos = document.getElementById("somenteFavoritos").checked;
    atualizarTexto("contadorCriaturas", criaturas.length);
    atualizarTexto("contadorDisponiveis", criaturas.filter(item => item.status === "Disponível").length);
    atualizarTexto("contadorAdotados", criaturas.filter(item => item.status === "Adotado").length);
    [ ["filtroEspecie", "especie"], ["filtroPersonalidade", "personalidade"], ["filtroRaridade", "raridade"] ].forEach(([id, chave]) => {
        const select = document.getElementById(id);
        const valorAtual = select.value;
        const valores = [...new Set(criaturas.map(item => item[chave]).filter(Boolean))].sort((a,b) => a.localeCompare(b, "pt-BR"));
        select.replaceChildren(new Option("Todas", ""), ...valores.map(valor => new Option(valor, valor)));
        select.value = valores.includes(valorAtual) ? valorAtual : "";
    });
    // Animais adotados saem desta lista e aparecem na área Meus animais.
    const disponiveis = criaturas.filter(item => item.status === "Disponível");
    const filtradas = disponiveis.filter(item =>
        (!busca || `${item.nome} ${item.especie} ${item.personalidade}`.toLocaleLowerCase("pt-BR").includes(busca)) &&
        (!especie || item.especie === especie) && (!personalidade || item.personalidade === personalidade) &&
        (!raridade || item.raridade === raridade) && (!soFavoritos || item.favorito)
    );
    grade.replaceChildren();
    if (!filtradas.length) {
        const vazio = document.createElement("p");
        vazio.className = "sem-criaturas";
        vazio.textContent = "Nenhuma criatura corresponde à busca e aos filtros.";
        grade.append(vazio);
        return;
    }
    filtradas.forEach(criatura => {
        const card = document.createElement("article");
        card.className = "cartao-criatura " + (criatura.status === "Disponível" ? "criatura-disponivel" : "criatura-adotada");
        const topo = document.createElement("div"); topo.className = "arte-criatura";
        if (criatura.imagem) {
            const imagem = document.createElement("img"); imagem.src = criatura.imagem; imagem.alt = `Imagem de ${criatura.nome}`;
            imagem.addEventListener("error", () => { imagem.remove(); topo.insertBefore(document.createTextNode(criatura.emoji || "🐾"), topo.firstChild); }, { once: true }); topo.append(imagem);
        } else { const emoji = document.createElement("span"); emoji.className = "emoji-criatura"; emoji.textContent = criatura.emoji || "🐾"; topo.append(emoji); }
        const selo = document.createElement("span"); selo.className = "status-criatura"; selo.textContent = criatura.status; topo.append(selo);
        const fav = document.createElement("button"); fav.type = "button"; fav.className = "favorito-criatura"; fav.setAttribute("aria-label", criatura.favorito ? "Desfavoritar" : "Favoritar"); fav.setAttribute("aria-pressed", String(Boolean(criatura.favorito))); fav.textContent = criatura.favorito ? "★" : "☆";
        fav.addEventListener("click", () => { criatura.favorito = !criatura.favorito; salvarJogo(); renderizarCriaturas(); }); topo.append(fav);
        const corpo = document.createElement("div"); corpo.className = "corpo-criatura";
        const titulo = document.createElement("h3"); titulo.textContent = criatura.nome;
        const atributos = document.createElement("p"); atributos.textContent = `${criatura.especie} · ${criatura.personalidade} · ${criatura.raridade}`;
        const energia = document.createElement("p"); energia.className = "energia-criatura"; energia.textContent = `⚡ Energia ${criatura.energia}/100`;
        const descricao = document.createElement("p"); descricao.className = "descricao-criatura"; descricao.textContent = criatura.descricao || "Sem descrição.";
        corpo.append(titulo, atributos, energia, descricao);
        if (criatura.adocao) { const registro = document.createElement("p"); registro.className = "registro-adocao"; registro.textContent = `Adotado por ${criatura.adocao.tutor}: “${criatura.adocao.mensagem}”`; corpo.append(registro); }
        const acoes = document.createElement("div"); acoes.className = "acoes-criatura";
        const botao = (texto, classe, acao) => { const el = document.createElement("button"); el.type="button"; el.className=`botao ${classe}`; el.textContent=texto; el.addEventListener("click", acao); return el; };
        acoes.append(botao("Editar", "botao-claro", () => abrirFormularioCriatura(criatura)), botao("Remover", "botao-claro", () => removerCriatura(criatura.id)));
        acoes.append(botao(criatura.status === "Adotado" ? "Adoção concluída" : "Adotar", "botao-principal", () => adotarCriatura(criatura.id)));
        corpo.append(acoes); card.append(topo, corpo); grade.append(card);
    });
}

function renderizarMeusAnimais() {
    const grade = document.getElementById("listaMeusAnimais");
    if (!grade || !contaAtual) return;
    const todosAdotados = (contaAtual.criaturas || []).filter(item => item.status === "Adotado");
    const companheiro = obterPet();
    const adocaoAtiva = todosAdotados.find(item => item.petJogo === contaAtual.pet);
    const adotados = todosAdotados.filter(item => item.petJogo !== contaAtual.pet);
    atualizarTexto("totalMeusAnimais", (companheiro ? 1 : 0) + adotados.length);
    atualizarTexto("totalMeusAdotados", adotados.length);
    grade.replaceChildren();
    const criarCartao = ({ nome, emoji, especie, personalidade, adocao, petJogo, companheiroAtivo = false, imagem = "" }) => {
        const card = document.createElement("article"); card.className = "cartao-meu-animal" + (companheiroAtivo ? " companheiro-principal" : "");
        const arte = document.createElement("div"); arte.className = "arte-meu-animal";
        if (imagem) { const img = document.createElement("img"); img.src = imagem; img.alt = `Imagem de ${nome}`; arte.append(img); }
        else arte.textContent = emoji || "🐾";
        const titulo = document.createElement("h3"); titulo.textContent = nome;
        const subtitulo = document.createElement("p"); subtitulo.textContent = companheiroAtivo ? "Seu companheiro de aventura" : `${especie} · ${personalidade}`;
        const selo = document.createElement("span"); selo.className = "status-meu-animal"; selo.textContent = companheiroAtivo ? "Mora com você" : `Adotado por ${adocao?.tutor || contas[emailAtual].nome}`;
        card.append(arte, titulo, subtitulo, selo);
        if (adocao && companheiroAtivo) { const mensagemAdocao = document.createElement("p"); mensagemAdocao.className = "historia-meu-animal"; mensagemAdocao.textContent = `Adotado por ${adocao.tutor}: “${adocao.mensagem}”`; card.append(mensagemAdocao); }
        if (!companheiroAtivo) {
            const mensagem = document.createElement("p"); mensagem.className = "historia-meu-animal"; mensagem.textContent = adocao?.mensagem || "Agora faz parte da sua família."; card.append(mensagem);
            const trocar = document.createElement("button"); trocar.type = "button"; trocar.className = "botao " + (contaAtual.pet === petJogo ? "botao-claro" : "botao-principal");
            trocar.textContent = contaAtual.pet === petJogo ? "Companheiro atual ✓" : "Trocar para este 🐾";
            trocar.disabled = contaAtual.pet === petJogo;
            if (!trocar.disabled) trocar.addEventListener("click", () => trocarCompanheiro(petJogo));
            card.append(trocar);
        }
        grade.append(card);
    };
    if (companheiro) criarCartao({ nome: companheiro.nome, emoji: companheiro.emoji, companheiroAtivo: true, adocao: adocaoAtiva?.adocao });
    adotados.forEach(criatura => criarCartao(criatura));
}

function abrirFormularioCriatura(criatura = null) {
    const dialog = document.getElementById("dialogCriatura");
    const form = document.getElementById("formCriatura");
    criaturaEmEdicao = criatura?.id || null;
    form.reset();
    document.getElementById("tituloFormCriatura").textContent = criatura ? `Editar ${criatura.nome}` : "Nova criatura";
    if (criatura) Object.entries(criatura).forEach(([chave, valor]) => { if (form.elements[chave] && typeof valor === "string") form.elements[chave].value = valor; });
    if (criatura) form.elements.energia.value = criatura.energia;
    dialog.showModal();
}

function removerCriatura(id) {
    const criatura = contaAtual.criaturas.find(item => item.id === id);
    if (!criatura || !window.confirm(`Remover ${criatura.nome} do catálogo? Esta ação não pode ser desfeita.`)) return;
    contaAtual.criaturas = contaAtual.criaturas.filter(item => item.id !== id);
    salvarJogo(); renderizarCriaturas(); notificar(`${criatura.nome} foi removido do abrigo.`);
}

function adotarCriatura(id) {
    const criatura = contaAtual.criaturas.find(item => item.id === id);
    if (!criatura) return;
    if (criatura.status === "Adotado") { notificar("Esta criatura já foi adotada."); return; }
    const tutor = window.prompt(`Quem será o tutor de ${criatura.nome}?`, contas[emailAtual].nome);
    if (tutor === null) return;
    const mensagem = window.prompt("Escreva uma mensagem para o cartão de adoção:", "Uma nova amizade começou!");
    if (mensagem === null) return;
    criatura.status = "Adotado";
    criatura.petJogo = `resgate-${criatura.id}`;
    pets[criatura.petJogo] = { nome: criatura.nome, emoji: criatura.emoji || "🐾", ataque: 6, defesa: 6, velocidade: 6 };
    if (!contaAtual.pet) contaAtual.pet = criatura.petJogo;
    criatura.adocao = { tutor: tutor.trim() || contas[emailAtual].nome, mensagem: mensagem.trim() || "Uma nova amizade começou!", data: new Date().toISOString() };
    salvarJogo(); atualizarTela(); renderizarCriaturas(); renderizarMeusAnimais(); notificar(`${criatura.nome} foi adotado! Encontre-o em Meus animais. 🏡`);
}

function trocarCompanheiro(idPet) {
    if (!contaAtual || !pets[idPet] || contaAtual.pet === idPet) return;
    contaAtual.pet = idPet;
    salvarJogo();
    atualizarTela();
    renderizarMeusAnimais();
    notificar(`${pets[idPet].nome} agora é seu companheiro de aventura! Seu progresso foi mantido. 🐾`);
}

document.getElementById("novaCriatura").addEventListener("click", () => abrirFormularioCriatura());
document.getElementById("cancelarCriatura").addEventListener("click", () => document.getElementById("dialogCriatura").close());
document.getElementById("formCriatura").addEventListener("submit", evento => {
    evento.preventDefault();
    const form = evento.currentTarget;
    const dados = new FormData(form);
    const energia = Number(dados.get("energia"));
    if (!Number.isInteger(energia) || energia < 0 || energia > 100) { notificar("A energia deve ser um número inteiro entre 0 e 100."); return; }
    const campos = Object.fromEntries(["nome", "especie", "personalidade", "raridade", "imagem", "descricao"].map(chave => [chave, String(dados.get(chave) || "").trim()]));
    if (!campos.nome || !campos.especie) { notificar("Nome e espécie são obrigatórios."); return; }
    if (criaturaEmEdicao) {
        const existente = contaAtual.criaturas.find(item => item.id === criaturaEmEdicao);
        Object.assign(existente, campos, { energia });
    } else {
        contaAtual.criaturas.unshift({ id: `criatura-${Date.now()}-${Math.random().toString(36).slice(2,7)}`, ...campos, energia, status: "Disponível", emoji: "🐾", favorito: false, adocao: null });
    }
    salvarJogo(); document.getElementById("dialogCriatura").close(); renderizarCriaturas();
    notificar(criaturaEmEdicao ? "Criatura atualizada!" : "Criatura cadastrada!"); criaturaEmEdicao = null;
});
["buscaCriaturas", "filtroEspecie", "filtroPersonalidade", "filtroRaridade", "somenteFavoritos"].forEach(id => {
    document.getElementById(id).addEventListener(id === "buscaCriaturas" ? "input" : "change", renderizarCriaturas);
});

function ganharExperiencia(valor) {
    if (!contaAtual) return;

    contaAtual.xp += valor;
    contaAtual.pontos += valor;

    let subiuNivel = false;

    while (contaAtual.xp >= contaAtual.nivel * 100) {
        contaAtual.xp -= contaAtual.nivel * 100;
        contaAtual.nivel++;
        contaAtual.moedas += 20;
        contaAtual.vida = 100;
        contaAtual.energia = 100;
        subiuNivel = true;
    }

    salvarJogo();
    atualizarTela();
    if (typeof atualizarFasesBatalha === "function") atualizarFasesBatalha();

    if (subiuNivel) {
        notificar("✨ Parabéns! " + nomePet() + " chegou ao nível " + contaAtual.nivel + " e ganhou 🪙 20 moedas!");
    }
}

/* =========================================
   CUIDADOS
   ========================================= */

document.getElementById("alimentar").addEventListener("click", () => {
    if (contaAtual.moedas < 10) {
        notificar("Você precisa de 🪙 10 moedas para comprar comida.");
        return;
    }

    if (contaAtual.fome >= 100) {
        notificar(nomePet() + " já está de barriguinha cheia! 🍎");
        return;
    }

    contaAtual.moedas -= 10;
    contaAtual.fome = limitar(contaAtual.fome + 35);
    contaAtual.vida = limitar(contaAtual.vida + 5);
    contaAtual.acoes.alimentar++;

    ganharExperiencia(8);
    atualizarTela();
    salvarJogo();
    notificar(nomePet() + " comeu e ficou mais satisfeito! 🍎");
});

document.getElementById("brincar").addEventListener("click", () => {
    if (contaAtual.energia < 10) {
        notificar("Seu pet está cansado. Deixe-o descansar primeiro.");
        return;
    }

    contaAtual.energia = limitar(contaAtual.energia - 10);
    contaAtual.fome = limitar(contaAtual.fome - 8);
    contaAtual.felicidade = limitar(contaAtual.felicidade + 20);
    contaAtual.acoes.brincar++;

    ganharExperiencia(12);
    atualizarTela();
    salvarJogo();
    notificar(nomePet() + " adorou brincar! 🎾");
});

document.getElementById("carinho").addEventListener("click", () => {
    contaAtual.felicidade = limitar(contaAtual.felicidade + 15);
    contaAtual.vida = limitar(contaAtual.vida + 3);
    contaAtual.acoes.carinho++;

    ganharExperiencia(5);
    atualizarTela();
    salvarJogo();
    notificar("Que carinho gostoso! " + nomePet() + " está feliz. 💗");
});

document.getElementById("banho").addEventListener("click", () => {
    if (contaAtual.energia < 5) {
        notificar("Seu pet está muito cansado para tomar banho.");
        return;
    }

    contaAtual.energia = limitar(contaAtual.energia - 5);
    contaAtual.felicidade = limitar(contaAtual.felicidade + 10);
    contaAtual.acoes.banho++;

    ganharExperiencia(8);
    atualizarTela();
    salvarJogo();
    notificar(nomePet() + " ficou limpinho e cheiroso! 🛁");
});

document.getElementById("dormir").addEventListener("click", () => {
    contaAtual.energia = 100;
    contaAtual.vida = limitar(contaAtual.vida + 10);
    contaAtual.fome = limitar(contaAtual.fome - 5);
    contaAtual.acoes.descansar++;

    ganharExperiencia(5);
    atualizarTela();
    salvarJogo();
    notificar(nomePet() + " descansou e recuperou toda a energia. 😴");
});

document.getElementById("treinar").addEventListener("click", () => {
    if (contaAtual.moedas < 5) {
        notificar("Você precisa de 🪙 5 moedas para treinar.");
        return;
    }

    if (contaAtual.energia < 15) {
        notificar("Seu pet precisa de pelo menos 15 de energia para treinar.");
        return;
    }

    contaAtual.moedas -= 5;
    contaAtual.energia = limitar(contaAtual.energia - 15);
    contaAtual.fome = limitar(contaAtual.fome - 5);
    contaAtual.ataqueExtra++;
    contaAtual.acoes.treinar++;

    ganharExperiencia(15);
    atualizarTela();
    salvarJogo();
    notificar("Treinamento concluído! O ataque aumentou em 1. ⚔️");
});

/* =========================================
   LOJA E INVENTÁRIO
   ========================================= */

document.querySelectorAll(".comprar").forEach(botao => {
    botao.addEventListener("click", () => comprarItem(botao.dataset.item));
});

function comprarItem(id) {
    const item = catalogo[id];
    if (!item || !contaAtual) return;

    if (contaAtual.moedas < item.preco) {
        notificar("Moedas insuficientes! Jogue o mini game para ganhar mais. 🪙");
        return;
    }

    contaAtual.moedas -= item.preco;
    contaAtual.inventario[id] = (contaAtual.inventario[id] || 0) + 1;

    salvarJogo();
    atualizarTela();
    notificar(item.emoji + " " + item.nome + " adicionado à mochila!");
}

function atualizarInventario() {
    const lista = document.getElementById("listaInventario");
    if (!lista || !contaAtual) return;

    lista.innerHTML = "";

    const itens = Object.entries(contaAtual.inventario)
        .filter(([id, quantidade]) => catalogo[id] && quantidade > 0);

    if (itens.length === 0) {
        lista.innerHTML = `
            <div class="inventario-vazio">
                <span>🎒</span>
                <h3>Sua mochila está vazia</h3>
                <p>Visite a lojinha para comprar itens para seu pet.</p>
                <button class="botao botao-principal" data-ir="loja" type="button">Ir para a loja</button>
            </div>
        `;

        lista.querySelector("[data-ir]").addEventListener("click", () => abrirPagina("loja"));
        return;
    }

    itens.forEach(([id, quantidade]) => {
        const item = catalogo[id];
        const cartao = document.createElement("article");
        cartao.className = "item-inventario";

        const emoji = document.createElement("span");
        emoji.className = "produto-emoji";
        emoji.textContent = item.emoji;

        const titulo = document.createElement("h3");
        titulo.textContent = item.nome;

        const descricao = document.createElement("p");
        descricao.textContent = "Quantidade: " + quantidade;

        const usar = document.createElement("button");
        usar.className = "botao botao-principal";
        usar.type = "button";
        usar.textContent = "Usar item";
        usar.addEventListener("click", () => usarItem(id));

        cartao.append(emoji, titulo, descricao, usar);
        lista.appendChild(cartao);
    });
}

function usarItem(id) {
    if (!contaAtual || !contaAtual.inventario[id]) return;

    if (id === "racao") {
        if (contaAtual.fome >= 100) return notificar(nomePet() + " não está com fome agora.");
        contaAtual.fome = limitar(contaAtual.fome + 30);
        contaAtual.vida = limitar(contaAtual.vida + 5);
    } else if (id === "osso") {
        if (contaAtual.vida >= 100) return notificar(nomePet() + " já está com a vida cheia.");
        contaAtual.vida = limitar(contaAtual.vida + 20);
    } else if (id === "bola") {
        if (contaAtual.energia < 10) return notificar("Seu pet precisa descansar.");
        contaAtual.felicidade = limitar(contaAtual.felicidade + 20);
        contaAtual.energia = limitar(contaAtual.energia - 5);
        contaAtual.fome = limitar(contaAtual.fome - 5);
        contaAtual.acoes.brincar++;
    } else if (id === "caminha") {
        contaAtual.energia = 100;
        contaAtual.vida = limitar(contaAtual.vida + 10);
    } else if (id === "banho") {
        contaAtual.felicidade = limitar(contaAtual.felicidade + 12);
        contaAtual.energia = limitar(contaAtual.energia + 5);
        contaAtual.acoes.banho++;
    } else if (id === "pocao") {
        contaAtual.inventario[id]--;
        ganharExperiencia(25);
        salvarJogo();
        atualizarTela();
        notificar("Poção usada! Você ganhou 25 XP. ✨");
        return;
    }

    contaAtual.inventario[id]--;
    ganharExperiencia(4);
    salvarJogo();
    atualizarTela();
    notificar(catalogo[id].emoji + " Você usou " + catalogo[id].nome + "!");
}

/* =========================================
   MAPA
   ========================================= */

document.querySelectorAll(".local-mapa").forEach(botao => {
    botao.addEventListener("click", () => iniciarExploracao(botao.dataset.local));
});

const locaisExploracao = {
    "Praça das Flores": { moedas: 5, cenario: "praca", decoracoes: [["🌳", 18, 28], ["🌼", 35, 65], ["🌷", 55, 25], ["🌳", 68, 48], ["🌻", 43, 34], ["🌷", 77, 28]] },
    "Floresta Encantada": { moedas: 15, cenario: "floresta", decoracoes: [["🌲", 18, 27], ["🍄", 37, 64], ["🌿", 55, 26], ["🌲", 68, 52], ["🦋", 43, 35], ["🌳", 78, 30]] },
    "Praia Rosada": { moedas: 20, cenario: "praia", decoracoes: [["🐚", 18, 30], ["🌴", 37, 65], ["☀️", 55, 26], ["🐚", 68, 51], ["🪸", 43, 35], ["🏝️", 78, 30]] },
    "Montanha Mágica": { moedas: 25, cenario: "montanha", decoracoes: [["⛰️", 18, 27], ["🌲", 37, 64], ["☁️", 55, 26], ["🪨", 68, 52], ["🌲", 43, 35], ["🏔️", 78, 30]] },
    "Castelo dos Pets": { moedas: 30, cenario: "castelo", decoracoes: [["🏰", 18, 27], ["🌹", 37, 64], ["🚩", 55, 26], ["🛡️", 68, 52], ["🌳", 43, 35], ["🏰", 78, 30]] }
};

function iniciarExploracao(local) {
    if (!contaAtual || !obterPet()) return;
    if (locaisVisitados.includes(local)) {
        notificar("Você já explorou " + local + " nesta sessão. Escolha outro lugar!");
        return;
    }

    if (contaAtual.energia < 10) {
        notificar("Seu pet precisa de pelo menos 10 de energia para explorar.");
        return;
    }

    const dadosLocal = locaisExploracao[local];
    if (!dadosLocal) return;
    localAtualExploracao = local;
    mapaConcluido = false;
    posicaoPetMapa = { x: 8, y: 72 };
    const cena = document.getElementById("cenaExploracao");
    const palco = document.getElementById("palcoExploracao");
    const pet = document.getElementById("petExplorando");
    palco.dataset.cenario = dadosLocal.cenario;
    pet.textContent = emojiPet();
    pet.setAttribute("aria-label", `${nomePet()} caminhando`);
    atualizarTexto("tituloLocalExploracao", local);
    atualizarTexto("mensagemExploracao", `Leve ${nomePet()} até a bandeira para completar o passeio e ganhar ${dadosLocal.moedas} moedas.`);
    pet.style.left = `${posicaoPetMapa.x}%`;
    pet.style.top = `${posicaoPetMapa.y}%`;
    const decoracoes = document.getElementById("decoracoesExploracao");
    decoracoes.replaceChildren();
    dadosLocal.decoracoes.forEach(([emoji, x, y]) => {
        const item = document.createElement("span");
        item.className = "decoracao-mapa-item";
        item.textContent = emoji;
        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
        decoracoes.append(item);
    });
    document.querySelector(".mapa-banner").classList.add("oculto");
    document.querySelector(".mapa-grid").classList.add("oculto");
    cena.classList.remove("oculto");
    atualizarEstadoControlesMapa();
    document.getElementById("voltarMapa").focus();
}

function atualizarEstadoControlesMapa() {
    document.querySelectorAll("[data-passo-mapa]").forEach(botao => { botao.disabled = mapaConcluido; });
}

function voltarListaMapa() {
    localAtualExploracao = null;
    document.getElementById("cenaExploracao").classList.add("oculto");
    document.querySelector(".mapa-banner").classList.remove("oculto");
    document.querySelector(".mapa-grid").classList.remove("oculto");
}

document.getElementById("voltarMapa").addEventListener("click", voltarListaMapa);

const passosMapa = {
    cima: { x: 0, y: -9 },
    baixo: { x: 0, y: 9 },
    esquerda: { x: -8, y: 0 },
    direita: { x: 8, y: 0 }
};

document.querySelectorAll("[data-passo-mapa]").forEach(botao => {
    botao.addEventListener("click", () => caminharNoMapa(botao.dataset.passoMapa));
});

document.addEventListener("keydown", evento => {
    const paginaMapa = document.getElementById("pagina-mapa");
    if (!localAtualExploracao || mapaConcluido || paginaMapa?.classList.contains("ativa") !== true) return;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(evento.target.tagName) || evento.target.isContentEditable) return;
    const teclaDirecao = { ArrowUp: "cima", w: "cima", ArrowDown: "baixo", s: "baixo", ArrowLeft: "esquerda", a: "esquerda", ArrowRight: "direita", d: "direita" };
    const direcao = teclaDirecao[evento.key] || teclaDirecao[evento.key.toLowerCase()];
    if (!direcao) return;
    evento.preventDefault();
    caminharNoMapa(direcao);
});

function caminharNoMapa(direcao) {
    if (!localAtualExploracao || mapaConcluido || movimentoMapaEmCurso || !passosMapa[direcao]) return;
    const passo = passosMapa[direcao];
    movimentoMapaEmCurso = true;
    posicaoPetMapa.x = limitar(posicaoPetMapa.x + passo.x, 5, 89);
    posicaoPetMapa.y = limitar(posicaoPetMapa.y + passo.y, 12, 82);
    const pet = document.getElementById("petExplorando");
    pet.style.left = `${posicaoPetMapa.x}%`;
    pet.style.top = `${posicaoPetMapa.y}%`;
    pet.dataset.direcao = direcao;
    window.setTimeout(() => { movimentoMapaEmCurso = false; }, 220);
    if (posicaoPetMapa.x >= 81 && posicaoPetMapa.y <= 31) concluirExploracao();
}

function concluirExploracao() {
    const local = localAtualExploracao;
    const recompensa = locaisExploracao[local].moedas;
    mapaConcluido = true;
    locaisVisitados.push(local);
    contaAtual.moedas += recompensa;
    contaAtual.energia = limitar(contaAtual.energia - 10);
    contaAtual.fome = limitar(contaAtual.fome - 5);
    contaAtual.acoes.explorar++;

    ganharExperiencia(15);
    atualizarTela();
    salvarJogo();
    atualizarEstadoControlesMapa();
    document.getElementById("palcoExploracao").classList.add("passeio-concluido");
    atualizarTexto("mensagemExploracao", `🎉 ${nomePet()} chegou ao destino! Passeio concluído: +${recompensa} moedas e +15 XP.`);
    notificar("Você explorou " + local + " e encontrou 🪙 " + recompensa + " moedas!");
}

/* =========================================
   MISSÕES
   ========================================= */

const missoes = [
    { id: "alimentar", emoji: "🍎", nome: "Barriguinha feliz", descricao: "Alimente seu pet uma vez.", moedas: 10, xp: 10, verificar: () => contaAtual.acoes.alimentar >= 1 },
    { id: "brincar", emoji: "🎾", nome: "Hora da diversão", descricao: "Brinque com seu pet uma vez.", moedas: 15, xp: 10, verificar: () => contaAtual.acoes.brincar >= 1 },
    { id: "carinho", emoji: "💗", nome: "Amor de sobra", descricao: "Dê carinho ao seu pet uma vez.", moedas: 10, xp: 10, verificar: () => contaAtual.acoes.carinho >= 1 },
    { id: "banho", emoji: "🛁", nome: "Limpinho e cheiroso", descricao: "Dê um banho no seu pet.", moedas: 15, xp: 10, verificar: () => contaAtual.acoes.banho >= 1 },
    { id: "explorar", emoji: "🗺️", nome: "Pequeno explorador", descricao: "Visite um lugar no mapa.", moedas: 20, xp: 15, verificar: () => contaAtual.acoes.explorar >= 1 },
    { id: "treinar", emoji: "🏋️", nome: "Treino de campeão", descricao: "Treine seu pet uma vez.", moedas: 15, xp: 15, verificar: () => contaAtual.acoes.treinar >= 1 },
    { id: "vencer", emoji: "🏆", nome: "Primeira vitória", descricao: "Vença uma batalha na arena.", moedas: 30, xp: 20, verificar: () => contaAtual.vitorias >= 1 }
];

function atualizarMissoes() {
    const lista = document.getElementById("listaMissoes");
    if (!lista || !contaAtual) return;

    lista.innerHTML = "";

    missoes.forEach(missao => {
        const concluida = contaAtual.missoesConcluidas.includes(missao.id);
        const pronta = missao.verificar();

        const item = document.createElement("article");
        item.className = "missao-item" + (concluida ? " concluida" : "");

        const icone = document.createElement("div");
        icone.className = "missao-status";
        icone.textContent = concluida ? "✅" : missao.emoji;

        const detalhes = document.createElement("div");
        detalhes.className = "missao-detalhes";

        const titulo = document.createElement("h3");
        titulo.textContent = missao.nome;

        const descricao = document.createElement("p");
        descricao.textContent = missao.descricao;

        const recompensa = document.createElement("div");
        recompensa.className = "missao-recompensa";
        renderizarTextoMoedas(recompensa, "🎁 🪙 " + missao.moedas + " moedas e " + missao.xp + " XP");

        detalhes.append(titulo, descricao, recompensa);

        const botao = document.createElement("button");
        botao.className = "botao " + (pronta && !concluida ? "botao-principal" : "botao-claro");
        botao.type = "button";
        botao.textContent = concluida ? "Concluída" : pronta ? "Resgatar" : "Em andamento";
        botao.disabled = concluida || !pronta;

        if (pronta && !concluida) {
            botao.addEventListener("click", () => resgatarMissao(missao.id));
        }

        item.append(icone, detalhes, botao);
        lista.appendChild(item);
    });
}

function resgatarMissao(id) {
    const missao = missoes.find(item => item.id === id);
    if (!missao || !contaAtual) return;
    if (contaAtual.missoesConcluidas.includes(id) || !missao.verificar()) return;

    contaAtual.missoesConcluidas.push(id);
    contaAtual.moedas += missao.moedas;

    ganharExperiencia(missao.xp);
    salvarJogo();
    atualizarTela();
    notificar("Missão concluída! +🪙 " + missao.moedas + " moedas e +" + missao.xp + " XP. 🎉");
}

/* =========================================
   ARENA
   ========================================= */

function iniciarBatalha() {
    if (!contaAtual?.pet || !pets[contaAtual.pet]) {
        notificar("Adote um animal no catálogo antes de entrar na Arena.");
        return;
    }

    const adversarios = [
        { nome: "Dragão Sombrio", emoji: "🐲" },
        { nome: "Lobo Misterioso", emoji: "🐺" },
        { nome: "Golem de Cristal", emoji: "🪨" },
        { nome: "Raposa Mágica", emoji: "🦊" }
    ];

    const escolha = adversarios[Math.floor(Math.random() * adversarios.length)];
    const vidaMaxima = 60 + (contaAtual.nivel - 1) * 10;

    inimigo = {
        nome: escolha.nome,
        emoji: escolha.emoji,
        vida: vidaMaxima,
        vidaMaxima,
        ataque: 8 + contaAtual.nivel * 2
    };

    batalhaAtiva = true;
    defendendo = false;
    aguardandoContraAtaque = false;

    const emojiInimigo = document.querySelector(".inimigo .combatente-emoji");
    if (emojiInimigo) emojiInimigo.textContent = inimigo.emoji;

    atualizarTexto("registroBatalha", "Um novo adversário apareceu! Escolha sua estratégia. ⚔️");
    atualizarArena();
}

function atualizarArena() {
    if (!contaAtual || !contaAtual.pet || !inimigo.vidaMaxima) return;

    atualizarTexto("petArena", emojiPet());
    atualizarTexto("nomePetArena", nomePet());
    atualizarTexto("nivelArena", "Nível " + contaAtual.nivel);
    atualizarTexto("nomeInimigo", inimigo.nome);
    atualizarTexto("vidaJogadorTexto", "Vida: " + contaAtual.vida + "/100");
    atualizarTexto("vidaInimigoTexto", "Vida: " + inimigo.vida + "/" + inimigo.vidaMaxima);

    atualizarBarra("vidaJogadorArena", contaAtual.vida);
    atualizarBarra("vidaInimigoArena", inimigo.vida, inimigo.vidaMaxima);

    document.getElementById("atacar").disabled = !batalhaAtiva || aguardandoContraAtaque;
    document.getElementById("defender").disabled = !batalhaAtiva || aguardandoContraAtaque;
    document.getElementById("habilidade").disabled = !batalhaAtiva || aguardandoContraAtaque;
}

function podeLutar() {
    if (aguardandoContraAtaque) return false;
    if (!batalhaAtiva || !contaAtual) {
        notificar("Comece uma nova batalha para jogar.");
        return false;
    }

    if (contaAtual.vida <= 0) {
        notificar("Seu pet precisa se recuperar antes de lutar.");
        return false;
    }

    return true;
}

document.getElementById("novaBatalha").addEventListener("click", () => {
    iniciarBatalha();
    atualizarTela();
});

function animarTrocaDeGolpes(atacante, alvo) {
    const elementoAtacante = document.querySelector(atacante);
    const elementoAlvo = document.querySelector(alvo);
    if (!elementoAtacante || !elementoAlvo) return;
    elementoAtacante.classList.remove("golpe-avanca", "golpe-inimigo", "recebe-golpe");
    elementoAlvo.classList.remove("golpe-avanca", "golpe-inimigo", "recebe-golpe");
    void elementoAtacante.offsetWidth;
    elementoAtacante.classList.add(atacante.includes("inimigo") ? "golpe-inimigo" : "golpe-avanca");
    elementoAlvo.classList.add("recebe-golpe");
    window.setTimeout(() => {
        elementoAtacante.classList.remove("golpe-avanca", "golpe-inimigo");
        elementoAlvo.classList.remove("recebe-golpe");
    }, 560);
}

document.getElementById("atacar").addEventListener("click", () => {
    if (!podeLutar()) return;

    const pet = obterPet();
    const dano = Math.max(5, pet.ataque + contaAtual.ataqueExtra + Math.floor(Math.random() * 8) + contaAtual.nivel);
    inimigo.vida = limitar(inimigo.vida - dano, 0, inimigo.vidaMaxima);
    animarTrocaDeGolpes("#petArena", "#emojiInimigoArena");

    atualizarTexto("registroBatalha", nomePet() + " atacou e causou " + dano + " de dano!");
    resolverTurno();
});

document.getElementById("defender").addEventListener("click", () => {
    if (!podeLutar()) return;

    defendendo = true;
    atualizarTexto("registroBatalha", nomePet() + " se preparou para defender o próximo ataque. 🛡️");
    turnoInimigo();
});

document.getElementById("habilidade").addEventListener("click", () => {
    if (!podeLutar()) return;

    if (contaAtual.energia < 20) {
        notificar("Você precisa de 20 de energia para usar a habilidade especial.");
        return;
    }

    contaAtual.energia = limitar(contaAtual.energia - 20);

    const pet = obterPet();
    const dano = Math.max(10, (pet.ataque + contaAtual.ataqueExtra) * 2 + Math.floor(Math.random() * 10));
    inimigo.vida = limitar(inimigo.vida - dano, 0, inimigo.vidaMaxima);
    animarTrocaDeGolpes("#petArena", "#emojiInimigoArena");

    atualizarTexto("registroBatalha", nomePet() + " usou sua habilidade especial e causou " + dano + " de dano! ✨");
    resolverTurno();
});

function resolverTurno() {
    if (inimigo.vida <= 0) {
        vencerBatalha();
        return;
    }
    aguardandoContraAtaque = true;
    atualizarArena();
    window.setTimeout(() => {
        if (batalhaAtiva) turnoInimigo();
    }, 430);
}

function turnoInimigo() {
    if (!batalhaAtiva) return;

    let dano = Math.max(
        3,
        inimigo.ataque - Math.floor((obterPet().defesa + contaAtual.defesaExtra) / 3) + Math.floor(Math.random() * 5)
    );

    if (defendendo) {
        dano = Math.max(1, Math.floor(dano / 2));
        defendendo = false;
    }

    contaAtual.vida = limitar(contaAtual.vida - dano);
    animarTrocaDeGolpes(".inimigo .combatente-emoji", "#petArena");

    const registro = document.getElementById("registroBatalha");
    registro.textContent += " " + inimigo.nome + " contra-atacou e causou " + dano + " de dano.";

    if (contaAtual.vida <= 0) {
        perderBatalha();
        return;
    }

    aguardandoContraAtaque = false;
    atualizarArena();
    atualizarTela();
    salvarJogo();
}

function vencerBatalha() {
    batalhaAtiva = false;
    aguardandoContraAtaque = false;
    contaAtual.vitorias++;
    contaAtual.acoes.vencer++;
    contaAtual.moedas += 30;
    contaAtual.energia = limitar(contaAtual.energia - 10);
    contaAtual.fome = limitar(contaAtual.fome - 10);

    ganharExperiencia(25);
    atualizarTexto("registroBatalha", "🏆 Vitória! " + nomePet() + " venceu " + inimigo.nome + " e ganhou 🪙 30 moedas e 25 XP!");

    atualizarArena();
    atualizarTela();
    salvarJogo();
    notificar("Você venceu a batalha! +🪙 30 moedas");
}

function perderBatalha() {
    batalhaAtiva = false;
    aguardandoContraAtaque = false;
    contaAtual.derrotas++;
    contaAtual.vida = 0;

    atualizarTexto("registroBatalha", "💗 " + nomePet() + " ficou sem vida. Descanse para se recuperar e tente novamente.");
    atualizarArena();
    atualizarTela();
    salvarJogo();
    notificar("Fim da batalha. Cuide do seu pet para recuperar a vida.");
}

/* =========================================
   MINI GAME: CÉU DAS MOEDINHAS
   ========================================= */

const canvas = document.getElementById("canvasMiniGame");
const ctx = canvas.getContext("2d");

const LARGURA = canvas.width;
const ALTURA = canvas.height;

let miniGameAtivo = false;
let miniGameIniciado = false;
let frameMiniGame = 0;
let moedasPartida = 0;
let alturaPartida = 0;
let melhorAltura = 0;
let cameraAltura = 0;
let jogador = null;
let plataformas = [];
let moedasJogo = [];
let particulas = [];
let teclas = { esquerda: false, direita: false };
let ultimoTempo = 0;
let animacaoMiniGame = null;
let moedasEntregues = false;

function prepararMiniGame() {
    if (!canvas) return;

    atualizarTexto("recordePartida", (contaAtual?.recordeCeu || 0) + " m");

    if (!miniGameAtivo && !miniGameIniciado) {
        desenharCenarioParado();
    }
}

function iniciarMiniGame() {
    if (!contaAtual || !contaAtual.pet) {
        notificar("Escolha um pet antes de jogar.");
        return;
    }

    cancelarAnimacaoMiniGame();

    miniGameAtivo = true;
    miniGameIniciado = true;
    moedasEntregues = false;
    frameMiniGame = 0;
    moedasPartida = 0;
    alturaPartida = 0;
    cameraAltura = 0;
    melhorAltura = 0;
    ultimoTempo = 0;
    teclas = { esquerda: false, direita: false };
    particulas = [];

    jogador = {
        x: LARGURA / 2 - 18,
        y: ALTURA - 115,
        largura: 36,
        altura: 39,
        vx: 0,
        vy: -8.8,
        velocidade: 4.4,
        ultimoY: ALTURA - 115
    };

    plataformas = [{
        x: LARGURA / 2 - 65,
        y: ALTURA - 65,
        largura: 130,
        altura: 13,
        tipo: "inicial"
    }];

    moedasJogo = [];

    let y = ALTURA - 150;
    while (y > -ALTURA) {
        criarPlataforma(y);
        y -= 65 + Math.random() * 27;
    }

    document.getElementById("inicioMiniGame").classList.add("oculto");
    document.getElementById("fimMiniGame").classList.add("oculto");

    atualizarTexto("moedasPartida", "0");
    atualizarTexto("alturaPartida", "0 m");
    atualizarTexto("recordePartida", (contaAtual.recordeCeu || 0) + " m");

    ultimoTempo = performance.now();
    animacaoMiniGame = requestAnimationFrame(loopMiniGame);
}

function criarPlataforma(y) {
    const largura = 62 + Math.random() * 32;
    const margem = 8;
    const x = margem + Math.random() * (LARGURA - largura - margem * 2);

    const plataforma = {
        x,
        y,
        largura,
        altura: 12,
        tipo: Math.random() < 0.14 ? "rosa" : "normal"
    };

    plataformas.push(plataforma);

    if (Math.random() < 0.78) {
        moedasJogo.push({
            x: x + largura / 2,
            y: y - 24,
            raio: 9,
            coletada: false,
            brilho: Math.random() * Math.PI * 2
        });
    }
}

function loopMiniGame(tempo) {
    if (!miniGameAtivo) return;

    const dt = Math.min((tempo - (ultimoTempo || tempo)) / 16.67, 2);
    ultimoTempo = tempo;

    atualizarMiniGame(dt);
    desenharMiniGame();

    if (miniGameAtivo) {
        animacaoMiniGame = requestAnimationFrame(loopMiniGame);
    }
}

function atualizarMiniGame(dt) {
    frameMiniGame++;

    jogador.ultimoY = jogador.y;

    const aceleracao = 0.46 * dt;
    const gravidade = 0.32 * dt;

    if (teclas.esquerda) jogador.vx = -jogador.velocidade;
    else if (teclas.direita) jogador.vx = jogador.velocidade;
    else jogador.vx *= Math.pow(0.80, dt);

    jogador.x += jogador.vx * dt;
    jogador.vy += gravidade;
    jogador.y += jogador.vy * dt;

    // O pet reaparece do outro lado ao sair pelas laterais.
    if (jogador.x + jogador.largura < 0) jogador.x = LARGURA;
    if (jogador.x > LARGURA) jogador.x = -jogador.largura;

    // O pet pula automaticamente quando aterrissa em uma plataforma.
    if (jogador.vy > 0) {
        plataformas.forEach(plataforma => {
            const antesDoTopo = jogador.ultimoY + jogador.altura <= plataforma.y + 5;
            const tocouTopo = jogador.y + jogador.altura >= plataforma.y;
            const sobrePlataforma =
                jogador.x + jogador.largura - 5 > plataforma.x &&
                jogador.x + 5 < plataforma.x + plataforma.largura;

            if (antesDoTopo && tocouTopo && sobrePlataforma) {
                jogador.y = plataforma.y - jogador.altura;
                jogador.vy = -9.2 - Math.min(alturaPartida / 2000, 1.5);
                criarParticulas(jogador.x + jogador.largura / 2, plataforma.y, "#ffffff", 5);
            }
        });
    }

    // Coleta das moedas.
    moedasJogo.forEach(moeda => {
        if (moeda.coletada) return;

        const centroX = jogador.x + jogador.largura / 2;
        const centroY = jogador.y + jogador.altura / 2;
        const dx = centroX - moeda.x;
        const dy = centroY - moeda.y;

        if (Math.sqrt(dx * dx + dy * dy) < 26) {
            moeda.coletada = true;
            moedasPartida++;
            criarParticulas(moeda.x, moeda.y, "#f6bd45", 10);
            atualizarTexto("moedasPartida", moedasPartida);
        }

        moeda.brilho += 0.08 * dt;
    });

    // A câmera acompanha o pet para cima.
    if (jogador.y < ALTURA * 0.34) {
        const deslocamento = ALTURA * 0.34 - jogador.y;
        jogador.y += deslocamento;
        jogador.ultimoY += deslocamento;

        plataformas.forEach(plataforma => plataforma.y += deslocamento);
        moedasJogo.forEach(moeda => moeda.y += deslocamento);
        particulas.forEach(particula => particula.y += deslocamento);

        cameraAltura += deslocamento;
        alturaPartida = Math.floor(cameraAltura / 10);
        melhorAltura = Math.max(melhorAltura, alturaPartida);

        atualizarTexto("alturaPartida", alturaPartida + " m");
    }

    // Cria plataformas novas acima da tela.
    let topo = Math.min(...plataformas.map(plataforma => plataforma.y));

    while (topo > -80) {
        topo -= 65 + Math.random() * 28;
        criarPlataforma(topo);
    }

    // Remove objetos que já ficaram muito abaixo da tela.
    plataformas = plataformas.filter(plataforma => plataforma.y < ALTURA + 40);
    moedasJogo = moedasJogo.filter(moeda => moeda.y < ALTURA + 40 && !moeda.coletada);

    // Atualiza partículas.
    particulas.forEach(particula => {
        particula.x += particula.vx * dt;
        particula.y += particula.vy * dt;
        particula.vy += 0.12 * dt;
        particula.vida -= dt;
    });
    particulas = particulas.filter(particula => particula.vida > 0);

    // O jogo termina se o pet cair abaixo da tela.
    if (jogador.y > ALTURA + 35) {
        terminarMiniGame();
    }
}

function criarParticulas(x, y, cor, quantidade) {
    for (let i = 0; i < quantidade; i++) {
        particulas.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.8) * 4,
            vida: 20 + Math.random() * 18,
            cor
        });
    }
}

function desenharCenarioParado() {
    if (!ctx) return;

    const gradiente = ctx.createLinearGradient(0, 0, 0, ALTURA);
    gradiente.addColorStop(0, "#9cddff");
    gradiente.addColorStop(1, "#fff0fa");
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    desenharNuvem(65, 95, 1);
    desenharNuvem(320, 160, 0.85);
    desenharNuvem(160, 270, 0.75);
    desenharNuvem(345, 385, 0.9);

    desenharPlataforma({ x: 145, y: 500, largura: 130, altura: 13, tipo: "inicial" });
    desenharPlataforma({ x: 45, y: 400, largura: 85, altura: 12, tipo: "normal" });
    desenharPlataforma({ x: 260, y: 315, largura: 85, altura: 12, tipo: "rosa" });
    desenharPlataforma({ x: 120, y: 230, largura: 90, altura: 12, tipo: "normal" });
    desenharMoeda(90, 365, 0);
    desenharMoeda(300, 280, 1);
    desenharMoeda(160, 195, 2);

    ctx.font = "42px Arial";
    ctx.textAlign = "center";
    ctx.fillText(emojiPet(), LARGURA / 2, 470);
}

function desenharMiniGame() {
    const gradiente = ctx.createLinearGradient(0, 0, 0, ALTURA);
    gradiente.addColorStop(0, "#9cddff");
    gradiente.addColorStop(0.55, "#d6f1ff");
    gradiente.addColorStop(1, "#fff0fa");

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, LARGURA, ALTURA);

    desenharSol();
    desenharNuvem(60, 100 + Math.sin(frameMiniGame / 30) * 4, 0.75);
    desenharNuvem(340, 185 + Math.sin(frameMiniGame / 38) * 5, 0.85);
    desenharNuvem(95, 330 + Math.sin(frameMiniGame / 34) * 4, 0.65);
    desenharNuvem(345, 440 + Math.sin(frameMiniGame / 45) * 5, 0.7);

    // Pontinhos decorativos no céu.
    for (let i = 0; i < 18; i++) {
        const x = (i * 79 + 25) % LARGURA;
        const y = (i * 113 + frameMiniGame * 0.4) % ALTURA;
        ctx.fillStyle = "rgba(255,255,255,.65)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
    }

    plataformas.forEach(desenharPlataforma);

    moedasJogo.forEach(moeda => {
        if (!moeda.coletada) desenharMoeda(moeda.x, moeda.y, moeda.brilho);
    });

    particulas.forEach(particula => {
        ctx.globalAlpha = Math.max(0, particula.vida / 25);
        ctx.fillStyle = particula.cor;
        ctx.beginPath();
        ctx.arc(particula.x, particula.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    desenharJogador();
}

function desenharSol() {
    ctx.fillStyle = "rgba(255, 229, 145, .8)";
    ctx.beginPath();
    ctx.arc(350, 65, 27, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffe9a1";
    ctx.beginPath();
    ctx.arc(350, 65, 20, 0, Math.PI * 2);
    ctx.fill();
}

function desenharNuvem(x, y, escala = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);
    ctx.fillStyle = "rgba(255,255,255,.82)";
    ctx.beginPath();
    ctx.arc(-18, 2, 17, 0, Math.PI * 2);
    ctx.arc(0, -8, 23, 0, Math.PI * 2);
    ctx.arc(22, 1, 17, 0, Math.PI * 2);
    ctx.arc(4, 8, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function desenharPlataforma(plataforma) {
    const { x, y, largura, altura, tipo } = plataforma;

    ctx.fillStyle = tipo === "rosa" ? "#e9a2d1" : "#80d3ad";
    ctx.beginPath();
    ctx.roundRect(x, y, largura, altura, 6);
    ctx.fill();

    ctx.fillStyle = tipo === "rosa" ? "#ffd7f0" : "#c4f1d9";
    ctx.beginPath();
    ctx.roundRect(x, y, largura, 5, 4);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 9, y + altura - 2);
    ctx.lineTo(x + largura - 9, y + altura - 2);
    ctx.stroke();
}

function desenharMoeda(x, y, brilho = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.85 + Math.abs(Math.sin(brilho)) * 0.15, 1);

    ctx.fillStyle = "#e4a12c";
    ctx.beginPath();
    ctx.arc(0, 1, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffd65f";
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#fff1a9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#fff9d7";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", 0, 0.5);

    ctx.restore();
}

function desenharJogador() {
    if (!jogador) return;

    ctx.save();

    const centroX = jogador.x + jogador.largura / 2;
    const centroY = jogador.y + jogador.altura / 2;

    // Sombra do pet.
    ctx.fillStyle = "rgba(82, 119, 149, .18)";
    ctx.beginPath();
    ctx.ellipse(centroX, jogador.y + jogador.altura + 4, 17, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Contorno branco para destacar o personagem.
    ctx.font = "37px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,255,255,.9)";
    ctx.strokeText(emojiPet(), centroX, centroY);
    ctx.fillText(emojiPet(), centroX, centroY);

    ctx.restore();
}

function terminarMiniGame() {
    if (!miniGameAtivo || moedasEntregues) return;

    miniGameAtivo = false;
    miniGameIniciado = false;
    moedasEntregues = true;

    cancelarAnimacaoMiniGame();

    const recordeAnterior = contaAtual.recordeCeu || 0;
    contaAtual.recordeCeu = Math.max(recordeAnterior, alturaPartida);

    // Cada moeda recolhida no cenário vale uma moeda do jogo principal.
    // Há uma pequena recompensa extra por alcançar grandes alturas.
    const bonusAltura = Math.floor(alturaPartida / 100);
    const recompensa = moedasPartida + bonusAltura;

    contaAtual.moedas += recompensa;

    ganharExperiencia(Math.floor(alturaPartida / 5) + moedasPartida);
    salvarJogo();
    atualizarTela();

    atualizarTexto("recordePartida", contaAtual.recordeCeu + " m");
    atualizarTexto(
        "resumoMiniGame",
        "Você coletou 🪙 " + moedasPartida + " moedas e ganhou 🪙 " +
        bonusAltura + " moedas extras pela altura! Total: 🪙 " + recompensa + " moedas."
    );

    document.getElementById("fimMiniGame").classList.remove("oculto");
    document.getElementById("inicioMiniGame").classList.add("oculto");

    notificar("🏆 Mini game finalizado! Você ganhou 🪙 " + recompensa + " moedas!");

    if (recompensa > 0) mostrarRecompensa(recompensa);
}

function mostrarRecompensa(valor) {
    const elemento = document.getElementById("recompensaMoedas");
    renderizarTextoMoedas(elemento, "🪙 +" + valor + " moedas adicionadas ao seu saldo!");
    elemento.classList.remove("oculto");

    setTimeout(() => elemento.classList.add("oculto"), 3500);
}

function cancelarAnimacaoMiniGame() {
    if (animacaoMiniGame !== null) {
        cancelAnimationFrame(animacaoMiniGame);
        animacaoMiniGame = null;
    }
}

function encerrarMiniGame() {
    miniGameAtivo = false;
    miniGameIniciado = false;
    cancelarAnimacaoMiniGame();
}

document.getElementById("iniciarMiniGame").addEventListener("click", iniciarMiniGame);
document.getElementById("jogarNovamente").addEventListener("click", iniciarMiniGame);

/* =========================================
   CONTROLES DO MINI GAME
   ========================================= */

function definirTecla(codigo, pressionada) {
    if (!miniGameAtivo) return;

    if (codigo === "ArrowLeft" || codigo === "KeyA") {
        teclas.esquerda = pressionada;
    }

    if (codigo === "ArrowRight" || codigo === "KeyD") {
        teclas.direita = pressionada;
    }
}

window.addEventListener("keydown", evento => {
    if (["ArrowLeft", "ArrowRight", "Space"].includes(evento.code)) {
        evento.preventDefault();
    }

    definirTecla(evento.code, true);
});

window.addEventListener("keyup", evento => {
    definirTecla(evento.code, false);
});

window.addEventListener("blur", () => {
    teclas.esquerda = false;
    teclas.direita = false;
});

function configurarBotaoMovimento(id, direcao) {
    const botao = document.getElementById(id);

    const pressionar = evento => {
        evento.preventDefault();
        if (!miniGameAtivo) return;
        teclas[direcao] = true;
    };

    const soltar = evento => {
        evento.preventDefault();
        teclas[direcao] = false;
    };

    botao.addEventListener("pointerdown", pressionar);
    botao.addEventListener("pointerup", soltar);
    botao.addEventListener("pointercancel", soltar);
    botao.addEventListener("pointerleave", soltar);
    botao.addEventListener("contextmenu", evento => evento.preventDefault());
}

configurarBotaoMovimento("moverEsquerda", "esquerda");
configurarBotaoMovimento("moverDireita", "direita");

/* =========================================
   NOTIFICAÇÕES E INICIALIZAÇÃO
   ========================================= */

function notificar(texto) {
    const elemento = document.getElementById("notificacao");
    if (!elemento) return;

    renderizarTextoMoedas(elemento, texto);
    elemento.classList.add("visivel");

    if (temporizadorNotificacao) clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(() => {
        elemento.classList.remove("visivel");
    }, 3500);
}


/* =========================================
   FASES DE BATALHA EM PLATAFORMA
   ========================================= */
let faseAtual = 0;
let quadroFase = null;
let estadoFase = null;
let teclasFase = {};
let ultimoTempoFase = 0;

function obterFasesDesbloqueadas() {
    const nivel = contaAtual?.nivel || 1;
    const concluidas = contaAtual?.fasesBatalha?.concluidas || [];
    return {
        1: true,
        2: nivel >= 3,
        3: nivel >= 5 && concluidas.includes(2)
    };
}
function atualizarFasesBatalha() {
    if (!contaAtual) return;
    contaAtual.fasesBatalha ||= { concluidas: [] };
    const desbloqueadas = obterFasesDesbloqueadas();
    for (let n = 1; n <= 3; n++) {
        const card = document.getElementById(`cartaoFase${n}`);
        const status = document.getElementById(`statusFase${n}`);
        const botao = document.querySelector(`[data-iniciar-fase="${n}"]`);
        if (!card || !status || !botao) continue;
        const concluida = contaAtual.fasesBatalha.concluidas.includes(n);
        const bloqueioAte = contaAtual.fasesBatalha[`bloqueioFase${n}Ate`] || 0;
        const restanteBloqueio = Math.max(0, Math.ceil((bloqueioAte - Date.now()) / 1000));
        const emEspera = restanteBloqueio > 0;
        card.classList.toggle("bloqueada", !desbloqueadas[n] || emEspera);
        status.textContent = emEspera
            ? `💤 Aguarde ${Math.floor(restanteBloqueio / 60)}:${String(restanteBloqueio % 60).padStart(2, "0")}`
            : concluida ? "✅ Concluída" : desbloqueadas[n] ? "Disponível" : n === 2 ? "🔒 Cuide do pet até o nível 3" : "🔒 Nível 5 + fase 2";
        botao.disabled = !desbloqueadas[n] || emEspera;
        botao.textContent = emEspera ? "Descansando..." : concluida ? `Jogar fase ${n} novamente` : `Jogar fase ${n}`;
    }
}
document.querySelectorAll("[data-iniciar-fase]").forEach(botao => {
    botao.addEventListener("click", () => iniciarFaseBatalha(Number(botao.dataset.iniciarFase)));
});
document.getElementById("fecharJogoFase")?.addEventListener("click", encerrarFaseBatalha);
document.querySelectorAll("[data-mover-fase]").forEach(botao => {
    const tecla = botao.dataset.moverFase;
    const iniciar = e => { e.preventDefault(); teclasFase[tecla] = true; };
    const parar = e => { e.preventDefault(); teclasFase[tecla] = false; };
    botao.addEventListener("pointerdown", iniciar);
    botao.addEventListener("pointerup", parar);
    botao.addEventListener("pointerleave", parar);
    botao.addEventListener("pointercancel", parar);
});
// Atualiza os contadores de descanso das fases sem precisar recarregar a página.
setInterval(() => {
    if (contaAtual) atualizarFasesBatalha();
}, 1000);

window.addEventListener("keydown", e => {
    if (!faseAtual) return;
    if (["ArrowLeft","ArrowRight","ArrowUp"," ","a","A","d","D","w","W"].includes(e.key)) e.preventDefault();
    if (["ArrowLeft","a","A"].includes(e.key)) teclasFase.esquerda = true;
    if (["ArrowRight","d","D"].includes(e.key)) teclasFase.direita = true;
    if (["ArrowUp"," ","w","W"].includes(e.key)) teclasFase.pular = true;
});
window.addEventListener("keyup", e => {
    if (["ArrowLeft","a","A"].includes(e.key)) teclasFase.esquerda = false;
    if (["ArrowRight","d","D"].includes(e.key)) teclasFase.direita = false;
    if (["ArrowUp"," ","w","W"].includes(e.key)) teclasFase.pular = false;
});
function iniciarFaseBatalha(numero) {
    atualizarFasesBatalha();
    const liberadas = obterFasesDesbloqueadas();
    if (!liberadas[numero]) { notificar("Essa fase ainda está bloqueada. Cuide do pet para ele evoluir! 💗"); return; }
    contaAtual.fasesBatalha ||= { concluidas: [] };
    const restante = (contaAtual.fasesBatalha[`bloqueioFase${numero}Ate`] || 0) - Date.now();
    if (restante > 0) {
        notificar(`Essa fase está descansando. Aguarde ${Math.ceil(restante / 1000)} segundos. 💗`);
        atualizarFasesBatalha();
        return;
    }
    encerrarFaseBatalha();
    faseAtual = numero;
    const painel = document.getElementById("jogoFaseBatalha");
    painel.classList.remove("oculto");
    document.getElementById("tituloJogoFase").textContent = `FASE ${numero}`;
    document.getElementById("nomeJogoFase").textContent = ["", "Caminho do portal", "Corrida até o topo", "O dragão de fogo"][numero];
    document.getElementById("instrucaoJogoFase").textContent = numero === 2
        ? "Suba pelos blocos, desvie do adversário e chegue ao topo antes do tempo acabar. Você tem 3 corações. Use A/D ou setas e Espaço para pular."
        : numero === 3 ? "Desvie das chamas e pule sobre a cabeça do dragão 3 vezes. Você tem 3 corações."
        : "Use A/D ou as setas para andar e Espaço para pular até o portal. Você tem 3 corações.";
    document.getElementById("mensagemJogoFase").textContent = "Boa sorte! " + (contas[emailAtual]?.nome?.split(" ")[0] || "Aventureiro") + " e " + nomePet() + " conseguem!";
    estadoFase = {
        x: 55, y: 320, vx: 0, vy: 0, noChao: false, camera: 0,
        tempo: 45, ultimoPulo: false, hits: 0, fogoX: 0, fogoAtivo: false,
        coracoes: 3, inimigoX: 315, inimigoDirecao: 1,
        plataformas: numero === 1
            ? [{x:0,y:390,w:190},{x:225,y:345,w:110},{x:380,y:290,w:105},{x:535,y:340,w:110},{x:690,y:270,w:105},{x:820,y:350,w:150}]
            : numero === 2
            ? [{x:0,y:390,w:190}, ...Array.from({length:9},(_,i)=>({x:i%2?390:220,y:352-i*38,w:145}))]
            : [{x:0,y:390,w:900}]
    };
    ultimoTempoFase = performance.now();
    desenharFaseBatalha();
    quadroFase = requestAnimationFrame(cicloFaseBatalha);
}
function encerrarFaseBatalha() {
    if (quadroFase) cancelAnimationFrame(quadroFase);
    quadroFase = null;
    faseAtual = 0;
    estadoFase = null;
    teclasFase = {};
    document.getElementById("jogoFaseBatalha")?.classList.add("oculto");
}
function cicloFaseBatalha(tempo) {
    if (!faseAtual || !estadoFase) return;
    const dt = Math.min((tempo - ultimoTempoFase) / 1000 || 0.016, 0.035);
    ultimoTempoFase = tempo;
    const s = estadoFase, canvas = document.getElementById("canvasFaseBatalha");
    const w = canvas.width, h = canvas.height;
    if (faseAtual === 2) {
        s.tempo -= dt;
        if (s.tempo <= 0) {
            perderCoracao("O tempo acabou!");
            if (!faseAtual || !estadoFase) return;
            s.tempo = 45;
        }
        // O adversário patrulha os blocos e precisa ser evitado.
        s.inimigoX += s.inimigoDirecao * 115 * dt;
        if (s.inimigoX < 215 || s.inimigoX > 520) s.inimigoDirecao *= -1;
        document.getElementById("mensagemJogoFase").textContent = `Tempo: ${Math.ceil(s.tempo)} s — alcance o topo!`;
    }
    s.vx = (teclasFase.direita ? 230 : 0) - (teclasFase.esquerda ? 230 : 0);
    s.x += s.vx * dt;
    s.x = Math.max(8, Math.min(w - 34, s.x));
    if (teclasFase.pular && !s.ultimoPulo && s.noChao) { s.vy = -440; s.noChao = false; }
    s.ultimoPulo = Boolean(teclasFase.pular);
    s.vy += 1000 * dt;
    const oldY = s.y;
    s.y += s.vy * dt;
    s.noChao = false;
    let plats = s.plataformas;
    if (faseAtual === 2) s.camera = 0;
    for (const p of plats) {
        const py = p.y;
        if (s.vy >= 0 && oldY + 28 <= py + 5 && s.y + 28 >= py && s.x + 24 > p.x && s.x < p.x + p.w) {
            s.y = py - 28; s.vy = 0; s.noChao = true;
        }
    }
    if (faseAtual === 1 && s.x > 840 && s.y > 300 && s.y < 410) return concluirFaseBatalha(1);
    if (faseAtual === 2 && s.y < 25) return concluirFaseBatalha(2);
    if ((faseAtual === 1 || faseAtual === 2) && s.y > 480) {
        perderCoracao("Você caiu dos blocos!");
        if (!faseAtual || !estadoFase) return;
    }
    if (faseAtual === 2 && s.x + 24 > s.inimigoX && s.x < s.inimigoX + 38 && s.y + 28 > 260 && s.y < 302) {
        perderCoracao("O adversário te alcançou!");
        if (!faseAtual || !estadoFase) return;
    }
    if (faseAtual === 3) {
        s.fogoX = (s.fogoX + 210 * dt) % 900;
        s.fogoAtivo = s.fogoX > 330 && s.fogoX < 620;
        const dragonX = 590, dragonY = 322;
        if (s.vy > 0 && oldY + 28 < dragonY + 35 && s.y + 28 >= dragonY && s.x + 24 > dragonX && s.x < dragonX + 150) {
            s.hits++; s.vy = -350; s.y = dragonY - 32;
            document.getElementById("mensagemJogoFase").textContent = `Acertou o dragão! ${s.hits}/3 saltos.`;
            if (s.hits >= 3) return concluirFaseBatalha(3);
        }
        if (s.fogoAtivo && s.x + 24 > 370 && s.x < 590 && s.y > 330) {
            perderCoracao("O fogo do dragão te atingiu!");
            if (!faseAtual || !estadoFase) return;
        }
    }
    if (faseAtual === 3 && s.y > 480) {
        perderCoracao("Você caiu da arena!");
        if (!faseAtual || !estadoFase) return;
    }
    desenharFaseBatalha();
    quadroFase = requestAnimationFrame(cicloFaseBatalha);
}
function perderCoracao(motivo) {
    if (!faseAtual || !estadoFase) return;
    const s = estadoFase;
    s.coracoes--;
    teclasFase = { esquerda: false, direita: false, pular: false };
    if (s.coracoes <= 0) {
        contaAtual.fasesBatalha ||= { concluidas: [] };
        contaAtual.fasesBatalha[`bloqueioFase${faseAtual}Ate`] = Date.now() + 2 * 60 * 1000;
        const numero = faseAtual;
        salvarJogo();
        encerrarFaseBatalha();
        atualizarFasesBatalha();
        notificar(`Você perdeu os 3 corações! A fase ${numero} ficará em descanso por 2 minutos. 💗`);
        return;
    }
    s.x = 55;
    s.y = 320;
    s.vx = 0;
    s.vy = 0;
    s.camera = 0;
    s.inimigoX = 315;
    s.inimigoDirecao = 1;
    s.fogoX = 0;
    s.fogoAtivo = false;
    document.getElementById("mensagemJogoFase").textContent = `${motivo} Você perdeu um coração. Restam ${s.coracoes} coração(ões)!`;
    desenharFaseBatalha();
}

function desenharFaseBatalha() {
    const canvas = document.getElementById("canvasFaseBatalha");
    if (!canvas || !estadoFase) return;
    const ctx = canvas.getContext("2d"), s = estadoFase, w = canvas.width, h = canvas.height;
    const grad = ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0, "#dff5ff"); grad.addColorStop(1, "#fff0f6");
    ctx.fillStyle = grad; ctx.fillRect(0,0,w,h);
    ctx.font = "25px sans-serif"; ctx.fillText("☁️", 100, 70); ctx.fillText("☁️", 700, 95);
    ctx.fillStyle = "#493747"; ctx.font = "bold 16px sans-serif";
    ctx.fillText("Corações:", 20, 30);
    for (let i = 0; i < 3; i++) {
        ctx.font = "25px sans-serif";
        ctx.fillText(i < s.coracoes ? "❤️" : "🖤", 105 + i * 29, 31);
    }
    if (faseAtual === 2) {
        ctx.fillStyle = "#8c72d8"; ctx.fillRect(760, 20, 95, 10);
        ctx.fillStyle = "#493747"; ctx.font = "bold 16px sans-serif"; ctx.fillText(`⏱ ${Math.ceil(s.tempo)}s`, 20, 57);
        // Adversário em movimento.
        ctx.font = "34px sans-serif";
        ctx.fillText("👾", s.inimigoX, 285);
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#493747";
        ctx.fillText("ADVERSÁRIO", s.inimigoX - 18, 303);
    }
    for (const p of s.plataformas) {
        const y = p.y;
        if (y < -40 || y > h+20) continue;
        ctx.fillStyle = "#c58bdc"; ctx.fillRect(p.x,y,p.w,14);
        ctx.fillStyle = "#f8d8ff"; ctx.fillRect(p.x,y,p.w,4);
    }
    if (faseAtual === 1) {
        ctx.font = "54px sans-serif"; ctx.fillText("🌀", 825, 330);
        ctx.font = "18px sans-serif"; ctx.fillStyle = "#493747"; ctx.fillText("PORTAL", 815, 365);
    }
    if (faseAtual === 3) {
        ctx.font = "100px sans-serif"; ctx.fillText("🐉", 600, 365);
        if (s.fogoAtivo) { ctx.font = "46px sans-serif"; ctx.fillText("🔥🔥", 420, 360); }
        ctx.font = "18px sans-serif"; ctx.fillStyle = "#493747"; ctx.fillText(`Saltos certeiros: ${s.hits}/3`, 20, 65);
    }
    ctx.font = "28px sans-serif";
    ctx.fillText(emojiPet(), s.x, s.y + 26);
}
function concluirFaseBatalha(numero) {
    encerrarFaseBatalha();
    contaAtual.fasesBatalha ||= { concluidas: [] };
    if (!contaAtual.fasesBatalha.concluidas.includes(numero)) contaAtual.fasesBatalha.concluidas.push(numero);
    contaAtual.moedas += numero * 25;
    contaAtual.vida = limitar(contaAtual.vida + 10);
    ganharExperiencia(numero * 25);
    salvarJogo();
    atualizarFasesBatalha();
    atualizarTela();
    notificar(`🏆 Fase ${numero} concluída! Você ganhou ${numero * 25} moedas e experiência.`);
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarTela("telaLogin");
    mostrarFormulario("login");

    desenharCenarioParado();
});

window.addEventListener("beforeunload", () => {
    salvarJogo();
});
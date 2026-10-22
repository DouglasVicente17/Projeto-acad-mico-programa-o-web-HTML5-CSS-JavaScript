document.addEventListener("DOMContentLoaded", function() {

  // --- 1. FUNCIONALIDADE DE TEMA (CLARO / ESCURO) ---
  const botaoTema = document.createElement('button');
  botaoTema.innerText = '🌓 Alternar Tema';
  botaoTema.style.position = 'fixed';
  botaoTema.style.bottom = '20px';
  botaoTema.style.right = '20px';
  botaoTema.style.padding = '10px 15px';
  botaoTema.style.backgroundColor = '#e74c3c';
  botaoTema.style.color = '#ffffff';
  botaoTema.style.border = 'none';
  botaoTema.style.borderRadius = '5px';
  botaoTema.style.cursor = 'pointer';
  botaoTema.style.zIndex = '1000';
  botaoTema.style.fontWeight = 'bold';

  document.body.appendChild(botaoTema);

  botaoTema.addEventListener('click', function() {
      document.body.classList.toggle('modo-claro');
  });


  // --- 2. CONTADOR DE CLIQUES E ALERTA NO CARRINHO ---
  let contadorCarrinho = 0;

  const headerPrincipal = document.querySelector('.header-principal');
  const infoCarrinho = document.createElement('div');
  infoCarrinho.style.color = '#ffffff';
  infoCarrinho.style.fontSize = '0.9rem';
  infoCarrinho.style.fontWeight = 'bold';
  infoCarrinho.style.marginLeft = '20px';
  infoCarrinho.innerHTML = '🛒 Carrinho: <span id="qtd-carrinho">0</span> item(ns)';

  if (headerPrincipal) {
      headerPrincipal.appendChild(infoCarrinho);
  }

  const spanQtd = document.getElementById('qtd-carrinho');
  const botoesComprar = document.querySelectorAll('.btn-comprar, .card-produto button, .card-produto a');

  botoesComprar.forEach(function(botao) {
      botao.addEventListener('click', function(evento) {
          evento.preventDefault();
          contadorCarrinho++;
          
          if (spanQtd) {
              spanQtd.textContent = contadorCarrinho;
          }

          alert('Sucesso! O produto foi adicionado ao seu carrinho de compras.');
      });
  });


// --- 3. CONSUMO DE API PÚBLICA COM TRADUÇÃO (EXIGÊNCIA DA ATIVIDADE 4) ---
const caixaConselho = document.getElementById('conselho-api');
const botaoAtualizarApi = document.getElementById('btn-atualizar-api');

function buscarDicaDeRock() {
    caixaConselho.textContent = "A carregar nova dica...";
    
    // 1. Busca o conselho em inglês na API oficial[cite: 45]
    fetch('https://api.adviceslip.com/advice')
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dados) {
            const textoIngles = dados.slip.advice;
            
            // 2. Traduz para português usando o sinal de mais (+) em vez de crases
            const urlTraducao = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(textoIngles) + '&langpair=en|pt';
            return fetch(urlTraducao);
        })
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dadosTraducao) {
            const textoPortugues = dadosTraducao.responseData.translatedText;
            caixaConselho.textContent = textoPortugues;
        })
        .catch(function(erro) {
            caixaConselho.textContent = "Não foi possível carregar a dica no momento. 🎸";
            console.error("Erro ao buscar API:", erro);
        });
}

// Executa ao carregar a página
buscarDicaDeRock();

// Executa ao clicar no botão "Gerar nova dica"
if (botaoAtualizarApi) {
    botaoAtualizarApi.addEventListener('click', buscarDicaDeRock);
}

 // Executa ao carregar a página
 buscarDicaDeRock();

 // Executa ao clicar no botão "Gerar nova dica"
 if (botaoAtualizarApi) {
     botaoAtualizarApi.addEventListener('click', buscarDicaDeRock);
 }

  // Executa ao carregar a página
  buscarDicaDeRock();

  // Executa ao clicar no botão
  if (botaoAtualizarApi) {
      botaoAtualizarApi.addEventListener('click', buscarDicaDeRock);
  }

});


/*
REFLEXÃO SOBRE CLEAN CODE (EXIGÊNCIA DA ATIVIDADE 4)

Como apliquei os princípios do Clean Code neste projeto:
1. Nomes significativos: variáveis e funções possuem nomes claros em português 
  (ex: 'contadorCarrinho', 'buscarDicaDeRock', 'botaoTema'), facilitando a leitura.
2. Separação de responsabilidades: O código JavaScript foi estruturado em blocos 
  isolados para cada funcionalidade (Manipulação de tema, Gestão do carrinho e 
  Consumo da API).
3. Comentários úteis: Foram inseridos apenas comentários descritivos para guiar 
  a estrutura lógica das secções.

O que ainda pode ser melhorado:
- Poderia modularizar o código dividindo-o em vários ficheiros JS menores 
 (ex: api.js, tema.js, carrinho.js) utilizando módulos ES6 (import/export), 
 à medida que a aplicação cresça.
*/
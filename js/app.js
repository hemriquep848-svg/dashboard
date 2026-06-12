/**
 * DADOS OFICIAIS - do enunciado
 * Em produção real, seriam obtidos via API de banco de dados
 * Squad New Black
 */
const entregas = [
  { id: "301", cidade: "São Paulo", regiao: "Sudeste", transportadora: "RotaMax", prazo: 3, diasReais: 7 },
  { id: "302", cidade: "Curitiba", regiao: "Sul", transportadora: "ViaCargo", prazo: 5, diasReais: 5 },
  { id: "303", cidade: "Recife", regiao: "Nordeste", transportadora: "FlashLog", prazo: 4, diasReais: 9 },
  { id: "304", cidade: "Manaus", regiao: "Norte", transportadora: "RotaMax", prazo: 6, diasReais: 4 },
  { id: "305", cidade: "Goiânia", regiao: "Centro-Oeste", transportadora: "ViaCargo", prazo: 2, diasReais: 6 },
  { id: "306", cidade: "Porto Alegre", regiao: "Sul", transportadora: "FlashLog", prazo: 5, diasReais: 12 },
  { id: "307", cidade: "Florianópolis", regiao: "Sul", transportadora: "RotaMax", prazo: 6, diasReais: 9 },
  { id: "308", cidade: "Rio de Janeiro", regiao: "Sudeste", transportadora: "ViaCargo", prazo: 3, diasReais: 4 },
  { id: "309", cidade: "Belém", regiao: "Norte", transportadora: "FlashLog", prazo: 5, diasReais: 5 },
  { id: "310", cidade: "Salvador", regiao: "Nordeste", transportadora: "ViaCargo", prazo: 4, diasReais: 8 }
];

let graficoBarras, graficoPizza, graficoRegioes, graficoRanking;
let dadosAtuais = [...entregas];

// ========== UTILITÁRIOS ==========
function normalizarTexto(texto) {
  return texto.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function calcularAtraso(entrega) {
  return Math.max(0, entrega.diasReais - entrega.prazo);
}

function textoDias(valor) {
  return valor === 1 ? "1 dia" : `${valor} dias`;
}

function statusEntrega(entrega) {
  const dias = calcularAtraso(entrega);
  if (dias === 0) return "No prazo";
  if (dias <= 2) return "Atenção";
  return "Crítico";
}

function agregarAtrasoPorChave(lista, chave) {
  return lista.reduce((acc, item) => {
    const nome = item[chave];
    acc[nome] = (acc[nome] || 0) + calcularAtraso(item);
    return acc;
  }, {});
}

// ========== FILTROS ==========
function popularFiltros() {
  const regioes = [...new Set(entregas.map(e => e.regiao))];
  const transportadoras = [...new Set(entregas.map(e => e.transportadora))];
  const selectReg = document.getElementById("filtroRegiao");
  const selectTrans = document.getElementById("filtroTransportadora");

  regioes.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    selectReg.appendChild(opt);
  });
  transportadoras.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    selectTrans.appendChild(opt);
  });
}

function obterDadosFiltrados() {
  const regiao = document.getElementById("filtroRegiao").value;
  const transportadora = document.getElementById("filtroTransportadora").value;
  const busca = normalizarTexto(document.getElementById("buscaInput").value);

  return entregas.filter(e => {
    const okReg = regiao === "Todas" || e.regiao === regiao;
    const okTrans = transportadora === "Todas" || e.transportadora === transportadora;
    const textoBusca = normalizarTexto(`${e.id} ${e.cidade} ${e.regiao} ${e.transportadora}`);
    return okReg && okTrans && textoBusca.includes(busca);
  });
}

// ========== CARDS ==========
function atualizarCards(dados) {
  const total = dados.length;
  const atrasadas = dados.filter(e => calcularAtraso(e) > 0).length;
  const taxa = total ? Math.round((atrasadas / total) * 100) : 0;
  const maior = total ? Math.max(...dados.map(e => calcularAtraso(e))) : 0;

  document.getElementById("totalEntregas").innerText = total;
  document.getElementById("totalAtrasadas").innerText = atrasadas;
  document.getElementById("taxaAtraso").innerHTML = `${taxa}%`;
  document.getElementById("maiorAtraso").innerHTML = textoDias(maior);
}

function atualizarInsight(dados) {
  if (!dados.length) {
    document.getElementById("insightAutomatico").innerHTML = "Nenhuma entrega encontrada com os filtros atuais.";
    return;
  }
  const atrasadas = dados.filter(e => calcularAtraso(e) > 0);
  const taxa = Math.round((atrasadas.length / dados.length) * 100);
  const maisCritica = [...dados].sort((a, b) => calcularAtraso(b) - calcularAtraso(a))[0];
  const porRegiao = agregarAtrasoPorChave(dados, "regiao");
  const regiaoCritica = Object.entries(porRegiao).sort((a, b) => b[1] - a[1])[0];

  document.getElementById("insightAutomatico").innerHTML = `
    🔥 <strong>${dados.length} entregas</strong> analisadas | 
    ${atrasadas.length} com atraso (${taxa}%) | 
    Pior caso: <strong>${maisCritica.id} - ${maisCritica.cidade}</strong> (${textoDias(calcularAtraso(maisCritica))}) | 
    Região crítica: <strong>${regiaoCritica[0]}</strong> (${textoDias(regiaoCritica[1])} acumulados)
  `;
}

function atualizarTabela(dados) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  const ordenados = [...dados].sort((a, b) => calcularAtraso(b) - calcularAtraso(a));

  ordenados.forEach(e => {
    const atrasoDias = calcularAtraso(e);
    const status = statusEntrega(e);
    let chipClass = "chip-success";
    if (status === "Atenção") chipClass = "chip-warning";
    if (status === "Crítico") chipClass = "chip-danger";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.id}</td><td>${e.cidade}</td><td>${e.regiao}</td><td>${e.transportadora}</td>
      <td>${textoDias(e.prazo)}</td><td>${textoDias(e.diasReais)}</td>
      <td>${textoDias(atrasoDias)}</td><td><span class="status-chip ${chipClass}">${status}</span></td>
    `;
    tr.addEventListener("click", () => abrirModal(`Entrega ${e.id}`, `Destino: ${e.cidade}<br>Operadora: ${e.transportadora}<br>Prazo: ${textoDias(e.prazo)} | Real: ${textoDias(e.diasReais)}<br>Atraso: ${textoDias(atrasoDias)}<br>Status: ${status}`));
    tbody.appendChild(tr);
  });
}

// ========== GRÁFICOS INOVADORES ==========
function destruirGraficos() {
  if (graficoBarras) graficoBarras.destroy();
  if (graficoPizza) graficoPizza.destroy();
  if (graficoRegioes) graficoRegioes.destroy();
  if (graficoRanking) graficoRanking.destroy();
}

function criarGraficoBarrasInclinadas(labels, valores) {
  const ctx = document.getElementById("graficoBarrasInclinadas").getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: { labels, datasets: [{ label: "Dias de atraso", data: valores, backgroundColor: "#ffb347", borderRadius: 12, barPercentage: 0.7, categoryPercentage: 0.8 }] },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: { y: { beginAtZero: true, grid: { color: "rgba(255,180,100,0.2)" }, ticks: { color: "#ffddbb" } }, x: { ticks: { color: "#ffddbb", font: { weight: "bold" } } } },
      plugins: { tooltip: { callbacks: { label: ctx => `${ctx.raw} dias` } } },
      elements: { bar: { borderWidth: 2, borderColor: "#ffffff50" } }
    }
  });
}

function criarGraficoPizza3D(noPrazo, atrasadas) {
  const ctx = document.getElementById("graficoPizza3D").getContext("2d");
  return new Chart(ctx, {
    type: "doughnut",
    data: { labels: ["✅ No prazo", "⚠️ Atrasadas"], datasets: [{ data: [noPrazo, atrasadas], backgroundColor: ["#22c55e", "#ef4444"], borderWidth: 0, cutout: "65%" }] },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: "#ffddbb" } }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} entregas` } } } }
  });
}

function criarGraficoRegioes(labels, valores) {
  const ctx = document.getElementById("graficoRegioes").getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: { labels, datasets: [{ label: "Atraso acumulado", data: valores, borderColor: "#ffb347", backgroundColor: "rgba(255, 180, 71, 0.15)", fill: true, tension: 0.3, pointBackgroundColor: "#ff8c00", pointRadius: 6, pointHoverRadius: 9 }] },
    options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, grid: { color: "rgba(255,180,100,0.2)" }, ticks: { color: "#ffddbb" } }, x: { ticks: { color: "#ffddbb" } } } }
  });
}

function criarGraficoRankingHorizontal(entregasCriticas) {
  const ctx = document.getElementById("graficoRanking").getContext("2d");
  const labels = entregasCriticas.map(e => `${e.id} - ${e.cidade.substring(0, 12)}`);
  const valores = entregasCriticas.map(e => calcularAtraso(e));
  return new Chart(ctx, {
    type: "bar",
    data: { labels, datasets: [{ label: "Dias de atraso", data: valores, backgroundColor: "#f97316", borderRadius: 10 }] },
    options: { indexAxis: "y", responsive: true, maintainAspectRatio: true, scales: { x: { beginAtZero: true, ticks: { color: "#ffddbb" } }, y: { ticks: { color: "#ffddbb" } } } }
  });
}

function atualizarGraficos(dados) {
  destruirGraficos();
  const atrasoTransportadora = agregarAtrasoPorChave(dados, "transportadora");
  const atrasoRegiao = agregarAtrasoPorChave(dados, "regiao");
  const ranking = [...dados].filter(e => calcularAtraso(e) > 0).sort((a, b) => calcularAtraso(b) - calcularAtraso(a)).slice(0, 5);
  const noPrazo = dados.filter(e => calcularAtraso(e) === 0).length;
  const atrasadas = dados.filter(e => calcularAtraso(e) > 0).length;

  graficoBarras = criarGraficoBarrasInclinadas(Object.keys(atrasoTransportadora), Object.values(atrasoTransportadora));
  graficoPizza = criarGraficoPizza3D(noPrazo, atrasadas);
  graficoRegioes = criarGraficoRegioes(Object.keys(atrasoRegiao), Object.values(atrasoRegiao));
  graficoRanking = criarGraficoRankingHorizontal(ranking.length ? ranking : [{ id: "N/D", cidade: "Sem dados" }]);
}

// ========== MODAL ==========
function abrirModal(titulo, texto) {
  document.getElementById("modalTitle").innerText = titulo;
  document.getElementById("modalBody").innerHTML = `<p>${texto}</p>`;
  document.getElementById("insightModal").classList.add("active");
}
function fecharModal() { document.getElementById("insightModal").classList.remove("active"); }

function gerarInsight(tipo) {
  const d = dadosAtuais;
  const total = d.length;
  const atrasadas = d.filter(e => calcularAtraso(e) > 0).length;
  const taxa = total ? Math.round((atrasadas / total) * 100) : 0;
  const map = {
    total: ["Total de entregas", `${total} entregas no escopo atual.`],
    atrasadas: ["Entregas com atraso", `${atrasadas} entregas atrasadas (${taxa}%).`],
    taxa: ["Taxa de atraso", `${taxa}% de não conformidade.`],
    maior: ["Maior atraso", document.getElementById("maiorAtraso").innerText],
    transportadora: ["Barras inclinadas", "Cada barra mostra o total de atraso por operadora. Quanto maior, mais crítica."],
    regiao: ["Análise regional", "Gráfico de área com evolução comparativa entre regiões."],
    ranking: ["Top críticas", "Ranking horizontal das 5 piores entregas."],
    status: ["Pizza 3D", "Proporção visual de entregas no prazo vs atrasadas."],
    tabela: ["Tabela dinâmica", "Ordenada pelo maior atraso. Clique para detalhes."]
  };
  return map[tipo] || ["Insight", "Explore os dados com filtros."];
}

function atualizarDashboard() {
  dadosAtuais = obterDadosFiltrados();
  atualizarCards(dadosAtuais);
  atualizarInsight(dadosAtuais);
  atualizarTabela(dadosAtuais);
  atualizarGraficos(dadosAtuais);
}

// ========== EVENTOS ==========
document.addEventListener("DOMContentLoaded", () => {
  popularFiltros();
  atualizarDashboard();

  document.getElementById("filtroRegiao").addEventListener("change", atualizarDashboard);
  document.getElementById("filtroTransportadora").addEventListener("change", atualizarDashboard);
  document.getElementById("buscaInput").addEventListener("input", atualizarDashboard);
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.style.background = document.body.style.background === "linear-gradient(135deg, #f97316 0%, #ea580c 30%, #0f172a 100%)" 
      ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #f97316 100%)"
      : "linear-gradient(135deg, #f97316 0%, #ea580c 30%, #0f172a 100%)";
  });
  document.querySelectorAll("[data-insight]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tipo = btn.getAttribute("data-insight");
      const [tit, txt] = gerarInsight(tipo);
      abrirModal(tit, txt);
    });
  });
  document.getElementById("closeModal").addEventListener("click", fecharModal);
  document.getElementById("insightModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("insightModal")) fecharModal();
  });
});
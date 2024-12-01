// Inicializa Parse
Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY"); // Substitua pelos seus valores
Parse.serverURL = "https://parseapi.back4app.com/";

// Função para adicionar mais gabinetes
function adicionarGabinete() {
  const gabinetesContainer = document.getElementById("gabinetesContainer");
  const numeroGabinetes =
    gabinetesContainer.getElementsByClassName("gabinete").length + 1;

  const gabineteDiv = document.createElement("div");
  gabineteDiv.className = "gabinete";
  gabineteDiv.id = `gabineteDiv${numeroGabinetes}`;
  gabineteDiv.innerHTML = `
        <label for="gabinete${numeroGabinetes}">*INFORMAR GABINETE - ${numeroGabinetes}:*</label>
        <select id="gabinete${numeroGabinetes}" required>
            <option value="DELTA">DELTA</option>
            <option value="DELTA ORION">DELTA ORION</option>
            <option value="DELTA TX">DELTA TX</option>
            <option value="ELTEK">ELTEK</option>
            <option value="ELTEK FULL TX">ELTEK FULL TX</option>
            <option value="EMERSON">EMERSON</option>
            <option value="EMERSON TX">EMERSON TX</option>
            <option value="PHB">PHB</option>
        </select>

        <label for="retificadores${numeroGabinetes}">*QUANTIDADE DE RETIFICADORES POR GABINETE-FCC:*</label>
        <input type="number" id="retificadores${numeroGabinetes}" required>

        <label for="baterias${numeroGabinetes}">*QUANTIDADE DE BATERIAS NO GABINETE-FCC:*</label>
        <input type="number" id="baterias${numeroGabinetes}" required>

        <label for="siteBateria${numeroGabinetes}">*SITE COM BATERIA:*</label>
        <select id="siteBateria${numeroGabinetes}" required>
            <option value="SIM">SIM</option>
            <option value="NAO">NÃO</option>
        </select>

        <label for="semAutonomia${numeroGabinetes}">*SEM AUTONOMIA:*</label>
        <input type="checkbox" id="semAutonomia${numeroGabinetes}">

        <label for="infoBateria${numeroGabinetes}">*INFORMAÇÕES DA BATERIA:*</label>
        <select id="infoBateria${numeroGabinetes}" required>
            <option value="EP TELECOM">EP TELECOM</option>
            <option value="HUAWEI">HUAWEI</option>
            <option value="MOURA">MOURA</option>
            <option value="NEWMAX">NEWMAX</option>
            <option value="UNIPOWER">UNIPOWER</option>
            <option value="ZTE">ZTE</option>
        </select>

        <label for="quantidadeBancos${numeroGabinetes}">*QUANTIDADE DE BANCOS:*</label>
        <input type="number" id="quantidadeBancos${numeroGabinetes}" required>

        <label for="capacidade${numeroGabinetes}">*CAPACIDADE:*</label>
        <input type="text" id="capacidade${numeroGabinetes}" required>

        <label for="volts${numeroGabinetes}">*VOLTS:*</label>
        <select id="volts${numeroGabinetes}" required>
            <option value="2 V">2 V</option>
            <option value="12 V">12 V</option>
            <option value="24 V">24 V</option>
            <option value="48 V">48 V</option>
        </select>

        <label for="elemento${numeroGabinetes}">*ELEMENTO:*</label>
        <input type="text" id="elemento${numeroGabinetes}" required>

        <label for="consumoFonte${numeroGabinetes}">*CONSUMO FONTE:*</label>
        <input type="text" id="consumoFonte${numeroGabinetes}" required>

        <button type="button" onclick="removerGabinete(${numeroGabinetes})">Remover Gabinete</button>
    `;

  gabinetesContainer.appendChild(gabineteDiv);
}

// Função para remover gabinetes
function removerGabinete(numero) {
  const gabineteDiv = document.getElementById(`gabineteDiv${numero}`);
  gabineteDiv.remove();
}

// Função para gerar o relatório
function gerarRelatorio() {
  const form = document.getElementById("relatorioForm");

  // Verifica se o formulário é válido
  if (form.checkValidity() === false) {
    // Caso não seja válido, exibe as mensagens de erro
    form.reportValidity();
    return; // Interrompe a execução da função
  }

  const relatorio = {
    site: document.getElementById("site").value.toUpperCase(),
    ami: document.getElementById("ami").value.toUpperCase(),
    tecnico: document.getElementById("tecnico").value.toUpperCase(),
    supervisor: document.getElementById("supervisor").value.toUpperCase(),
    coordenador: document.getElementById("coordenador").value.toUpperCase(),
    dataAcionamento: document.getElementById("dataAcionamento").value,
    dataDeslocamento: document.getElementById("dataDeslocamento").value,
    dataEntradaSite: document.getElementById("dataEntradaSite").value,
    dataSaidaSite: document.getElementById("dataSaidaSite").value,
    quemAcionou: document.getElementById("quemAcionou").value.toUpperCase(),
    cadeado: document.getElementById("cadeado").value.toUpperCase(),
    modeloCadeado: document.getElementById("modeloCadeado").value.toUpperCase(),
    vandalizado: document.getElementById("vandalizado").value.toUpperCase(),
    siteGPON: document.getElementById("siteGPON").value.toUpperCase(),
    zeladoria: document.getElementById("zeladoria").value.toUpperCase(),
    estadoPortas: document.getElementById("estadoPortas").value.toUpperCase(),
    portaGabinete: document.getElementById("portaGabinete").value.toUpperCase(),
    posteInterno: document.getElementById("posteInterno").value.toUpperCase(),
    iluminacao: document.getElementById("iluminacao").value.toUpperCase(),
    falhaAtividade: document
      .getElementById("falhaAtividade")
      .value.toUpperCase(),
    causaEncontrada: document
      .getElementById("causaEncontrada")
      .value.toUpperCase(),
    acaoRealizada: document.getElementById("acaoRealizada").value.toUpperCase(),
    pendencias: document.getElementById("pendencias").value.toUpperCase(),
    amiPendencia: document.getElementById("amiPendencia").value.toUpperCase(),
    testadoCom: document.getElementById("testadoCom").value.toUpperCase(),
    obs: document.getElementById("obs").value.toUpperCase()
  };

  // Enviar os dados para o backend
  Parse.Cloud.run("saveRelatorio", relatorio)
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      alert("Erro ao salvar relatório: " + error.message);
    });
}

// Função para copiar o relatório para a área de transferência
function copiarRelatorio() {
  const resultado = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(resultado).then(() => {
    alert("Relatório copiado para a área de transferência.");
  });
}

// Função para enviar o relatório via WhatsApp
function enviarRelatorio() {
  const resultado = document.getElementById("resultado").textContent;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    resultado
  )}`;
  window.open(whatsappUrl, "_blank");
}

// Mostrar/ocultar campos baseados nas seleções
document.getElementById("cadeado").addEventListener("change", function () {
  const modeloCadeadoField = document.getElementById("modeloCadeado")
    .parentElement;
  modeloCadeadoField.classList.toggle("hidden", this.value === "NAO");
});

document.getElementById("vandalizado").addEventListener("change", function () {
  const vandalizadoDetails = document.getElementById("vandalizadoDetails");
  vandalizadoDetails.classList.toggle("hidden", this.value === "NAO");
});

// Inicialmente esconder os detalhes do modelo do cadeado e vandalismo
document.addEventListener("DOMContentLoaded", () => {
  const modeloCadeadoField = document.getElementById("modeloCadeado")
    .parentElement;
  const vandalizadoDetails = document.getElementById("vandalizadoDetails");

  if (document.getElementById("cadeado").value === "NAO") {
    modeloCadeadoField.classList.add("hidden");
  }
  if (document.getElementById("vandalizado").value === "NAO") {
    vandalizadoDetails.classList.add("hidden");
  }
});

// Código para manipular a resposta do botão "Gerar Relatório"
document
  .getElementById("gerarRelatorio")
  .addEventListener("click", gerarRelatorio);

// Função para gerar o relatório
function gerarRelatorio() {
  const form = document.getElementById("relatorioForm");

  // Verifica se o formulário é válido
  if (form.checkValidity() === false) {
    // Caso não seja válido, exibe as mensagens de erro
    form.reportValidity();
    return; // Interrompe a execução da função
  }

  const relatorio = {
    site: document.getElementById("site").value.toUpperCase(),
    ami: document.getElementById("ami").value.toUpperCase(),
    tecnico: document.getElementById("tecnico").value.toUpperCase(),
    supervisor: document.getElementById("supervisor").value.toUpperCase(),
    coordenador: document.getElementById("coordenador").value.toUpperCase(),
    dataAcionamento: document.getElementById("dataAcionamento").value,
    dataDeslocamento: document.getElementById("dataDeslocamento").value,
    dataEntradaSite: document.getElementById("dataEntradaSite").value,
    dataSaidaSite: document.getElementById("dataSaidaSite").value,
    quemAcionou: document.getElementById("quemAcionou").value.toUpperCase(),
    cadeado: document.getElementById("cadeado").value.toUpperCase(),
    modeloCadeado: document.getElementById("modeloCadeado").value.toUpperCase(),
    vandalizado: document.getElementById("vandalizado").value.toUpperCase(),
    siteGPON: document.getElementById("siteGPON").value.toUpperCase(),
    zeladoria: document.getElementById("zeladoria").value.toUpperCase(),
    estadoPortas: document.getElementById("estadoPortas").value.toUpperCase(),
    portaGabinete: document.getElementById("portaGabinete").value.toUpperCase(),
    posteInterno: document.getElementById("posteInterno").value.toUpperCase(),
    iluminacao: document.getElementById("iluminacao").value.toUpperCase(),
    falhaAtividade: document
      .getElementById("falhaAtividade")
      .value.toUpperCase(),
    causaEncontrada: document
      .getElementById("causaEncontrada")
      .value.toUpperCase(),
    acaoRealizada: document.getElementById("acaoRealizada").value.toUpperCase(),
    pendencias: document.getElementById("pendencias").value.toUpperCase(),
    amiPendencia: document.getElementById("amiPendencia").value.toUpperCase(),
    testadoCom: document.getElementById("testadoCom").value.toUpperCase(),
    obs: document.getElementById("obs").value.toUpperCase()
  };

  // Enviar os dados para o backend
  Parse.Cloud.run("saveRelatorio", relatorio)
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      alert("Erro ao salvar relatório: " + error.message);
    });
}

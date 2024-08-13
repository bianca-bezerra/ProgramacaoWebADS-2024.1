document.addEventListener("DOMContentLoaded", main);

function main() {
  document.getElementById("botaoErro").addEventListener("click", () => setErrorMessage("Erro", "erro1"));
  document.getElementById("botaoExibir").addEventListener("click", exibirConteudo);
  document.getElementById("botaoCalcular").addEventListener("click", exibirEngajamento);
  document.getElementById("botaoCarregarImagem").addEventListener("click", exibirFoto);
  document.getElementById("enviarBtn").addEventListener("click", selectSocialMedia);
  document.getElementById("botaoHashtag").addEventListener("click", addHashtag);
  document.getElementById("botaoExcluir").addEventListener("click", deleteHashtag);
  document.getElementById("moverParaDireitaBtn").addEventListener("click", moveRight);
  document.getElementById("moverParaEsquerdaBtn").addEventListener("click", moveLeft);

  onSelectChange();
  document.getElementById("ativosDisponiveis").addEventListener("change", onSelectChange);
  document.getElementById("carteiraInvestimentos").addEventListener("change", onSelectChange);
}

function setErrorMessage(mensagemErro, elementId) {
  const errorMessageElement = document.getElementById(elementId);
  errorMessageElement.textContent = mensagemErro;
  errorMessageElement.classList.remove("oculto");
  setErrorTime(elementId, 2000, "oculto");
}

function setErrorTime(elementId, time, classe) {
  setTimeout(() => {
    document.getElementById(elementId).classList.add(classe);
  }, time);
}

function exibirConteudo() {
  const conteudo = document.getElementById("caixaDeTexto").value.trim();
  if (conteudo) {
    document.getElementById("conteudo").innerHTML = conteudo;
  } else {
    setErrorMessage("Conteúdo não pode ser vazio", "erro2");
  }
}

function calculateEngajamento(interacoes, visualizacoes) {
  return (Number(interacoes) / Number(visualizacoes)) * 100;
}

function validateNumber(input) {
  return isNaN(input) || input === '';
}

function exibirEngajamento() {
  const resultElement = document.getElementById("resultEngajamento");
  const interacoes = document.getElementById("interacoes").value;
  const visualizacoes = document.getElementById("visualizacoes").value;

  if (validateNumber(interacoes) || validateNumber(visualizacoes)) {
    setErrorMessage("Os inputs devem ser numéricos", "erro3");
  } else {
    const engajamento = calculateEngajamento(interacoes, visualizacoes);
    resultElement.innerText = `ENGAJAMENTO: ${engajamento.toFixed(2)}%`;
  }
}

function exibirFoto() {
  const fotoPreview = document.createElement("img");
  const fotoInput = document.getElementById("imagem");
  const resultado = document.getElementById("resultImage");
  resultado.innerHTML = "";

  const fileReader = new FileReader();
  fileReader.readAsDataURL(fotoInput.files[0]);
  fileReader.onloadend = (event) => {
    fotoPreview.src = event.target.result;
    resultado.appendChild(fotoPreview);
  };
}

function selectSocialMedia() {
  const redes = document.getElementsByName("redesSociais");
  const checked = Array.from(redes).filter(rede => rede.checked);

  if (checked.length === 0) {
    setErrorMessage("É preciso selecionar pelo menos uma rede social", "erro4");
  }
}

function addHashtag() {
  const input = document.getElementById("inputHashtag").value.trim();
  const select = document.getElementById("selectHashtag");

  if (hashtagValidator(input, select)) {
    const newOption = document.createElement("option");
    newOption.textContent = input;
    select.appendChild(newOption);
  } else {
    setErrorMessage("Hashtag inválida ou já existente", "erroHashtag");
  }
}

function hashtagValidator(hashtag, selectHashtag) {
  const options = Array.from(selectHashtag.options);
  const isUnique = !options.some(option => option.textContent === hashtag);
  const isValidLength = hashtag.length >= 2;
  const isNotMaxLength = options.length < 5;

  return isValidLength && isUnique && isNotMaxLength;
}

function deleteHashtag() {
  const select = document.getElementById("selectHashtag");
  const selectedOption = select.selectedOptions[0];

  if (selectedOption) {
    select.removeChild(selectedOption);
  } else {
    setErrorMessage("Nenhuma hashtag selecionada para excluir", "erroHashtag");
  }
}

function moveRight() {
  const select = document.getElementById("ativosDisponiveis");
  const selectedOptions = Array.from(select.selectedOptions);
  const selectCarteira = document.getElementById("carteiraInvestimentos");

  selectedOptions.forEach(option => {
    const newOption = document.createElement("option");
    newOption.textContent = option.textContent;
    newOption.value = option.value;
    selectCarteira.appendChild(newOption);
    select.removeChild(option);
  });

  onSelectChange();
}

function moveLeft() {
  const select = document.getElementById("ativosDisponiveis");
  const selectCarteira = document.getElementById("carteiraInvestimentos");
  const selectedOptions = Array.from(selectCarteira.selectedOptions);

  selectedOptions.forEach(option => {
    const newOption = document.createElement("option");
    newOption.textContent = option.textContent;
    newOption.value = option.value;
    select.appendChild(newOption);
    selectCarteira.removeChild(option);
  });

  onSelectChange();
}

function onSelectChange() {
  const select = document.getElementById("ativosDisponiveis");
  const selectCarteira = document.getElementById("carteiraInvestimentos");

  const botaoMoveRight = document.getElementById("moverParaDireitaBtn");
  const botaoMoveLeft = document.getElementById("moverParaEsquerdaBtn");

  botaoMoveRight.disabled = select.selectedOptions.length === 0;
  botaoMoveLeft.disabled = selectCarteira.selectedOptions.length === 0;
}

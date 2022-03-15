const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃ";
function criarBotao(letra) {
  const botao = document.createElement("button");
  botao.value = letra;
  botao.innerHTML = letra;
  botao.id = `Letra_${letra}`;
  return botao;
}
function criarBotoes() {
  for (let letra of letras) {
    document
      .querySelector("#buttonsLetras")
      .appendChild(criarBotao(letra));
  }
}
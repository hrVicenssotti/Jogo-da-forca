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
  document.onkeydown = function (click) {
    const button = document.querySelector(`#Letra_${click.key.toUpperCase()}`)
    if (button) {
      button.classList.add("active")
      button.click()
    }
  }
  document.onkeyup = function (click) {
    const button = document.querySelector(`#Letra_${click.key.toUpperCase()}`)
    if (button) button.classList.remove("active")
  }
}
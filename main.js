const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃ";
criarBotoes();
entradaUser();
const pincel = new Pinceis();
const game = new contrutoresForca();
game.start(context)
function start() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  game.clear()
  game.start(context)
  removerMarcacaoBotao() 
}
function entradaUser() {
  document.querySelectorAll(".buttons>button").forEach((button) => {
    button.onclick = function (click) {
      game.verificaLetra(click.target.value.toUpperCase());
      button.classList.add("press");
    };
  });
  document.onkeydown = function (click) {
    const button = document.querySelector(`#Letra_${click.key.toUpperCase()}`);
    if (button) {
        button.classList.add("active");
        button.click();
    }
  };
  document.onkeyup = function (click) {
    const button = document.querySelector(`#Letra_${click.key.toUpperCase()}`);
    if (button) button.classList.remove("active");
  };
}
function criarBotao(letra) {
  const botao = document.createElement("button");
  botao.value = letra;
  botao.innerHTML = letra;
  botao.id = `Letra_${letra}`;
  return botao;
}
function criarBotoes() {
  for (let i in letras) {
    document
      .querySelector("#buttonsLetras")
      .appendChild(criarBotao(letras[i]));
  }
}
function removerMarcacaoBotao() {
  document.querySelectorAll(".buttons>button").forEach(button => button.classList.remove('press'))
}
function contrutoresForca() {
  let emAndamento = true;
  const letraRestantes = {};
  let parteAtiva = 0;
  let letrasPress = "";
  let palavraSorteada = ''
  function criarForca(context) {
    const cor = "#000066";
    pincel.drawRect(context, 60, 50, 10, 250, cor);
    pincel.drawRect(context, 60, 50, 140, 10, cor);
    pincel.drawRect(context, 20, 300, 90, 10, cor);
    pincel.drawRect(context, 200, 50, 10, 20, cor);
  }
  function fimJogo(context, texto) {
    emAndamento = false;
    const widthTela = canvas.width / 2;
    pincel.drawText(context, widthTela, 200, texto, "darkred", "center", "45px calibri regular");
  }
  function load(parte) {
    switch (parte.tipo) {
      case "line":
        pincel.drawLine(context, parte.xx, parte.xy, parte.yx, parte.yy, 'black', "round", 5);
        break;
      case "circle":
        pincel.drawCircle(context, parte.x, parte.y, parte.r, 'black', 5);
        break;
    }
  };
  function ativarParteBoneco() {
    const boneco = [
      { tipo: "circle", x: 205, y: 100, r: 30 }, 
      { tipo: "line", xx: 205, xy: 132, yx: 205, yy: 220 },
      { tipo: "line", xx: 170, xy: 180, yx: 203, yy: 140 },
      { tipo: "line", xx: 243, xy: 180, yx: 207, yy: 140 },
      { tipo: "line", xx: 230, xy: 280, yx: 205, yy: 220 },
      { tipo: "line", xx: 180, xy: 280, yx: 205, yy: 220 },
    ];
    if (parteAtiva === boneco.length - 1) {
      load(boneco[parteAtiva]);
      fimJogo(context, 'GAME OVER');
    } else {
      load(boneco[parteAtiva]);
      parteAtiva += 1;
    }
  }
  function criarTipo(tipo) {
    const texto = `DICA = ${tipo.toUpperCase()}`
    pincel.drawText(context, 500, 50, texto, '#0c6841', 'center', '30px calibri bold')
  }
  function criarLinhasLetra(palavra) {
    const palavraUpper = palavra.toUpperCase();
    let x = calcularCentro(palavra.length * 60);
    for (const i in palavraUpper) {
      const letra = palavraUpper[i];
      setarLetras(letra, { x: x + 40 / 2, y: 370 - 3, letra: letra, cor: "black", align: "center" });
      pincel.drawRect(context, x, 370, 40, 5, "black");
      x += 60;
    }
    return palavraUpper;
  }
  function calcularCentro(largura) {
    const widthTela = canvas.width / 2;
    return widthTela - largura / 2;
  }
  function setarLetras(key, value) {
    if (!(key in letraRestantes)) letraRestantes[key] = [];
    letraRestantes[key].push(value);
  }
  function ativarLetra(letraSelecionada) {
    if (emAndamento) {
      letraRestantes[letraSelecionada].forEach((item) => { pincel.drawText(context, item.x, item.y, item.letra, item.cor, item.align, '50px calibri regular') });
      delete letraRestantes[letraSelecionada];
      if (Object.keys(letraRestantes).length === 0) fimJogo(context, 'VOCÊ VENCEU');
    }
  }
  this.start = function(context) {
    const palavraSorted = sorteio();
    palavraSorteada = criarLinhasLetra(palavraSorted.palavra);
    criarTipo(palavraSorted.tipo);
    criarForca(context)
  }
  this.clear = function() {
    for(const letra in letraRestantes) { delete letraRestantes[letra] }
    emAndamento = true;
    parteAtiva = 0;
    letrasPress = "";
    palavraSorteada = ''
  }
  this.verificaLetra = function(letra) {
    const letraPress = letrasPress.includes(letra);
    const letranIn = palavraSorteada.includes(letra);
    if (emAndamento && !letraPress) {
      if (letranIn) {
        ativarLetra(letra);
      } else {
        ativarParteBoneco();
      }
    }
    letrasPress += letra;
  };
}
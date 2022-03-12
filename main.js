const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const pincel = new Pinceis();
const game = new contrutoresForca();
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
function Pinceis() {
  this.drawLine = function (context, xx, xy, yx, yy, cor, lineCap, larguraLinha) {
    context.strokeStyle = cor;
    context.beginPath();
    context.moveTo(xx, xy);
    context.lineTo(yx, yy);
    context.lineCap = lineCap;
    context.lineWidth = larguraLinha;
    context.stroke();
  };
  this.drawRect = function (context, x, y, w, h, cor) {
    context.fillStyle = cor;
    context.beginPath();
    context.fillRect(x, y, w, h);
  };
  this.drawCircle = function (context, x, y, r, cor, lineWidth) {
    context.strokeStyle = cor;
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.lineWidth = lineWidth;
    context.stroke();
  };
  this.drawText = function (context, x, y, texto, cor, align, font) {
    context.fillStyle = cor;
    context.beginPath();
    context.textAlign = align;
    context.font = font;
    context.fillText(texto, x, y);
    context.stroke();
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
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i in letras) {
    document
      .querySelector("#buttonsLetras")
      .appendChild(criarBotao(letras[i]));
  }
}
function contrutoresForca() {
  var emAndamento = true;
  let letrasPrecionads = "";
  criarForca(context);
  const palavraSorted = sorteio();
  const letrasPalavra = new Letras();
  const palavra = criarLinhasLetra(palavraSorted.palavra);
  const tipo = criarTipo(palavraSorted.tipo);
  const boneco = new CriarBoneco();
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
  function CriarBoneco() {
    let parteAtiva = 0;
    const boneco = [
      { tipo: "circle", x: 205, y: 100, r: 30 }, 
      { tipo: "line", xx: 205, xy: 132, yx: 205, yy: 220 },
      { tipo: "line", xx: 170, xy: 180, yx: 203, yy: 140 },
      { tipo: "line", xx: 243, xy: 180, yx: 207, yy: 140 },
      { tipo: "line", xx: 230, xy: 280, yx: 205, yy: 220 },
      { tipo: "line", xx: 180, xy: 280, yx: 205, yy: 220 },
    ];
    this.ativarParte = function () {
      if (parteAtiva === boneco.length - 1) {
        this.load(boneco[parteAtiva]);
        fimJogo(context, 'GAME OVER');
      } else {
        this.load(boneco[parteAtiva]);
        parteAtiva += 1;
      }
    };
    this.load = function (parte) {
      const cor = "#000000";
      const tipo = parte.tipo;
      switch (tipo) {
        case "line":
          pincel.drawLine(context, parte.xx, parte.xy, parte.yx, parte.yy, cor, "round", 5);
          break;
        case "circle":
          pincel.drawCircle(context, parte.x, parte.y, parte.r, cor, 5);
          break;
      }
    };
  }
  function calcularCentro(largura) {
    const widthTela = canvas.width / 2;
    return widthTela - largura / 2;
  }
  function Letras() {
    const letra = {};
    this.setLetras = function (key, value) {
      if (!(key in letra)) letra[key] = [];
      letra[key].push(value);
    };
    this.activeLetra = function (letraS) {
      if (emAndamento) {
        letra[letraS].forEach((item) => { pincel.drawText(context, item.x, item.y, item.letra, item.cor, item.align, '50px calibri regular') });
        delete letra[letraS];
        if (Object.keys(letra).length === 0) fimJogo(context, 'VOCÊ VENCEU');
      }
    };
  }
  function criarTipo(tipo) {
    const texto = `DICA = ${tipo.toUpperCase()}`
    pincel.drawText(context, 500, 50, texto, '#0c6841', 'center', '30px calibri bold')
  }
  function criarLinhasLetra(palavra) {
    const razao = 60;
    const palavraUpper = palavra.toUpperCase();
    let x = calcularCentro(palavra.length * razao);
    for (const i in palavraUpper) {
      const letra = palavraUpper[i];
      letrasPalavra.setLetras(letra, { x: x + 40 / 2, y: 370 - 3, letra: letra, cor: "black", align: "center" });
      pincel.drawRect(context, x, 370, 40, 5, "black");
      x += razao;
    }
    return palavraUpper;
  }
  this.verificaLetra = function (letra) {
    const letraPress = letrasPrecionads.includes(letra);
    const letranIn = palavra.includes(letra);
    if (emAndamento && !letraPress) {
      if (letranIn) {
        letrasPalavra.activeLetra(letra);
      } else {
        boneco.ativarParte();
      }
    }
    letrasPrecionads += letra;
  };
}
criarBotoes();
entradaUser();
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const screenGameOver = document.querySelector("#screenGameOver")
const buttonNovaPalavra = document.querySelector(".novaPalavra")
criarBotoes()
document.querySelectorAll(".buttons>button").forEach((button) => {
  button.onclick = function (click) {
    palavra.verificarLetra(click.target.value.toUpperCase())
    button.classList.add("press")
  }
})  
const parteForca = [
  {x:60, y: 60, width: 10, heigth: 250, cor: 'black'}, {x:60, y: 50, width: 140, heigth: 10, cor: 'black'},
  {x:20, y: 300, width: 90, heigth: 10, cor: 'black'}, {x:200, y: 50, width: 10, heigth: 20, cor: 'black'}
]
const parteBoneco = [
  { tipo: "circle", x: 205, y: 95, raio: 25, cor: 'black' }, 
  { tipo: "line", xx: 205, xy: 120, yx: 205, yy: 210, cor: 'black', larguraLinha: 6 },
  { tipo: "line", xx: 170, xy: 175, yx: 205, yy: 135, cor: 'black', larguraLinha: 6 },
  { tipo: "line", xx: 243, xy: 175, yx: 205, yy: 135, cor: 'black', larguraLinha: 6 },
  { tipo: "line", xx: 230, xy: 270, yx: 205, yy: 210, cor: 'black', larguraLinha: 6 },
  { tipo: "line", xx: 180, xy: 270, yx: 205, yy: 210, cor: 'black', larguraLinha: 6 },
]
let boneco
let palavra
class Boneco {
  #partes = []
  #indiceAtual = 0
  constructor(contexto, partesBoneco = {x, y, raio, xx, xy, yx, yy, cor, larguraLinha}) {
    this.ctx = contexto
    this.partesBoneco = partesBoneco
    this.load()
  }
  load() {
    this.partesBoneco.forEach((parte) => {
      let run
      switch (parte.tipo) {
        case 'line':
          run = new DrawLine(this.ctx, parte.xx, parte.xy, parte.yx, parte.yy, parte.cor, parte.larguraLinha)
          break
        case 'circle':
          run = new DrawArc(this.ctx, parte.x, parte.y, parte.raio, parte.cor)
          break
        default:
          break
      }
      this.#partes.push(run)
    })
  }
  ativar() {
    this.#partes[this.#indiceAtual].draw()
    this.#indiceAtual += 1
    if (this.#indiceAtual === this.#partes.length) {
      screenGameOver.style.display = 'flex'
      return false
    }
    else {
      return true
    }
  }
}
class Palavra {
  #letrasDigitadas = ''
  #letrasAcertadas = ''
  #palavra = ''
  #letras = []
  #andamento = true
  constructor(palavra) {
    this.tipo = palavra.tipo.toUpperCase()
    this.#palavra = palavra.palavra.toUpperCase()
    this.loadLines()
  } 
  loadLines() {
    let x = calcularCentro(this.#palavra.length * 60);
    for (let letraI of this.#palavra) {
      const linha = new DrawRect(ctx, x, 370, 40, 5, "black");
      const letra = new DrawText(ctx, x + 40 / 2, 369.4, letraI, 'darkred', 'center', '50px', 'bold')
      this.#letras.push(letra)
      linha.draw()
      x += 60;
    }
    const tipo = new DrawText(ctx, 500, 70, this.tipo, 'darkred', 'center', '30px', 'bold')
    tipo.draw()
  }
  #verificarLetraIn(letra) {
    if (this.#letrasDigitadas.indexOf(letra) + 1) {
      return false
    }
    else {
      this.#letrasDigitadas += letra
      return true
    }
  }
  #verificarVitoria() {
    if (this.#letrasAcertadas.length === this.#palavra.length) {
      buttonNovaPalavra.style.display = 'block'
      this.#andamento = false
      const tipo = new DrawText(ctx, 500, canvas.height / 2, 'Você acertou', 'darkblue', 'center', '50px', 'bold')
      tipo.draw()
    }
  }
  verificarLetra(letraSelecionada) {
    const contemLetra = this.#verificarLetraIn(letraSelecionada)
    if (this.#andamento && contemLetra) {
      let diferente = 0;
      [...this.#palavra].forEach((letra, indice) => {
        if (letraSelecionada === letra) { 
          this.#letras[indice].draw()
          this.#letrasAcertadas += letraSelecionada
          this.#verificarVitoria()
        }else {
          diferente += 1
        }
      })
      if (diferente === this.#palavra.length) {
        this.#andamento = boneco.ativar()
      }
    }
  }
}
function calcularCentro(largura) {
  const widthTela = canvas.width / 2;
  return widthTela - largura / 2;
}
function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  parteForca.forEach((parte) => {
    const forca = new DrawRect(ctx, parte.x, parte.y, parte.width, parte.heigth, parte.cor)
    forca.draw()
  })
  boneco = new Boneco(ctx, parteBoneco)
  palavra = new Palavra(sorteio())
}
start()
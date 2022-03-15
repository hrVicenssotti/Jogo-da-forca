const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const screenGameOver = document.querySelector("#screenGameOver")
criarBotoes()
document.querySelectorAll(".buttons>button").forEach((button) => {
  button.onclick = function (click) {
    palavra.verificarLetra(click.target.value.toUpperCase())
    button.classList.add("press")
  }
})
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
function calcularCentro(largura) {
  const widthTela = canvas.width / 2;
  return widthTela - largura / 2;
}
class Boneco {
  #partes = []
  #indiceAtual = 0
  constructor(contexto, partesBoneco = {x, y, raio, xx, xy, yx, yy, cor, larguraLinha}) {
    this.ctx = contexto
    this.partesBoneco = partesBoneco
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
  #palavra = ''
  #letras = []
  #andamento = true
  constructor(palavra) {
    this.tipo = palavra.tipo
    this.#palavra = palavra.palavra
  }
  loadLines() {
    let x = calcularCentro(this.#palavra.length * 60);
    for (let letraI of this.#palavra) {
      const linha = new DrawRect(ctx, x, 370, 40, 5, "black");
      const letra = new DrawText(ctx, x + 40 / 2, 370 - 3, letraI, 'black', 'center', '40px', 'bold')
      this.#letras.push(letra)
      linha.draw()
      x += 60;
    }
    const tipo = new DrawText(ctx, 500, 100, this.tipo, 'black', 'center', '30px', 'normal')
    tipo.draw()
  }
  verificarLetra(letraSelecionada) {
    if (this.#andamento) {
      let diferente = 0;
      [...this.#palavra].forEach((letra, indice) => {
        if (letraSelecionada.toUpperCase() === letra) { 
          this.#letras[indice].draw() 
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

parteForca.forEach((parte) => {
  const forca = new DrawRect(ctx, parte.x, parte.y, parte.width, parte.heigth, parte.cor)
  forca.draw()
})

const boneco = new Boneco(ctx, parteBoneco)
boneco.load()
const palavra = new Palavra(sorteio())
palavra.loadLines()

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
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
      return true
    }
    else {
      return false
    }
  }
}
class Palavra {
  #palavra = ''
  #letras = []
  constructor(palavra) {
    this.#palavra = palavra.toUpperCase()
  }
  #calcularCentro(largura) {
    const widthTela = canvas.width / 2;
    return widthTela - largura / 2;
  }
  loadLines() {
    let x = this.#calcularCentro(this.#palavra.length * 60);
    [...this.#palavra].forEach((letraI, indice) => {
      const letra = new DrawText(ctx, x + 40 / 2, 370 - 3, letraI, 'black', 'center', '40px', 'bold');
      const linha = new DrawRect(ctx, x, 370, 40, 5, "black");
      this.#letras.push(letra)
      linha.draw()
      x += 60;
    })
  }
  verificarLetra(letraSelecionada) {
    [...this.#palavra].forEach((letra, indice) => {
      const letraEntry = letraSelecionada.toUpperCase()
      if (letraEntry === letra) {
        this.#letras[indice].draw()
      }
    })
  }
}
const boneco = new Boneco(ctx, parteBoneco)
boneco.load()

const palavra = new Palavra('futuro')
palavra.loadLines()
// palavra.verificarLetra('U')
// palavra.verificarLetra('f')

parteForca.forEach((parte) => {
  const forca = new DrawRect(ctx, parte.x, parte.y, parte.width, parte.heigth, parte.cor)
  forca.draw()
})

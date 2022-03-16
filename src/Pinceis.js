class DrawText {
  constructor(contexto, x, y, texto, cor, align, fontSize, espessura) {
    this.ctx = contexto
    this.x = x
    this.y = y
    this.texto = texto
    this.cor = cor
    this.align = align
    this.font = `${espessura} ${fontSize} Verdana`
  }
  draw() {
    this.ctx.beginPath()
    this.ctx.textAlign = this.align
    this.ctx.font = this.font
    this.ctx.fillStyle = this.cor
    this.ctx.fillText(this.texto, this.x, this.y)
    this.ctx.fill()
  }
}
class DrawRect {
  constructor(context, x, y, width, heigth, cor) {
    this.ctx = context
    this.x = x
    this.y = y
    this.width = width
    this.heigth = heigth
    this.cor = cor
  }
  draw() {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.width, this.heigth)
    this.ctx.fillStyle = this.cor
    this.ctx.fill()
  }
}
class DrawArc {
  constructor(context, x, y, raio, cor) {
    this.ctx = context
    this.x = x
    this.y = y
    this.raio = raio
    this.cor = cor
  }
  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2)
    this.ctx.fillStyle = this.cor
    this.ctx.fill()
  }
}
class DrawLine {
  constructor(context, xx, xy, yx, yy, cor, larguraLinha) {
    this.ctx = context
    this.xx = xx
    this.xy = xy
    this.yx = yx
    this.yy = yy
    this.cor = cor
    this.lineWidth = larguraLinha
  }
  draw() {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.lineWidth
    this.ctx.moveTo(this.xx, this.xy)
    this.ctx.lineTo(this.yx, this.yy)
    this.ctx.strokeStyle = this.cor
    this.ctx.stroke()
  }
}
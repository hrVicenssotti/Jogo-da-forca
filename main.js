const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
document.querySelectorAll('.buttons>button').forEach(button => {
    button.onclick = function(click) {
        console.log(click.target)      
    }
})
document.onkeydown = function(click) {
    const tecla = click.key.toUpperCase()
    const botao = document.querySelector(`#Letra_${tecla}`)
    botao.click()
}
function drawLine(context, xx, xy, yx, yy, cor, lineCap, larguraLinha) {
    context.strokeStyle = cor
    context.beginPath()
    context.moveTo(xx, xy)
    context.lineTo(yx, yy)
    context.lineCap = lineCap
    context.lineWidth = larguraLinha
    context.stroke()
}
function drawRect(context, x, y, w, h, cor) {
    context.fillStyle = cor
    context.beginPath()
    context.fillRect(x, y, w, h)
}
function drawCircle(context, x, y, r, cor, lineWidth) {
    context.strokeStyle = cor
    context.beginPath()
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.lineWidth = lineWidth
    context.stroke()
}
function drawText(context, x, y, texto, cor, align) {
    context.strokeStyle = cor
    context.beginPath()
    context.textAlign = align
    context.font = '45px calibri regular'
    context.strokeText(texto, x, y)
    context.stroke()
}
function criarForca(context) {
    const cor = '#000066'
    drawRect(context, 60, 50, 10, 250, cor)
    drawRect(context, 60, 50, 140, 10, cor)
    drawRect(context, 20, 300, 90, 10, cor)
    drawRect(context, 200, 50, 10, 20, cor)
}
function gameOver(context) {
    const widthTela = canvas.width / 2
    drawText(context, widthTela, 200, 'Game Over', 'black', 'center')
}
function vitoria(context) {
    const widthTela = canvas.width / 2
    drawText(context, widthTela, 200, 'Acertou', 'black', 'center')
}
function criarBoneco() {
    let parteAtiva = 0
    const boneco = [
        {tipo: 'circle', x: 205, y: 100, r: 30},{tipo: 'line', xx: 205, xy: 132, yx: 205, yy: 220}, 
        {tipo: 'line', xx: 170, xy: 180, yx: 203, yy: 140}, {tipo: 'line', xx: 243, xy: 180, yx: 207, yy: 140}, 
        {tipo: 'line', xx: 230, xy: 280, yx: 205, yy: 220}, {tipo: 'line', xx: 180, xy: 280, yx: 205, yy: 220}
    ]
    this.ativarParte = function() {
        if (parteAtiva === boneco.length - 1) {
            this.load(boneco[parteAtiva])
            gameOver(context)
        }else {
            this.load(boneco[parteAtiva])
            parteAtiva += 1
        }
    }
    this.load = function(parte) {
        const cor = '#000000'
        const lineWidth = 5
        const tipo = parte.tipo
        switch (tipo) {
            case 'line':
                drawLine(context, parte.xx, parte.xy, parte.yx, parte.yy, cor, 'round', lineWidth)
                break
            case 'circle':
                drawCircle(context, parte.x, parte.y, parte.r, cor, lineWidth)
                break
        }
    }
}
function calcularCentro(largura) {
    const widthTela = canvas.width / 2
    return widthTela - largura / 2
}
function criarLinhasPalavra(palavra) {
    const razao = 60
    const larguraTotal = palavra.length * 60
    const y = 370
    const larguraLinha = 40
    let x = calcularCentro(larguraTotal)
    for (const i in palavra) {
        drawRect(context, x, y, larguraLinha, 5, 'black')
        x += razao
    }
}
criarForca(context)
criarLinhasPalavra('FUTURO')
const boneco = new criarBoneco()
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
function criarBotoes() {
    const buttons = document.querySelector('#buttonsLetras')
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    function criarBotao(letra) {
        const botao = document.createElement('button')
        const l = letra.toUpperCase()
        botao.value = l
        botao.innerHTML = l
        return botao
    }
    for (let i in letras) {
        const botao = criarBotao(letras[i])
        buttons.appendChild(botao)
    }
    document.querySelectorAll('.buttons>button').forEach(button => {
        button.onclick = function(click) {
            console.log(click.target)      
        }
    })
}
function drawRect(context, x, y, width, heigth, cor) {
    context.fillStyle = cor
    context.beginPath()
    context.fillRect(x, y, width, heigth)
}
function drawCircle(context, x, y, raio, cor, larguraLinha) {
    context.strokeStyle = cor
    context.beginPath()
    context.arc(x, y, raio, 0, 2 * Math.PI)
    context.lineWidth = larguraLinha
    context.stroke()
}
function drawLine(context, xx, xy, yx, yy, cor, larguraLinha, lineCap = 'butt') {
    context.strokeStyle = cor
    context.beginPath()
    context.moveTo(xx, xy)
    context.lineTo(yx, yy)
    context.lineCap = lineCap
    context.lineWidth = larguraLinha
    context.stroke()
}
function criarForca(context) {
    const cor = 'black'
    drawRect(context, 60, 50, 10, 300, cor)
    drawRect(context, 60, 50, 140, 10, cor)
    drawRect(context, 20, 350, 90, 10, cor)
    drawRect(context, 200, 50, 10, 20, cor)
}
function criarBoneco() {
    const corBoneco = 'black'
    drawCircle(context, 205, 100, 30, corBoneco, 3  )
    drawLine(context, 205, 132, 205, 230, corBoneco, 5, 'round')
    drawLine(context, 170, 180, 203, 140, corBoneco, 5, 'round')
    drawLine(context, 243, 180, 207, 140, corBoneco, 5, 'round')
    drawLine(context, 230, 300, 205, 230, corBoneco, 5, 'round')
    drawLine(context, 180, 300, 205, 230, corBoneco, 5, 'round')
}
criarBoneco()
criarForca(context)
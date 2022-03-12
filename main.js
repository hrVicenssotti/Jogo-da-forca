const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
document.querySelectorAll('.buttons>button').forEach(button => {
    button.onclick = function(click) {
        verificaLetra(click.target.value)  
    }
})
document.onkeydown = function(click) {
    const botao = document.querySelector(`#Letra_${click.key.toUpperCase()}`)
    if (botao) {
        botao.classList.add('active')
        botao.click()
    }
}
document.onkeyup = function(click) {
    const botao = document.querySelector(`#Letra_${click.key.toUpperCase()}`)
    if (botao) botao.classList.remove('active')
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
    context.fillStyle = cor
    context.beginPath()
    context.textAlign = align
    context.font = '45px calibri regular'
    context.fillText(texto, x, y)
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
    drawText(context, widthTela, 200, 'GAME OVER', 'darkred', 'center')
}
function vitoria(context) {
    const widthTela = canvas.width / 2
    drawText(context, widthTela, 200, 'ACERTOU', 'darkblue', 'center')
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
function letras() {
    const letra = {}
    let venceu = false
    function verificarVitoria() {
        if (Object.keys(letra).length === 0) {
            vitoria(context)
            venceu = true
            return true
        }else {
            return false
        }
    }
    this.setLetras = function(key, value) {
        if (!(key in letra)) letra[key] = []
        letra[key].push(value)
    }
    this.activeLetra = function(letraS) {
        if (!venceu) {
            letra[letraS].forEach(item => {
                drawText(context, item.x, item.y, item.letra, item.cor, item.align)
            })
            delete letra[letraS]
            return verificarVitoria()
        }
    }
}
function criarLinhasLetra(palavra) {
    const razao = 60
    const larguraTotal = palavra.length * 60
    const y = 370
    const larguraLinha = 40
    let x = calcularCentro(larguraTotal)
    for (const i in palavra) {
        const letra = palavra[i]
        letrasPalavra.setLetras(letra, {x: x + larguraLinha / 2, y: y - 3, letra, cor: 'black', align: 'center'})
        drawRect(context, x, y, larguraLinha, 5, 'black')
        x += razao
    }
    return palavra.toUpperCase()
}
function verificaLetra(letra) {
    let venceu = false
    const letranIn = palavra.includes(letra)
    if (!venceu) {
        if (letranIn) {
            venceu = letrasPalavra.activeLetra(letra)
        }else {
            boneco.ativarParte()
        }
    }
}

criarForca(context)
const letrasPalavra = new letras()
const palavra = criarLinhasLetra('PALAVRA')
const boneco = new criarBoneco()
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
function criarBotao(letra) {
    const botao = document.createElement('button')
    botao.value = letra
    botao.innerHTML = letra
    return botao
}
function criarBotoes() {
    const buttons = document.querySelector('#buttonsLetras')
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i in letras) {
        const botao = criarBotao(letras[i])
        buttons.appendChild(botao)
    }
}
document.querySelectorAll('.buttons>button').forEach(button => {
    button.onclick = function(click) {
        console.log(click.target)      
    }
})
const draw = {
    line: function(props) {
        props.context.strokeStyle = props.cor
        props.context.beginPath()
        props.context.moveTo(props.xx, props.xy)
        props.context.lineTo(props.yx, props.yy)
        props.context.lineCap = props.lineCap
        props.context.lineWidth = props.larguraLinha
        props.context.stroke()
    },
    rect: function(props) {
        props.context.fillStyle = props.cor
        props.context.beginPath()
        props.context.fillRect(props.x, props.y, props.w, props.h)
    },
    circle: function(props) {
        props.context.strokeStyle = props.cor
        props.context.beginPath()
        props.context.arc(props.x, props.y, props.r, 0, 2 * Math.PI)
        props.context.lineWidth = props.larguraLinha
        props.context.stroke()
    }
}
function loadArray(array) {
    array.forEach(item => {
        const run = draw[item.tipo]
        run(item)
    })
}
function criarForca(context) {
    const cor = 'black'
    const forca = [
        {context, tipo: 'rect', x: 60, y: 50, w: 10, h: 300, cor}, {context, tipo: 'rect', x: 60, y: 50, w: 140, h: 10, cor},
        {context, tipo: 'rect', x: 20, y: 350, w: 90, h: 10, cor}, {context, tipo: 'rect', x: 200, y: 50, w: 10, h: 20, cor}
    ]
    loadArray(forca)
}
function criarBoneco() {
    const corBoneco = 'black'
    const lineWidth = 5
    const boneco = [
        {tipo: 'circle', x: 205, y: 100, r: 30}, {tipo: 'line', xx: 205, xy: 132, yx: 205, yy: 230}, {tipo: 'line', xx: 170, xy: 180, yx: 203, yy: 140}, 
        {tipo: 'line', xx: 243, xy: 180, yx: 207, yy: 140}, {tipo: 'line', xx: 230, xy: 300, yx: 205, yy: 230}, {tipo: 'line', xx: 180, xy: 300, yx: 205, yy: 230}
    ]
    // loadArray(boneco)
}
criarBoneco()
criarForca(context)
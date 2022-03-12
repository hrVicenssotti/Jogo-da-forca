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
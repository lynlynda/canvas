window.onload = function() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  canvas.width = 1200 //document.body.clientWidth
  canvas.height = 800 //document.body.clientHeight
    // var skyStyle = context.createLinearGradient(0, 0, 0, canvas.height)
  var skyStyle = context.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, canvas.height)
  skyStyle.addColorStop(1.0, "black")
  skyStyle.addColorStop(0.0, "#035")

  var backdroundImage = new Image()
  backdroundImage.src = 'wall.jpeg'
  backdroundImage.onload = function() {
    var pattern = context.createPattern(backdroundImage, 'repeat')
      // context.fillStyle = pattern
      // context.fillRect(0, 0, canvas.width, canvas.height)
  }

  context.fillStyle = skyStyle
  context.fillRect(0, 0, canvas.width, canvas.height)



  for (var i = 0; i < 60; i++) {
    var r = Math.random() * 5 + 5
    var R = 2 * r
    var x = Math.random() * canvas.width
    var y = Math.random() * canvas.height * 0.65
    var rot = Math.random() * 360
    drawStar(context, x, y, r, rot)
  }

  fillMoon(context, 2, 900, 200, 100, 30)
  drawLand(context)

  context.font = 'bold 40px sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#fff'
  context.shadowColor = 'gray'
  context.shadowOffsetX = 20
  context.shadowOffsetY = 20
  context.shadowBlur = 5
  context.fillText('欢迎大家来这里', 200, 700)

}

function drawStar(cxt, x, y, r, rot) {
  cxt.save()
  cxt.translate(x, y)
  cxt.rotate(rot / 180 * Math.PI)
  cxt.scale(r, r)
  starPath(cxt)

  // cxt.lineJoin = 'miter'
  // cxt.miterLimit = 3 // cxt.lineCap
  cxt.fillStyle = '#fd3'
    // cxt.strokeStyle = "#fd5"
    // cxt.lineWidth = 3
  cxt.fill()
    // cxt.stroke()
  cxt.restore()



}

function starPath(cxt) {
  cxt.beginPath()
  for (i = 0; i < 5; i++) {
    cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI), -Math.sin((18 + i * 72) / 180 * Math.PI)),
      cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5, -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5)
  }
  cxt.closePath()
}


function fillMoon(cxt, d, x, y, R, rot, fillColor) {
  cxt.save()
  cxt.translate(x, y)
  cxt.rotate(rot * Math.PI / 180)
  cxt.scale(R, R)
  pathMoon(cxt, d)
  cxt.fillStyle = fillColor || '#fb5'
  cxt.fill()
  cxt.restore()
}

function pathMoon(cxt, d) {
  cxt.beginPath()
  cxt.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true)
  cxt.moveTo(0, -1)
  cxt.quadraticCurveTo(1.2, 0, 0, 1) //cxt.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d)
  cxt.closePath()
}

function dis(x1, y1, x2, y2) {

  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}


function drawLand(cxt) {
  cxt.save()
  cxt.beginPath()
  cxt.moveTo(0, 600)
  cxt.bezierCurveTo(540, 400, 660, 800, 1200, 600)
  cxt.lineTo(1200, 800)
  cxt.lineTo(0, 800)
  cxt.closePath()

  var landStyle = cxt.createLinearGradient(0, 800, 0, 0)
  landStyle.addColorStop(0.0, "#030")
  landStyle.addColorStop(1.0, "#580")
  cxt.fillStyle = landStyle
  cxt.fill()
  cxt.restore()

}
window.onload = function() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  canvas.width = 700
  canvas.height = 500

  context.shadowColor = 'gray'
  context.shadowOffsetX = 20
  context.shadowOffsetY = 20
  context.shadowBlur = 5
  context.fillStyle = "#058"
  context.fillRect(200, 200, canvas.width, canvas.height)

  context.beginPath()
  context.moveTo(100, 100)
  context.lineTo(400, 400)
  context.lineTo(100, 400)
  context.lineTo(100, 100)
  context.closePath()



  //1.画直线
  context.lineWidth = 5
  context.strokeStyle = "#006688"
  context.stroke() //用于绘制线条

  //填充颜色
  context.fillStyle = "rgb(0,100,25)"
  context.fill() //用于着色



  //假如要画第二个图形呢
  context.beginPath()
  context.moveTo(200, 100)
  context.lineTo(400, 300)
  context.closePath()

  context.strokeStyle = 'red'
  context.stroke()

  context.beginPath()
  context.arc(300, 100, 50, 0, 2 * Math.PI, false)
  context.closePath()

  context.fillStyle = '#367'
  context.fill()



}
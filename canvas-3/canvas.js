  var canvas = document.getElementById('canvas')
  var slider = document.getElementById('scale-range')
  var watermask = document.getElementById('watermask')
  var context = canvas.getContext('2d')
  var watermaskContext = watermask.getContext('2d')
  var image = new Image()
  window.onload = function() {
    canvas.width = 666
    canvas.height = 1000
    var scale = slider.defaultValue
    console.log(slider)
    image.src = 'pic.jpg'
    image.onload = function() {
      drawImageByScale(scale)
      slider.onmousemove = function() {
        scale = slider.value
        console.log(scale)
        drawImageByScale(scale)
      }
    }

    //watermask

    watermask.width = 600
    watermask.height = 100
    watermaskContext.font = 'bold 50px Arial'
    watermaskContext.lineWidth = '1'
    watermaskContext.fillStyle = 'rgba(255,255,255,.5)'
    watermaskContext.textBaseline = 'middle'
    watermaskContext.fillText('xudd&&golin', 20, 50)



  }

  function drawImageByScale(scale) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    var imageWidth = 666 * scale
    var imageHeight = 1000 * scale
      // var sx = (imageWidth - canvas.width) / 2
      // var sy = (imageHeight - canvas.height) / 2
      // context.drawImage(image, sx, sy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    var dx = (canvas.width - imageWidth) / 2
    var dy = (canvas.height - imageHeight) / 2
    context.drawImage(image, dx, dy, imageWidth, imageHeight)
    context.drawImage(watermask, canvas.width - watermask.width, canvas.height - watermask.height)

  }
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight; //没有单位px
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
var radius = 50;
var leftM = 0,
  topM = 0;
console.log(leftM + '--' + topM)


image.src = 'pic.jpg'
image.onload = function() {

  $("#blur-div").css({
    'width': canvasWidth + 'px',
    'height': canvasHeight + 'px'
  })
  $("#blur-image").css({
    'width': image.width + 'px',
    'height': image.height + 'px'

  });

  leftM = (image.width - canvas.width) / 2
  topM = (image.height - canvas.height) / 2
  console.log(leftM + '--' + topM)


  $("#blur-image").css({
    'top': String(-(topM - 200)) + 'px',
    'left': String(-leftM) + 'px'
  })

  //initCanvas()
}


function initCanvas() {
  var theleft = leftM < 0 ? -leftM : 0 //解决ipad下的bug
  var thetop = topM < 0 ? -topM : 0

  clippingRegion = {
    x: Math.random() * (canvas.width - 2 * radius - 2 * theleft) + radius + 2 * theleft,
    y: Math.random() * (canvas.height - 2 * radius - 2 * thetop) + radius + 2 * thetop,
    r: radius
  }
  draw(image, clippingRegion)


}

function setClippingRegion(clippingRegion) {
  context.beginPath()
  context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, 2 * Math.PI, false)
  context.clip()
}

function draw(image, clippingRegion) {
  context.clearRect(0, 0, canvasWidth, canvasHeight)
  context.save()
  setClippingRegion(clippingRegion)
  context.drawImage(image, Math.max(leftM, 0), Math.max(topM - 200, 0), Math.min(canvasWidth, image.width), Math.min(canvasHeight, image.height), leftM < 0 ? -leftM : 0, topM < 0 ? -topM : 0, Math.min(canvasWidth, image.width), Math.min(canvasHeight, image.height))
  context.restore()
}


function show() {

  var timer = setInterval(function() {
    clippingRegion.r += 20
    if (clippingRegion.r > 2 * Math.max(canvasHeight, canvasWidth)) {
      clearInterval(timer)
    }
    draw(image, clippingRegion)

  }, 20)


}


function reset() {
  initCanvas()


}

canvas.addEventListener('touchstart', function(e) {
  e.preventDefault()
})
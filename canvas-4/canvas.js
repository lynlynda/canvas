  var canvasWidth = Math.min(800, $(window).width() - 20)
  var canvasHeight = canvasWidth
  var isMouseDown = false
  var strokeColor = 'black'
  var lastLoc = {
    x: 0,
    y: 0
  }
  var lastTime = 0
  var lastLineWidth = -1
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')

  var xuxian = document.getElementById('xuxian')
  var xuxianContext = xuxian.getContext('2d')

  window.onload = function() {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    xuxian.width = 20
    xuxian.height = 20

    xuxianbg()
    var pat = context.createPattern(xuxian, "repeat")
    drawGrid(pat) //画米字格
    $('#controller').css('width', canvasWidth + 'px')
    $('#clear_btn').click(function(e) {
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      drawGrid(pat)

    })
    $('.color_btn').click(function(e) {
      $('.color_btn').removeClass('color_btn_selected')
      $(this).addClass('color_btn_selected')
      strokeColor = $(this).css('background-color')

    })

    function beginStroke(point) {
      isMouseDown = true
        // console.log('down')
      lastLoc = windowToCanvas(point.x, point.y)
      lastTime = new Date().getTime()

    }

    function endStroke() {
      isMouseDown = false
    }

    function moveStroke(point) {
      console.log('move')
      var curLoc = windowToCanvas(point.x, point.y)
      var curTime = new Date().getTime()
      var s = calcDistance(curLoc, lastLoc)
      var v = s / (curTime - lastTime)
      var lineWidth = calcLineWidth(v)
      context.beginPath()
      context.moveTo(lastLoc.x, lastLoc.y)
      context.lineTo(curLoc.x, curLoc.y)
      context.strokeStyle = strokeColor
      context.lineWidth = lineWidth
      context.lineJoin = 'round'
      context.lineCap = 'round'
      context.stroke()
      context.closePath()
      lastLoc = curLoc
      lastTime = curTime
      lastLineWidth = lineWidth

    }

    canvas.onmousedown = function(e) {

      e.preventDefault()
      beginStroke({
        x: e.clientX,
        y: e.clientY
      })



    }
    canvas.onmouseup = function(e) {
      e.preventDefault()
      endStroke()

      // var loc = windowToCanvas(e.clientX, e.clientY)

    }
    canvas.onmouseout = function(e) {
      e.preventDefault()
      endStroke()

    }
    canvas.onmousemove = function(e) {
      e.preventDefault()
      if (isMouseDown) {
        moveStroke({
          x: e.clientX,
          y: e.clientY
        })


      }

    }

    canvas.addEventListener('touchstart', function(e) {
      e.preventDefault()
      touch = e.touches[0]
      beginStroke({
        x: touch.pageX,
        y: touch.pageY
      })

    })
    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault()
      if (isMouseDown) {
        touch = e.touches[0]
        moveStroke({
          x: touch.pageX,
          y: touch.pageY
        })

      }
    })
    canvas.addEventListener('touchend', function(e) {
      e.preventDefault()
      endStroke()

    })



  }
  var maxLineWidth = 30
  var minLineWidth = 1
  var maxStorkeV = 10
  var minStorkeV = 0.1

  function calcLineWidth(v) {
    var resultLineWidth
    if (v <= minStorkeV) {
      resultLineWidth = maxLineWidth

    } else if (v >= maxStorkeV) {
      resultLineWidth = minLineWidth

    } else {
      resultLineWidth = maxLineWidth - (v - minStorkeV) / (maxStorkeV - minStorkeV) * (maxLineWidth - minLineWidth)
    }
    if (lastLineWidth == -1)
      return resultLineWidth
    return lastLineWidth * 2 / 3 + resultLineWidth / 3

  }

  function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
  }

  function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect()
    return {
      x: Math.round(x - bbox.left),
      y: Math.round(y - bbox.top)
    }
  }

  function xuxianbg() {
    xuxianContext.save()
    xuxianContext.lineWidth = 1
    xuxianContext.strokeStyle = 'rgb(230,11,9)'
    xuxianContext.beginPath()
    xuxianContext.moveTo(0, 1)
    xuxianContext.lineTo(0, xuxian.height / 2)
    xuxianContext.moveTo(1, 0)
    xuxianContext.lineTo(xuxian.width / 2, 0)
    xuxianContext.moveTo(xuxian.width / 4, xuxian.height / 4)
    xuxianContext.lineTo(xuxian.width * 3 / 4, xuxian.height * 3 / 4)
    xuxianContext.moveTo(xuxian.width * 3 / 4, xuxian.height / 4)
    xuxianContext.lineTo(xuxian.width / 4, xuxian.height * 3 / 4)

    // context.closePath()
    xuxianContext.stroke()
    xuxianContext.restore()
  }

  function drawGrid(pat) {
    context.save()
    context.strokeStyle = 'rgb(230,11,9)'
    context.beginPath()
    context.moveTo(3, 3)
    context.lineTo(canvasWidth - 3, 3)
    context.lineTo(canvasWidth - 3, canvasHeight - 3)
    context.lineTo(3, canvasHeight - 3)
    context.closePath()
    context.lineWidth = 6
    context.stroke()
    context.restore()


    context.save()
    context.beginPath()
    context.strokeStyle = pat
    context.moveTo(0, 0)
    context.lineTo(canvasWidth, canvasHeight)

    context.moveTo(canvasWidth, 0)
    context.lineTo(0, canvasHeight)

    context.moveTo(canvasWidth / 2, 0)
    context.lineTo(canvasWidth / 2, canvasHeight)

    context.moveTo(0, canvasHeight / 2)
    context.lineTo(canvasWidth, canvasHeight / 2)

    context.lineWidth = 1
    context.stroke()

    context.restore()


  }
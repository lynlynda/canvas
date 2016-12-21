//var endTime = new Date(2016, 8, 9, 23, 47, 52)
var curShowTimeSeconds = 0;
var balls = [];
const colors = ['#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#99cc00', '#669900', '#ffbb33', '#ff8800', '#ff4444']


window.onload = function() {

  WINDOW_WIDTH = document.body.clientWidth
  WINDOW_HEIGHT = document.body.clientHeight
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)
  console.log(document.body.clientHeight)
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTimeSeconds()

  setInterval(function() {
    render(context)
    update()

  }, 50)

}

function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds()

  var nextHours = parseInt(nextShowTimeSeconds / 3600)
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
  var nextSeconds = parseInt(nextShowTimeSeconds % 60)

  var curHours = parseInt(curShowTimeSeconds / 3600)
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
  var curSeconds = parseInt(curShowTimeSeconds % 60)

  //console.log(curSeconds + '-----' + nextSeconds)

  if (nextSeconds != curSeconds) {

    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10))
    }

    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10))
    }
    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10))
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10))
    }
    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10))
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10))
    }
    curShowTimeSeconds = nextShowTimeSeconds

  }
  updateBalls()



}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x = balls[i].x + balls[i].vx;
    balls[i].y = balls[i].y + balls[i].vy;
    balls[i].vy += balls[i].g
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75
    }


  }
  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[cnt++] = balls[i]

    }
  }
  while (balls.length > cnt) {
    balls.pop()
  }


}

function addBalls(x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        var aball = {
            x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
            y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
            g: 1.5 + Math.random(),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000) + 1) * 4,
            vy: -5 * Math.random(),
            color: colors[Math.floor(Math.random() * colors.length)]


          }
          //console.log(aball.vx)
        balls.push(aball)

      }



    }
  }
}


function render(cxt) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  var hours = parseInt(curShowTimeSeconds / 3600)
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
  var seconds = parseInt(curShowTimeSeconds % 60)

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt)
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt)
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt)
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt)

  for (var i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color
    cxt.beginPath()
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
    cxt.closePath()
    cxt.fill()
  }

}

function renderDigit(x, y, num, cxt) {
  // console.log(digit[num])

  cxt.fillStyle = 'rgb(0,102,153)';
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      //console.log(digit[num][i][j])
      if (digit[num][i][j] == 1) {
        // alert(digit[num][i][j])
        cxt.beginPath()
        cxt.arc(x + 2 * j * (RADIUS + 1) + (RADIUS + 1), y + (2 * i + 1) * (RADIUS + 1), RADIUS, 0, 2 * Math.PI, false)
        cxt.closePath()

        cxt.fill()
      }
    }
  }
}


function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds()
    //ret = Math.round(ret / 1000)

  return ret > 0 ? ret : 0
}
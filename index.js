var video = document.querySelector('#videoElement'),
    time_dump = document.querySelector('#elapsed_time'),
    glasses = new Image(),
    canvas = document.querySelector('#output'),
    ctx = canvas.getContext('2d');

glasses.src = 'glasses.png';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if(navigator.getUserMedia) {
  navigator.getUserMedia({video:true}, handleVideo, handleError)
}

function handleVideo(stream) {
  video.src = window.URL.createObjectURL(stream)
}

function handleError(e) {
    alert(e)
}

function html5glasses() {
  var elapsed_time = (new Date()).getTime()

  ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height)
  var comp = ccv.detect_objects({'canvas': (ccv.pre(canvas)), 'cascade': cascade, 'interval': 5, 'min_neighbors': 1})
  time_dump.innerHTML = "Process time: " + ((new Date()).getTime() - elapsed_time).toString() + "ms"
  for (var i = 0; i < comp.length; i++) {
    ctx.drawImage(glasses, comp[i].x, comp[i].y, comp[i].width, comp[i].height)
  }
}

video.addEventListener('play', function() {
    vidInterval = setInterval(html5glasses, 200)
})

video.addEventListener('ended', function() {
    clearInterval(vidInterval)
    time_dump.innerHTML = "finished"
})

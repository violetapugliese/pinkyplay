var clear = document.getElementById("clear");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var cw = (canvas.width = 310), cx = cw / 2;
var ch = (canvas.height = 370), cy = ch / 2;
ctx.strokeStyle = "#4cf005";
var dibujando = false;
var m = { x: 0, y: 0 };

var eventsRy = [{event:"mousedown",func:"onStart"}, 
                {event:"touchstart",func:"onStart"},
                {event:"mousemove",func:"onMove"},
                {event:"touchmove",func:"onMove"},
                {event:"mouseup",func:"onEnd"},
                {event:"touchend",func:"onEnd"},
                {event:"mouseout",func:"onEnd"}
               ];

function onStart(evt) {
  m = oMousePos(canvas, evt);
  ctx.beginPath();
  dibujando = true;
}

function onMove(evt) {
  if (dibujando) {
    ctx.moveTo(m.x, m.y);
    m = oMousePos(canvas, evt);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();

  }
}

function onEnd(evt) {
  dibujando = false;
}



function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  var e = evt.touches ? evt.touches[0] : evt;

    return {
      x: Math.round(e.clientX - ClientRect.left),
      y: Math.round(e.clientY - ClientRect.top)
    };
}

for (var i = 0; i < eventsRy.length; i++) {
  (function(i) {
      var e = eventsRy[i].event;
      var f = eventsRy[i].func;console.log(f);
      canvas.addEventListener(e, function(evt) {
            evt.preventDefault();
            window[f](evt);
            return;
        },false);
  })(i);
  
}

clear.addEventListener(
  "click",
  function() {
    ctx.clearRect(0, 0, cw, ch);
  },
  false
);





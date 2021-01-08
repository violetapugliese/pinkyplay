
var limpiar = document.getElementById("limpiar");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 300,
  cx = cw / 2;
var ch = canvas.height = 300,
  cy = ch / 2;

var dibujar = false;
var factorDeAlisamiento = 5;
var Trazados = [];
var puntos = [];
ctx.lineJoin = "round";
ctx.strokeStyle = '#4cf005'
var canvaDentro = function setup() {
  createCanvas(100, 100);
  background(102);
}

var canvaDEntroDentro = function draw() {
  stroke(255);
  strokeWeight(3);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}


limpiar.addEventListener('click', function(evt) {
  dibujar = false;
  ctx.clearRect(0, 0, cw, ch);
  Trazados.length = 0;
  puntos.length = 0;
}, false);


canvas.addEventListener('mousedown', function(evt) {
  dibujar = true;
  //ctx.clearRect(0, 0, cw, ch);
  puntos.length = 0;
  ctx.beginPath();
  canvaDentro();
  canvaDEntroDentro();
  

}, false);

canvas.addEventListener('mouseup', function(evt) {
  redibujarTrazados();
}, false);

canvas.addEventListener("mouseout", function(evt) {
  redibujarTrazados();
}, false);

canvas.addEventListener("mousemove", function(evt) {
  if (dibujar) {
    var m = oMousePos(canvas, evt);
    puntos.push(m);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
  }
}, false);

canvas.addEventListener("touchstart", function(evt) {
  dibujar = true;
  //ctx.clearRect(0, 0, cw, ch);
  puntos.length = 0;
  ctx.beginPath();
  canvaDentro();
  canvaDEntroDentro();
  

}, false);

canvas.addEventListener("touchend", function(evt) {
  redibujarTrazados();
}, false);

canvas.addEventListener("touchmove", function(evt) {
  if (dibujar) {
    var m = oMousePos(canvas, evt);
    puntos.push(m);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
  }
}, false);


function reducirArray(n,elArray) {
  var nuevoArray = [];
  nuevoArray[0] = elArray[0];
  for (var i = 0; i < elArray.length; i++) {
    if (i % n == 0) {
      nuevoArray[nuevoArray.length] = elArray[i];
    }
  }
  nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
  Trazados.push(nuevoArray);
}

function calcularPuntoDeControl(ry, a, b) {
  var pc = {}
  pc.x = (ry[a].x + ry[b].x) / 2;
  pc.y = (ry[a].y + ry[b].y) / 2;
  return pc;
}

function alisarTrazado(ry) {
  if (ry.length > 1) {
    var ultimoPunto = ry.length - 1;
    ctx.beginPath();
    ctx.moveTo(ry[0].x, ry[0].y);
    for (i = 1; i < ry.length - 2; i++) {
      var pc = calcularPuntoDeControl(ry, i, i + 1);
      ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);
    }
    ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
    ctx.stroke();
  }
}


function redibujarTrazados(){
  dibujar = false;
  ctx.clearRect(0, 0, cw, ch);
  reducirArray(factorDeAlisamiento,puntos);
  for(var i = 0; i < Trazados.length; i++)
  alisarTrazado(Trazados[i]);
}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}
// }
// //======================================================================
// // VARIABLES
// //======================================================================
// let limpiar = document.getElementById("limpiar");
// let miCanvas = document.querySelector('#canvas');
// let lineas = [];
// let correccionX = 0;
// let correccionY = 0;
// let pintarLinea = false;
// // Marca el nuevo punto
// let nuevaPosicionX = 0;
// let nuevaPosicionY = 0;

// let posicion = miCanvas.getBoundingClientRect()
// correccionX = posicion.x;
// correccionY = posicion.y;

// miCanvas.width = 500;
// miCanvas.height = 500;

// //======================================================================
// // FUNCIONES
// //======================================================================

// limpiar.addEventListener('click', function(evt) {
//   pintarLinea = false;
//   ctx.guardarLinea();
//   let nuevaPosicionX = 0;
//   let nuevaPosicionY = 0;
// }, false);
// /**
//  * Funcion que empieza a dibujar la linea
//  */
// function empezarDibujo() {
//     pintarLinea = true;
//     lineas.push([]);
// };

// /**
//  * Funcion que guarda la posicion de la nueva línea
//  */
// function guardarLinea() {
//     lineas[lineas.length - 1].push({
//         x: nuevaPosicionX,
//         y: nuevaPosicionY
//     });
// }

// /**
//  * Funcion dibuja la linea
//  */
// function dibujarLinea(event) {
//     event.preventDefault();
//     if (pintarLinea) {
//         let ctx = miCanvas.getContext('2d')
//         // Estilos de linea
//         ctx.lineJoin = ctx.lineCap = 'round';
//         ctx.lineWidth = 10;
//         // Color de la linea
//         ctx.strokeStyle = '#fff';
//         // Marca el nuevo punto
//         if (event.changedTouches == undefined) {
//             // Versión ratón
//             nuevaPosicionX = event.layerX;
//             nuevaPosicionY = event.layerY;
//         } else {
//             // Versión touch, pantalla tactil
//             nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
//             nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
//         }
//         // Guarda la linea
//         guardarLinea();
//         // Redibuja todas las lineas guardadas
//         ctx.beginPath();
//         lineas.forEach(function (segmento) {
//             ctx.moveTo(segmento[0].x, segmento[0].y);
//             segmento.forEach(function (punto, index) {
//                 ctx.lineTo(punto.x, punto.y);
//             });
//         });
//         ctx.stroke();
//     }
// }

// /**
//  * Funcion que deja de dibujar la linea
//  */
// function pararDibujar () {
//     pintarLinea = false;
//     guardarLinea();
// }

// //======================================================================
// // EVENTOS
// //======================================================================

// // Eventos raton
// miCanvas.addEventListener('mousedown', empezarDibujo, false);
// miCanvas.addEventListener('mousemove', dibujarLinea, false);
// miCanvas.addEventListener('mouseup', pararDibujar, false);

// // Eventos pantallas táctiles
// miCanvas.addEventListener('touchstart', empezarDibujo, false);
// miCanvas.addEventListener('touchmove', dibujarLinea, false)
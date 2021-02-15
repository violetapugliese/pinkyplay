var miLienzo = document.getElementById("canvas");
var cw = (canvas.width = 310), cx = cw / 2;
var ch = (canvas.height = 370), cy = ch / 2;
// var lapiz = miLienzo.getContext("2d");
// lapiz.beginPath();  
// lapiz.arc(30,150,8, 0, 2*Math.PI);
// lapiz.fill();
// lapiz.stroke();

var p0 = miLienzo.getContext("2d");
p0.beginPath();  
p0.arc(84,332,8, 0, 2*Math.PI);
p0.fillStyle = "#6ab150"
p0.fill();
p0.stroke();
// //options
const piedra = 'piedra';
const papel = 'papel';
const tijera = 'tijera';
var userScore = 0;
var cpuScore = 0;
const vaciarOpciones = function () {
    document.getElementById('options').style.display="flex";
    document.getElementById('piedraImg').style.display="none"
    document.getElementById('papelImg').style.display="none"
    document.getElementById('tijeraImg').style.display="none"
    document.getElementById('piedraAlienImg').style.display="none"
    document.getElementById('papelAlienImg').style.display="none"
    document.getElementById('tijeraAlienImg').style.display="none"
    document.getElementById('btnSeguimos').style.display="none";
};
const btnSeguimos = document.getElementById('btnSeguimos');

class Juego {
    constructor(choice){
        this.inicializar(choice);
    }
    inicializar(choice) {
        this.convertirOpcionANumero(choice);
        this.cpuEligioAleatorio = new Array(1).fill(0).map(n => Math.floor(Math.random() * 3));
        const cpuEligio = this.cpuEligioAleatorio.shift();
        this.convertirNumeroAOpcion(cpuEligio);
        const userEligio = this.convertirOpcionANumero(choice);
        const cpuChoice = this.convertirNumeroAOpcion(cpuEligio);
        this.mostrarImg(choice);
        this.mostrarImgCpu(cpuChoice);
        this.partida(userEligio, cpuEligio);
        this.siguientePartida(choice, cpuChoice);
        
    }

    convertirNumeroAOpcion(numero) {
        switch(numero) {
            case 0:
                return 'piedra'
            case 1:
                return 'papel'
            case 2:
                return 'tijera'
        }
    }
    convertirOpcionANumero(choice) {
        switch(choice) {
            case 'piedra':
                return 0
            case 'papel':
                return 1
            case 'tijera':
                return 2
        }
    }
    mostrarImg(choice) {
       if (document.getElementById(`${choice}Img`).style.display="none"){
        document.getElementById(`${choice}Img`).style.display="block"
       } else { document.getElementById(`${choice}Img`).style.display="none"

       }
    }
    mostrarImgCpu(cpuChoice) {
        document.getElementById(`${cpuChoice}AlienImg`).style.display="block";
   }
   partida(userEligio, cpuEligio) {
    if (userEligio == 0){
        if (cpuEligio === 0){
            document.getElementById("veredictPpot").innerHTML = "Empate";
        } else if (cpuEligio === 1){
            document.getElementById("veredictPpot").innerHTML = "Ganó Alien";
            this.cpuGana();
        } else if (cpuEligio === 2) {
            document.getElementById("veredictPpot").innerHTML = "Ganaste!";
            this.userGana();
        }
    }
    else if (userEligio == 1){
        if (cpuEligio === 0){
            document.getElementById("veredictPpot").innerHTML = "ganaste!";
            this.userGana();
        } else if (cpuEligio === 1) {
            document.getElementById("veredictPpot").innerHTML = "Empate";
        } else if (cpuEligio === 2) {
            document.getElementById("veredictPpot").innerHTML = "ganó Alien";
            this.cpuGana();
        }
    }
    else if (userEligio == 2){
        if (cpuEligio === 0){
            document.getElementById("veredictPpot").innerHTML = "Ganó Alien";
            this.cpuGana();
        } else if (cpuEligio === 1) {
            document.getElementById("veredictPpot").innerHTML = "Ganaste!";
            this.userGana();
        } else if (cpuEligio === 2) {
            document.getElementById("veredictPpot").innerHTML = "Empate";
        }
    }
  }
    userGana() {
        if (userScore < 3 ){
            userScore++
            document.getElementById("scoreUserNumber").innerHTML = userScore;          
            if (userScore === 3) {
                console.log("ganaste");
                this.desbloquearNivelBtn();
            }
        } 
    }
    desbloquearNivelBtn() {
        document.getElementById('btnEmpezarSimon').innerHTML = "Jugar";
        document.getElementById('btnEmpezarSimon').addEventListener('click', this.desbloquearNivel);

      }
      desbloquearNivel() {
        document.getElementById('block-gameSimon').style.display="none";
      }
    cpuGana() {
        if (cpuScore < 3 ){
            cpuScore++
            document.getElementById("scoreCpuNumber").innerHTML = cpuScore;          
        if (cpuScore === 3) {
            console.log("gano alien")
            }
        } 
    }
    siguientePartida(choice) {
        this.ocultarOpciones();
        this.btnSeguimos(choice);
   }
    ocultarOpciones() {
        document.getElementById('options').style.display="none";
    }
    btnSeguimos() {
        document.getElementById('btnSeguimos').style.display="block";
        document.getElementById('btnSeguimos').addEventListener('click', this.comenzarNuevaPartida);   
    }
    comenzarNuevaPartida() {
      vaciarOpciones();
    }
    reset() {
        document.getElementById('resetPpot').addEventListener('click', this.resetScore);
    }
}
function empiezaJuego(choice) {
    window.juego = new Juego(choice); 
}
function reset() {
    userScore = 0;
    cpuScore = 0;
    document.getElementById("scoreUserNumber").innerHTML = userScore;          
    document.getElementById("scoreCpuNumber").innerHTML = cpuScore;          
    vaciarOpciones();
}



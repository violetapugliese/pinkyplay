    
    const celeste = document.getElementById('celeste');
    const violeta = document.getElementById('violeta');
    const naranja= document.getElementById('naranja');
    const verde = document.getElementById('verde');
    const btnEmpezar = document.getElementById('btnEmpezar');
    const ULTIMO_NIVEL = 3;
    const level = document.getElementById('levelSimon');

      

    class JuegoSimon {
        constructor(){
            this.inicializar = this.inicializar.bind(this)
            this.inicializar();
            this.generarSecuencia();
            setTimeout(this.siguienteNivel, 500);
      }
        inicializar (){
          this.siguienteNivel = this.siguienteNivel.bind(this);
          this.elegirColor = this.elegirColor.bind(this);
          this.nivel = 1
          document.getElementById('levelSimon').innerHTML = `Nivel: ${this.nivel}`;
          this.colores = {
             celeste,
             violeta,
             naranja,
             verde
          } 
        }
        generarSecuencia() {
          this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
          console.log(this.secuencia)
        }
        siguienteNivel() {
            this.subnivel = 0;
            this.iluminarSecuencia();
            this.agragarEventosClick();
        }
        transformarNumeroAColor(numero) {
            switch (numero) {
                case 0: 
                    return 'celeste'
                case 1: 
                    return 'violeta'
                case 2: 
                    return 'naranja'
                case 3: 
                    return 'verde'                    

            }
        }
        transformarColorANumero(color) {
            switch (color) {
                case 'celeste': 
                    return 0
                case 'violeta': 
                    return 1
                case 'naranja': 
                    return 2
                case 'verde': 
                    return   3                  

            }
        }

        iluminarSecuencia(){
            for (let i = 0; i < this.nivel; i++) {
              const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() =>  this.iluminarColor(color), 800 * i);
            }
        }
        
        iluminarColor(color){
          document.getElementById(`${color}`).classList.add('light')
          setTimeout(() => this.apagarColor(color), 350)
        }
      
        apagarColor(color){
          document.getElementById(`${color}`).classList.remove('light')
        }
        agragarEventosClick() {
          document.getElementById('celeste').addEventListener('click', this.elegirColor);
          document.getElementById('verde').addEventListener('click', this.elegirColor);
          document.getElementById('violeta').addEventListener('click', this.elegirColor);
          document.getElementById('naranja').addEventListener('click', this.elegirColor);
        }

        eliminarEventosClick() {
          document.getElementById('celeste').removeEventListener('click', this.elegirColor);
          document.getElementById('verde').removeEventListener('click', this.elegirColor);
          document.getElementById('violeta').removeEventListener('click', this.elegirColor);
          document.getElementById('naranja').removeEventListener('click', this.elegirColor);
        }

        elegirColor(ev) {
          const nombreColor = ev.target.dataset.color;
          const numeroColor = this.transformarColorANumero(nombreColor);
          this.iluminarColor(nombreColor);
          if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
              this.nivel++;
              document.getElementById('levelSimon').innerHTML = `Nivel: ${this.nivel}`;
              this.eliminarEventosClick();
              if (this.nivel === (ULTIMO_NIVEL +1)) {
                document.getElementById('levelSimon').innerHTML = "Ganaste!";
                this.ganoElJuego()
              } else {
                setTimeout(this.siguienteNivel, 1500) ;
              }

            }
          } else {
            this.perdioElJuego()
          }
        }
       
        ganoElJuego(){
          this.desbloquearNivelBtn();
          console.log("ganaste");
          // this.inicializar();
          
        }
        desbloquearNivelBtn() {
          document.getElementById('flechaNextSimon').style.visibility = 'visible';

        }
        desbloquearNivel() {
          document.getElementById('block-gamePoints').style.display="none";
        }
        perdioElJuego(){
            console.log("perdiste")
            this.eliminarEventosClick();
            this.inicializar()
               
        }
      }
      function empiezaJuegoSimon() {
        window.juego = new JuegoSimon();
      }
      function resetSimon() {
        empiezaJuegoSimon()
      }
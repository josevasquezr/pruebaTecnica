window.onload = function() {
	window.oncontextmenu = inhabilitar;

	function inhabilitar(){
		return false;
	}

	var colores = new Array("green", "blue", "red", "gray", "yellow", "black");

	function aleatorio(){
		var numero = Math.floor(Math.random()*10);
		if(numero < colores.length){
			return numero;
		}else{
			aleatorio();
		}
	}


	function calcularXY(x, y){   //Prototipo para el calculo de coordenadas
		this.x = x;
		this.y = y;
		this.coorX = function(){
			return this.x - 30;
		}

		this.coorY = function(){
			return this.y - 30;
		}
	}							//--------------------------------------

	function clickBody(event){
		var newCirculo = document.createElement("div");
		newCirculo.classList.add("circulo");
		var coordenadas = new calcularXY(event.pageX, event.pageY);
		newCirculo.style.transform = "translate(" + coordenadas.coorX() + "px, " + coordenadas.coorY() + "px" + ")"; //desplazando nuevo circulo
		newCirculo.style.backgroundColor = colores[aleatorio()];

		function clickCirculo(e){
			if(newCirculo.innerHTML == ""){		//controlando error de doble click; si el circulo ya tiene contenido es porque ya se ejutó el evento  
				var numero = 5;
				newCirculo.innerHTML = numero;

				var timer = setInterval(cuenta, 1000);
				
				function cuenta(){
					numero--;
					newCirculo.innerHTML = numero;
					if(numero == 0){
						clearInterval(timer);
						newCirculo.parentNode.removeChild(newCirculo);
					}
				}
			}

			e.stopPropagation();
		}

		
		function rightClickCirculo(e){
			var menu = document.getElementsByClassName("contextMenu")[0];
			menu.style.display = "block";
			menu.style.transform = "translate(" + e.pageX + "px, " + e.pageY + "px" + ")";
			e.stopPropagation();
			e.preventDefault();
		}

		newCirculo.addEventListener("click", clickCirculo);
		newCirculo.addEventListener("contextmenu", rightClickCirculo);

		this.appendChild(newCirculo);
	}

	var body = document.getElementsByTagName("body")[0];
	body.addEventListener("click", clickBody);

}
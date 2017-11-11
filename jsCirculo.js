window.onload = function() {
	window.addEventListener("contextmenu", rightClickBody);

	function rightClickBody(e){
		if(body.children.length > 2){
			var menu = document.getElementsByClassName("contextMenu")[0];
			menu.style.display = "block";
			menu.style.transform = "translate(" + e.pageX + "px, " + e.pageY + "px" + ")";
			cambiarContextMenu();
		}
		e.stopPropagation();
		e.preventDefault();
	}

	function cambiarContextMenu(tipo = 0, newCirculo = new Object()){ //si el tipo es 0 = body, 1 = circulo
		var menu = document.getElementsByClassName("contextMenu")[0];
		menu.innerHTML = "";
		var enlaceGravedad = document.createElement("a");
		var enlaceEliminar = document.createElement("a");

		if(tipo == 0){
			enlaceEliminar.innerHTML = "Eliminar todo";

			enlaceEliminar.addEventListener("click", function(event){
				var circulos = document.getElementsByClassName("circulo");
				var numero = 5;
				for(circulo in circulos){
					circulos[circulo].innerHTML = numero;
				}

				var timer = setInterval(cuenta, 1000);
				function cuenta(){
					numero--;
					for (circulo in circulos) {
						circulos[circulo].innerHTML = numero;
					}

					if(numero <= 0){
						clearInterval(timer);
						while(document.getElementsByClassName("circulo").length > 0){
							body.removeChild(body.lastElementChild);
						}
					}
				}
					
				event.stopPropagation();
				event.preventDefault();
				enlaceEliminar.parentNode.style.display = "none";
			});

			enlaceGravedad.innerHTML = "Gravedad a todo";

			enlaceGravedad.addEventListener("click", function(event){
				var circulos = document.getElementsByClassName("circulo");
				for(var i = 0; i< circulos.length; i++){
					circulos[i].classList.add("efectoGravedad");
				}

				event.stopPropagation();
				event.preventDefault();
				enlaceGravedad.parentNode.style.display = "none";
			});	
		

		}else{

			enlaceEliminar.innerHTML = "Eliminar Circulo";

			enlaceEliminar.addEventListener("click", function(event){
				if(newCirculo.innerHTML == ""){		//controlando error de doble click; si el circulo ya tiene contenido es porque ya se ejutó el evento  
					document.getElementsByClassName("contextMenu")[0].style.display = "none";
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

				event.stopPropagation();
				event.preventDefault();
				enlaceEliminar.parentNode.style.display = "none";
			});

			enlaceGravedad.innerHTML = "Aplicar Gravedad";

			enlaceGravedad.addEventListener("click", function(event){
				if(newCirculo.style.bottom !== 0){
					newCirculo.classList.add("efectoGravedad");
				}

				event.stopPropagation();
				event.preventDefault();
				enlaceGravedad.parentNode.style.display = "none";
			});	

		}

		enlaceEliminar.classList.add("linkContextMenu");
		enlaceGravedad.classList.add("linkContextMenu");
		menu.appendChild(enlaceEliminar);
		menu.appendChild(enlaceGravedad);
	}


	var colores = new Array("green", "blue", "red", "gray", "yellow", "black");

	function aleatorio(){
		return Math.floor(Math.random()*colores.length);
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
		document.getElementsByClassName("contextMenu")[0].style.display = "none";

		var newCirculo = document.createElement("div");
		newCirculo.classList.add("circulo");
		var coordenadas = new calcularXY(event.pageX, event.pageY);
		
		// newCirculo.style.transform = "translate(" + coordenadas.coorX() + "px, " + coordenadas.coorY() + "px" + ")"; //desplazando nuevo circulo
		newCirculo.style.left = coordenadas.coorX() + "px";
		newCirculo.style.top = coordenadas.coorY() + "px";

		newCirculo.style.backgroundColor = colores[aleatorio()];

		function clickCirculo(e){

			var menu = document.getElementsByClassName("contextMenu")[0];
			menu.style.display = "block";
			menu.style.transform = "translate(" + e.pageX + "px, " + e.pageY + "px" + ")";
			cambiarContextMenu(1, newCirculo);

			e.stopPropagation();
		}


		newCirculo.addEventListener("click", clickCirculo);
		newCirculo.addEventListener("contextmenu", function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		this.appendChild(newCirculo);
	}

	var body = document.getElementsByTagName("body")[0];
	body.addEventListener("click", clickBody);

}
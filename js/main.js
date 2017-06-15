var url = "http://examen-laboratoria-sprint-5.herokuapp.com/topics/";
var $nuevoTopic = $("<div/>");
var $contenedor = $("#listaTopics");

var cargarPagina = function(){
	 muestraLista();
	 cargaModal();
	 $("#enviarTopic").click(agregarTopic);
	 $("form").submit(busqueda);
}

var agregarTopic = function (){

	var $autor = $("#autor").val();
	var $contenido = $("#contenido").val();

	$.post(url,{author_name: $autor, content: $contenido}).done(function( data ) {
		muestraLista();
  	});

}
var busqueda = function (e){
	e.preventDefault();
	$itemBuscar = $("#topicSearch").val();
	// console.log(typeof($itemBuscar))
	var topicEncontrado=[];
	$.getJSON(url,function(data){
		 data.forEach(function(elemento){

			 if(elemento.content === $itemBuscar){
			 	topicEncontrado.push(elemento);
			 	cargaLista(topicEncontrado);
			 }
			 if (topicEncontrado.length < 0){
			 	alert("Mundo cruel, no existe ese tema");
			 }
		
	})

  	})
  	console.log(topicEncontrado);
}

 var buscaListaTopic = function(arreglo, $itemBuscar){
 	
 	var arrayTopic= arreglo.forEach(function(item){

 		if(item.content === $itemBuscar){
 			return item.content;
 			console.log("encontre");
 		}
 	})
 }
var cargaModal = function (){
	$('.modal').modal();
}
var muestraLista = function (){
	$.getJSON(url, function(data){
		cargaLista(data);
	});
}
var plantillaTopic = "<a class='col l6'>__temaTopic__</a>"+
					+"<p class='col l2'>__autor__</p>"
					+"<p class='col l4'>__respuestas__</p>";

var cargaLista = function(data){
	var nuevaPlantilla = "";
	data.forEach(function(tema){
		
		var nombreTema =tema.content;
		var autor = tema.author_name;
		var numeroRespuestas = tema.responses_count;
		nuevaPlantilla+=plantillaTopic.replace("__temaTopic__",nombreTema)
										 .replace("__autor__",autor)
									     .replace("__respuestas__",numeroRespuestas)
		$contenedor.html(nuevaPlantilla);
	});
	
};




$(document).ready(cargarPagina);
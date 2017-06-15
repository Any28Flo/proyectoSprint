var url = "http://examen-laboratoria-sprint-5.herokuapp.com/topics/";
var $nuevoTopic = $("<div/>");
var $contenedor = $("#listaTopics");
var cargarPagina = function(){
	 muestraLista();
	 cargaModal();
	 $("#enviarTopic").click(agregarTopic);
}

var agregarTopic = function (){

	var $autor = $("#autor").val();
	var $contenido = $("#contenido").val();
	$.post(url,{author_name: $autor, content: $contenido}).done(function( data ) {
		var $nuevoTopic = $("<div/>");
		$contenedor.append($nuevoTopic);
		var nombreTema =tema.content;
		var numeroRespuestas = tema.responses_count;
		$nuevoTopic.append(plantillaTopic.replace("__temaTopic__",contenido)
										 .replace("__autor__",autor))
									   
		});
  	
	// var convierte = JSON.stringify([$autor,$contenido]);
	// console.log(convierte);

}

var cargaModal = function (){
	$('.modal').modal();
}
var muestraLista = function (){
	$.getJSON(url, function(data){
		cargaLista(data);
	});
}
var plantillaTopic = "<p class='col l6'>__temaTopic__</p>"+
					+"<p class='col l2'>__autor__</p>"
					+"<p class='col l4'>__respuestas__</p>";

var cargaLista = function(data){

	data.forEach(function(tema){
		
		var $nuevoTopic = $("<div/>");
		$contenedor.append($nuevoTopic);
		var nombreTema =tema.content;
		var autor = tema.author_name;
		var numeroRespuestas = tema.responses_count;
		$nuevoTopic.append(plantillaTopic.replace("__temaTopic__",nombreTema)
										 .replace("__autor__",autor)
									     .replace("__respuestas__",numeroRespuestas))

	});
	
};

$(document).ready(cargarPagina);
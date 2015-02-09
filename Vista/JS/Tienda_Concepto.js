$(document).ready( function () {
    
      /*$('.content').hide();
	  $('.listelement').on('click', function(){
	    if(!($(this).children('.content').is(':visible'))){
	      $('.content').slideUp();
	      $(this).children('.content').slideDown();
	    } else {
	      $('.content').slideUp();
	    }
	  });*/


	  MySidebar("#Prueba_Lista");




} );

function MySidebar(id) 
{
	//Recorremos los li de primer nivel
	$( id+" > li" ).each(function(index) {

		//Verificamos si poseen un ul
		var padres = $(this).find("ul");
		//Si poseen
		if(padres.length > 0 ) 
		{
			//les ponemos el puntero del mouse tipo link al label dentro del li
			$(this).children('label').css( "cursor", "pointer" );
			//ocultamos los ul
			padres.hide();
			//Les agregamos funciones onclick al label dentro del li
			$(this).children('label').on('click', function(){
				//Si el ul de este li esta visible
				if($(this).parent().children('ul').is(':visible'))
				{
					//lo ocultamos
					$(this).parent().children('ul').slideUp();
				}
				else
				{
					//ocultamos todos los demas ul de los otros li
					$(this).parent().parent().children().has( "ul" ).children('ul').slideUp();
					//mostramos el ul de este li
					$(this).parent().children('ul').slideDown();
				};			   
			});
		};
	});	

}


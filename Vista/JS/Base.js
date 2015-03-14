var menu_estado=1;
var user_estado=1;
var RutaBase="/SGPIP";

function slide_menu() {
	
	if(menu_estado==0)//se encuentra abierto
	{
		//cierra aside
		$('#Aside').css('width', '0px');	
		$("#Contenido_Box" ).removeClass("corregirladoi");	
		//Acomoda el icono
		$('#menu_icono').css('color', '#4C5264');
		//establece el nuevo estado
		menu_estado=1;
	}
	else//se encuentra cerrado
	{
		//muestra aside
		$('#Aside').css('width', '240px');
		$('#Contenido_Box').addClass("corregirladoi");
		$('#menu_icono').css('color', '#F35958');			
		menu_estado=0;

		//cierra mensajes
		$('#user_menu').css('width', '0px');
		$("#Contenido_Box" ).removeClass("corregirladod");
		$('#m_config').css('display', '');
		$('#box_user').css('margin-right', '0px');
		$('#text_name').css('display', 'inline-block');	
		user_estado=1;
	}	

}

function slide_user() {
	
	if(user_estado==0)//se encuentra abierto
	{
		//se cierra
		$('#user_menu').css('width', '0px');
		$("#Contenido_Box" ).removeClass("corregirladod");				
		//acomoda el icono
		$('#m_config').css('display', '');
		$('#box_user').css('margin-right', '0px');
		$('#text_name').css('display', 'inline-block');
		//establece el nuevo estado
		user_estado=1;
	}
	else
	{
		//se muestra
		$('#user_menu').css('width', '240px');
		$('#Contenido_Box').addClass("corregirladod");		
		//acomoda el icono
		$('#m_config').css('display', 'none');
		$('#box_user').css('margin-right', '10px');
		$('#text_name').css('display', 'none');		
		//establece el nuevo estado	
		user_estado=0;

		//Cierra slide
		$('#Aside').css('width', '0px');
		$("#Contenido_Box" ).removeClass("corregirladoi");	
		$('#menu_icono').css('color', '#4C5264');
		menu_estado=1;
	}
}


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
					$(this).parent().children('ul').slideUp('fast');
				}
				else
				{
					//ocultamos todos los demas ul de los otros li
					$(this).parent().parent().children().has( "ul" ).children('ul').slideUp('fast');
					//mostramos el ul de este li
					$(this).parent().children('ul').slideDown('fast');
				};			   
			});
		};
	});	
}


$(document).ready( function () {
    
    MySidebar("#panelbar");   

    //$("#scroll_panel").scrollpanel();
    
} );

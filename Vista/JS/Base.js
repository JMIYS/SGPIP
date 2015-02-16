var menu_estado=1;
var user_estado=1;
var RutaBase="/SGPIP";

function slide_menu() {
	
	if(menu_estado==0)
	{
		$('#Aside').css('width', '0px');
		$('#Contenido').css('overflow', 'auto');	
		$('#Contenido').css('height', 'auto');	
		$('#menu_icono').css('color', '#4C5264');	

			
		menu_estado=1;
	}
	else
	{
		$('#Aside').css('width', '240px');
		$('#Contenido').css('overflow', 'hidden');	
		$('#Contenido').css('height', 'calc(100vh - 50px)');
		$('#menu_icono').css('color', '#F35958');	
		menu_estado=0;

		$('#Contenido_Box').css('margin-right', '0px');
		//$('#m_config').css('display', 'block');
		//$('#box_user').css('margin-left', '0px');
		//$('#text_name').css('display', 'inline-block');	
		user_estado=1;
	}	

}

function slide_user() {
	
	if(user_estado==0)
	{
		$('#Contenido_Box').css('margin-right', '0px');
		$('#Contenido').css('overflow', 'auto');	
		$('#Contenido').css('height', 'auto');			
		user_estado=1;
		
		//$('#m_config').css('display', 'block');
		//$('#box_user').css('margin-left', '0px');
		//$('#text_name').css('display', 'inline-block');	
	}
	else
	{
		$('#Contenido_Box').css('margin-right', '240px');
		$('#Contenido').css('overflow', 'hidden');	
		$('#Contenido').css('height', 'calc(100vh - 50px)');
		//
		//$('#m_config').css('display', 'none');
		//$('#box_user').css('margin-right', '10px');
		//$('#text_name').css('display', 'none');		
		//		
		user_estado=0;

		$('#Aside').css('width', '0px');
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
    jQuery('.scrollbar-inner').scrollbar();
    
} );

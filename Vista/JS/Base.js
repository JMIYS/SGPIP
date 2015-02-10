var menu_estado=1;
var user_estado=1;

function slide_menu() {
	
	if(menu_estado==0)
	{
		$('#Aside').css('width', '0px');
		$('#Contenido').css('overflow', 'auto');	
		$('#Contenido').css('height', 'auto');		
		menu_estado=1;
	}
	else
	{
		$('#Aside').css('width', '240px');
		$('#Contenido').css('overflow', 'hidden');	
		$('#Contenido').css('height', 'calc(100vh - 50px)');	
		menu_estado=0;

		$('#user_menu').css('width', '0px');
		user_estado=1;
	}	

}

function slide_user() {
	
	if(user_estado==0)
	{
		$('#user_menu').css('width', '0px');
		$('#Contenido').css('overflow', 'auto');	
		$('#Contenido').css('height', 'auto');			
		user_estado=1;
	}
	else
	{
		$('#user_menu').css('width', '240px');
		$('#Contenido').css('overflow', 'hidden');	
		$('#Contenido').css('height', 'calc(100vh - 50px)');		
		user_estado=0;

		$('#Aside').css('width', '0px');
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

$(document).ready( function () {
    
    MySidebar("#panelbar");

} );

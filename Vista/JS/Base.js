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

$(document).ready( function () {

	if($("#resultado").val() == "0") 
	{
		toastr.options.timeOut = 3500;
		toastr.error('Usuario y/o Contraseña Incorrectos!','ERROR');	
	}	

});

function Validar_Formulario() {	

	var $inputs = $("#elformulario input.requerido");
    var $textsarea = $("#elformulario textarea.requerido");
    var $select = $("#elformulario select.requerido");
    var correcto=true;
    //Intputs
    $inputs.each(function() {
    	
    	if($(this).val() == "")
    	{
    		$(this).addClass("tiene_error" );
    		correcto=false;
    	}
    	else    	
    		$(this).removeClass("tiene_error" );    	   		
    	
    });
    //Textarea
    $textsarea.each(function() {
    	
    	if($(this).val() == "")
    	{
    		$(this).addClass("tiene_error" );
    		correcto=false;
    	}
    	else    	
    		$(this).removeClass("tiene_error" );    	   		
    	
    });

    //Select
    $select.each(function() {
    	
    	if($(this).val() == 0 || $(this).val() == "0" || $(this).val() == "" || $(this).val() == null)
    	{
    		$(this).addClass("tiene_error" );
    		correcto=false;
    	}
    	else    	
    		$(this).removeClass("tiene_error" );     	   		
    	
    });
    
    if(!correcto)
    {
    	alert("Ingrese todos los datos");
    	return false;
    }    	
    else 
		return true;

}
$(document).ready( function () {
    var opciones = {aSep: '', aDec: ',', vMin: '1', vMax: '999999999'};
    $('.validar_numero').autoNumeric('init', opciones);
});
function habilitar_dniruc(a){
	//var x = document.getElementById("browsers").value;
	//alert(a.value);
    //document.getElementById("demo").innerHTML = "You selected: " + x;	

    
    if(a.value=="1"){
    	
    	$( "#dnii" ).prop( "disabled", false );
    	$( "#rucc" ).prop( "disabled", true );
        $( "#dnii" ).addClass("requerido" );
        $( "#rucc" ).removeClass("requerido" );
        $( "#rucc" ).removeClass("tiene_error" );
    	//alert("Natural");
    }
    else if (a.value=="2") {
    	$( "#dnii" ).prop( "disabled", true );
    	$( "#rucc" ).prop( "disabled", false );
        $( "#rucc" ).addClass("requerido");
        $( "#dnii" ).removeClass("requerido");
        $( "#dnii" ).removeClass("tiene_error" );
    	//alert("Juridica");
    };
    
}

function Validar_Formulario() { 

    var $inputs = $("#registro_cliente input.requerido");
    var $textsarea = $("#registro_cliente textarea.requerido");
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
    
    if(!correcto)
    {
        alert("Ingrese todos los datos");
        return false;
    }       
    else 
        return true;

}



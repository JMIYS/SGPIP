$(document).ready( function () {
    
    $('[data-toggle="tooltip"]').tooltip();

    var opciones = {aSep: '', aDec: ',', vMin: '1', vMax: '999999999'};
    $('.validar_numero').autoNumeric('init', opciones);


    if($("#resultado").val() != "0") 
    {
        if($("#resultado").val() == "1")
        {
            toastr.options.timeOut = 3500;
            toastr.success('Se registró correctamente','REGISTRADO');
        }
        else
        {
            toastr.options.timeOut = 3500;
            toastr.error($("#resultado").val(), 'ERROR');
        }       
    }
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

function Limpiar() {

    $( "#txt_razon_social" ).val( "" );
    $( "#txt_abreviatura" ).val( "" );
    $( "#dnii" ).val( "" );
    $( "#rucc" ).val( "" );
    $( "#txt_direccion" ).val( "" );
    $( "#txt_descripcion" ).val( "" );
    $( "#txt_correo" ).val( "" );
    $( "#txt_celular" ).val( "" );
    $( "#txt_fijo" ).val( "" );
    $( "#txt_pagina" ).val( "" );
    //....
    $("#browsers").val("1");
    $( "#dnii" ).prop( "disabled", false );
    $( "#rucc" ).prop( "disabled", true );
    $( "#dnii" ).addClass("requerido" );
    $( "#rucc" ).removeClass("requerido" );
    $( "#rucc" ).removeClass("tiene_error" );
    $( "#dnii" ).removeClass("tiene_error" );
    $( "#txt_razon_social" ).removeClass("tiene_error" );
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
        alert("Ingrese los datos obligatorios (*)");
        return false;
    }       
    else 
        return true;

}



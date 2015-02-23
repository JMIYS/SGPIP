/*function AgregarSub()
{
	 toastr.options.timeOut = 2500;
	 toastr.success('Probando','Satisfecho');
}*/

$(document).ready( function () {

	$('[data-toggle="tooltip"]').tooltip();

	var opciones = {aSep: '', aDec: ',', vMin: '0', vMax: '999999999'};
    $('.numerr').autoNumeric('init', opciones);

	ListaDepartamento();
	ListaProvincia(1);	
	ListaMoneda();




	var organismo = document.getElementById("id_organismo").value;
    var usuario = document.getElementById("id_usuario").value;

    latabla = $('#TablaClientes').dataTable( {
        "ajax": RutaBase + "/Servicios/Cliente.php/Cliente?idorganismo="+organismo+"&idusuario="+usuario,       
        "columns": [
            { "data": "idcliente" },
            { "data": "razonsocial" },
            { "data": "persona" },
            { "defaultContent": "<button class='btn btn-default opp'><i class='fa fa-share'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" }           
        ],
        responsive: true,
        language: {
	        lengthMenu: "_MENU_",
	        search: "Buscar&nbsp;:",
	        info: "Mostrando _START_ a _END_ de _TOTAL_ Elementos",
	        paginate: {
	            first:      "Inicio",
	            previous:   "Anterior",
	            next:       "Siguiente",
	            last:       "Final"
	        }
	    }
    });

    $("#TablaClientes tbody").on('click', '.opp', function( evt ) {

        var lafila = $(this).closest('tr');
        var indice = $("#TablaClientes tbody tr").index(lafila);  

        if(lafila.find("li").length > 0)
        {
            var correccion = (indice - 1);
            var fil = $("#TablaClientes tbody").children().eq(correccion);   
        }
        else        
            var fil = $("#TablaClientes tbody").children().eq(indice);            
     
        
        var col = fil.children().eq(0);

        $("#idcliente").val(fil.children().eq(0).html());
        $("#nombrecliente").val(fil.children().eq(1).html());

        $('#myModal').modal('hide');
      
    });




});


function ListaDepartamento () 
{
	var options = $("#Departamento");
	$.ajax({
		type: "GET",
		url: "/SGPIP/Servicios/Ubicacion.php/Departamento/Lista",				
		success: function (data) 
		{	
			var v=data["data"];			
			for (var dato in v) {
				options.append($("<option />").val(v[dato]["iddepartamento"]).text(v[dato]["nombre"])); 
			};
		},
		error: function(result) {
		}
	});
}	

function SelectDepartamento (me) {
	ListaProvincia(me.value);	
}

function ListaProvincia (iddepartamento) 
{
	var options = $("#Provincia");
	options.empty();
	$.ajax({
		type: "GET",
		url: "/SGPIP/Servicios/Ubicacion.php/Provincia/Lista?iddepartamento="+iddepartamento,				
		success: function (data) 
		{	
			var v=data["data"];			
			for (var dato in v) {
				options.append($("<option />").val(v[dato]["idprovincia"]).text(v[dato]["nombre"])); 
			};

			ListaDistrtito($("#Departamento option:selected" ).val(), v[0]["idprovincia"]);			
		},
		error: function(result) {
		}
	});
}	

function SelectProvincia (me) {
	ListaDistrtito($("#Departamento option:selected" ).val(), me.value);	
}

function ListaDistrtito (iddepartamento, idprovincia) 
{
	var options = $("#Distrito");
	options.empty();
	$.ajax({
		type: "GET",
		url: "/SGPIP/Servicios/Ubicacion.php/Distrtito/Lista?iddepartamento="+iddepartamento+"&idprovincia="+idprovincia,				
		success: function (data) 
		{	
			var v=data["data"];			
			for (var dato in v) {
				options.append($("<option />").val(v[dato]["iddistrito"]).text(v[dato]["nombre"])); 
			};
		},
		error: function(result) {
		}
	});
}

function ListaMoneda () 
{
	var options = $("#Moneda");
	$.ajax({
		type: "GET",
		url: "/SGPIP/Servicios/Moneda.php/Listar",				
		success: function (data) 
		{	
			var v=data["data"];			
			for (var dato in v) {
				options.append($("<option />").val(v[dato]["idmoneda"]).text(v[dato]["nombre"])); 
			};
		},
		error: function(result) {
		}
	});
}

function Validar_Formulario() {	

	var $inputs = $("#elformulario input.requerido");
    var $textsarea = $("#elformulario textarea.requerido");
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
    	alert("Ingrese todos los datos");
    else 
    	alert("Correcto");
    
    return false;

}
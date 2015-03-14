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
            { "defaultContent": "<button class='btn btn-default opp'><i class='fa fa-download'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" }           
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
			toastr.error('ERROR',$("#resultado").val());
		}		
	}
	
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

function Limpiar() 
{
	$("#idcliente" ).val("");
	$("#nombrecliente" ).val("");
	$("#Plazo" ).val("");
	$("#Jornadas" ).val("8");
	$("#Moneda" ).val("1");
	$("#Descripcion" ).val("");
	$("#PBaseDirecto" ).val("0");
	$("#PBaseIndirecto" ).val("0");
	$("#PBaseTotal" ).val("0");

    $( "#Descripcion" ).removeClass("requerido");
    $( "#Jornadas" ).removeClass("tiene_error");
    $( "#Plazo" ).removeClass("tiene_error");
    $( "#nombrecliente" ).removeClass("tiene_error");
   
}

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
$(document).ready( function () {

    var organismo = document.getElementById("id_organismo").value;
    var usuario = document.getElementById("id_usuario").value;

    var latabla = $('#cliente_mostrar').dataTable( {
        responsive: true,
        "ajax": RutaBase + "/Servicios/Cliente.php/Cliente",     
        "columns": [
            { "data": "idcliente" },
            { "data": "razonsocial" },
            { "data": "abreviatura" },
            { "data": "persona" },
            { "data": "ruc" },
            { "data": "dni" },
            { "data": "correo" },
            { "data": "direccion" }
        ],
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


    $('<a href="'+RutaBase+'/Cliente/Registrar" class="btn btn-primary" style="margin-left: 10px; margin-bottom: 3%;">Nuevo</a>').appendTo('div.dataTables_length');  
    
	$("#cliente_mostrar tbody").on('click', 'td', function( evt ) {
       	
        var col = $(this).parent().children().eq(0);
        alert(col.html());
    });
} 

);


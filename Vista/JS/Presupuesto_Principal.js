$(document).ready( function () {
    $('#jstree').jstree();

    var organismo = document.getElementById("id_organismo").value;
    var usuario = document.getElementById("id_usuario").value;

    $('#presupuestos').dataTable( {
        "ajax": "/SGPIP/Servicios/Press.php/Presupuesto?idorganismo="+organismo+"&idusuario="+usuario,
        "columns": [
            { "data": "nombre" },
            { "data": "fecha" },
            { "data": "cliente" },
            { "data": "departamento" },
            { "data": "provincia" },
            { "data": "distrito" }
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
    } );

} );
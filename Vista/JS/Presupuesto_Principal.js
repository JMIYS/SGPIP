$(document).ready( function () {
    $('#jstree').jstree();

    var organismo = document.getElementById("id_organismo").value;
    var usuario = document.getElementById("id_usuario").value;

    var latabla = $('#presupuestos').dataTable( {
        "ajax": RutaBase + "/Servicios/Press.php/Presupuesto?idorganismo="+organismo+"&idusuario="+usuario,       
        "columns": [
            { "data": "idpresupuesto" },
            { "data": "nombre" },
            { "data": "fecha" },
            { "data": "cliente" },
            { "defaultContent": "<button class='btn btn-default opp'><i class='fa fa-folder-open'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" },
            { "defaultContent": "<button class='btn btn-info edit'><i class='fa fa-pencil'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" },
            { "defaultContent": "<button class='btn btn-danger elim'><i class='fa fa-times'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" }
        ],
        "order": [[ 2, "desc" ]],
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

    $('<a href="'+RutaBase+'/Presupuesto/Registro" class="btn btn-primary" style="margin-left: 10px; margin-bottom: 3%;">Nuevo</a>').appendTo('div.dataTables_length');  

    $("#presupuestos tbody").on('click', '.elim', function( evt ) {
        
        var col = $(this).parent().parent().children().eq(0);
        alert("Eliminar "+col.html());
    });

    $("#presupuestos tbody").on('click', '.edit', function( evt ) {
        
        var col = $(this).parent().parent().children().eq(0);
        alert("Editar "+col.html());
    });

    $("#presupuestos tbody").on('click', '.opp', function( evt ) {
        
        var col = $(this).parent().parent().children().eq(0);
        alert("Abrir "+col.html());
    });
    

} );
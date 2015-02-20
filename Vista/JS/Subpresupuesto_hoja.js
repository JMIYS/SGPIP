

var listaCatalogo;


$(document).ready( function () {
   

     listaCatalogo = $('#TablaCatalogoTitulos').dataTable( {
        "ajax": RutaBase + "/Servicios/Subpresupuestos.php/General/Lista",       
        "columns": [
            { "data": "idcatalogo_titulo" },
            { "data": "nombre" },
            { "defaultContent": "<button class='btn btn-default opp'><i class='fa fa-share'></i></button>", "bSearchable": false, "bSortable": false, "width": "30px" },
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

$("<button type='button' class='btn btn-success' id='boton_nuevo' style='padding-top: 9px; margin-left: 5px' onclick='nuevo();'> <i class='fa fa-plus'></i> Agregar </button>").appendTo('div.dataTables_length');

$("<select class='form-control stateCombo' id='stateCombo1' onchange='actualizarXcategoria(this);' style='display: inline-block; width: 150px; margin-left: 10px;'><option value='0' title='-select one-'>-Selecione categoria-</option>	</select>").appendTo('div.dataTables_length');



var listaCategoria = $(".stateCombo");
    $.ajax({
    	type: "GET",
    	url: RutaBase +"/Servicios/CategoriaTitulo.php/Subpresupuesto",
    	success: function (data)
    	{
    		for(var i in data )
    		{
    			listaCategoria.append($("<option />").val(data[i]["idtcategoria_titulo"]).text(data[i]["nombre_categ"]));

    		}

    	},
    	error:function (result)
    	{
			alert("Error!!!!");
    	}

    });




} );


function nuevo () {
	
    $("#boton_nuevo").hide();   
    $("#nuevo_form").show("fast");
}
function ocultar () {
	
    $("#boton_nuevo").show("fast");   
    $("#nuevo_form").hide();
}

function actualizarXcategoria (idCategoria) {

	if (idCategoria.value==0)
		listaCatalogo.api().ajax.url(RutaBase+"/Servicios/Subpresupuestos.php/General/Lista").load();
else
	listaCatalogo.api().ajax.url(RutaBase+"/Servicios/Subpresupuestos.php/Categoria/Lista?idcategoria="+idCategoria.value).load();
	

}
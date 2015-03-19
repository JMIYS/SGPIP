

var listaCatalogo;
var listarCate;


$(document).ready( function () {
   toastr.options.timeOut = 2500;
   ActualizarTitulosHoja();
   $('#nestable3').nestable({
                    group: 1
                });


     listaCatalogo = $('#TablaCatalogoTitulos').dataTable( {
        "ajax": RutaBase + "/Servicios/Subpresupuestos.php/General/Lista",           
        "columns": [
            { "data": "id"},
            { "data": "descripcion" },
            { "defaultContent": "<button class='btn btn-default opp btn-xs'><i class='fa fa-share'></i></button>", "bSearchable": false, "bSortable": false,"width": "10px" },
            { "mData": "origen", "bSearchable": false, "bSortable": false, "width": "10px" , "mRender": function ( data, type, full ) {
        return "<button class='btn btn-info edit btn-xs' "+ (data== 1 ? "disabled" : "")+" > <i class='fa fa-pencil'> </i></button>";
      }},       
            { "mData": "origen", "bSearchable": false, "bSortable": false, "width": "10px","mRender": function ( data, type, full ) {
        return "<button class='btn btn-danger elim btn-xs' "+ (data== 1 ? "disabled" : "") +"><i class='fa fa-times'></i></button>";
      } }
        ],  
        "order": [[ 1, "asc" ]],
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


$("#TablaCatalogoTitulos tbody").on('click', '.edit', function() {        
       
        var data = $("#TablaCatalogoTitulos").DataTable().row($(this).parents('tr')).data();     
       
        $fila = $(this).closest("tr");        

        modificar();       


        if($("#venmod").length==0){            
            $fila.after('<tr id="venmod"><td colspan="5"></td></tr>');
        }else{
            
            $("#venmod").remove();
            $fila.after('<tr id="venmod"><td colspan="5"></td></tr>');
        }

        //$("#venmod td").append($("#VentanaModificar"));

        $("#venmod td").append(llevardato(data.descripcion, data.idcategoria_titulo+"",data.id));

        //console.log($(this).parent().parent());
        //$(this).parent().parent()
        ocultar();
    });

$("#TablaCatalogoTitulos tbody").on('click', '.elim', function() {        
       
        var data = $("#TablaCatalogoTitulos").DataTable().row($(this).parents('tr')).data();     
    
       EliminarCatalogoTitulo(data.id);
       
    });

$("#TablaCatalogoTitulos tbody").on('click', '.opp', function() {        
       
        var data = $("#TablaCatalogoTitulos").DataTable().row($(this).parents('tr')).data();     
       llevarTitulos(data);
       
    });

var listaCategoria = $(".stateCombo");
    $.ajax({
    	type: "GET",
    	url: RutaBase +"/Servicios/CategoriaTitulo.php/Subpresupuesto",
    	success: function (data)
    	{
            listarCate = data;
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

function llevardato( texto , categ ,idTit){

    var aux="<div id='VentanaModificar' class='panel panel-success' >"+
"                      <div class='panel-heading'><strong>MODIFICAR TITULO</strong>"+
"                        <div class='pull-right'>"+
"                            <button class='close miniclose' onclick='ocultarM();'><span class='glyphicon glyphicon-remove'></span></button>"+
"                        </div>"+
"                      </div>"+
"                      <div class='panel-body' style='padding: 15px 15px 0px 15px;'>"+
"                        <div class='row'>"+
"                            <div class='formulario_elemento col-md-12'>"+
"                                <label class='formulario_label'>Descripción </label>"+
"                                <span class='formulario_recomendacion'>Modifique el Titulo</span>"+
"                                <div class='formulario_control'>"+
"                                    <input id='txtDescripcionM' class='form-control' type='text' value='"+texto+"' >"+
"                                </div>"+
"                            </div>"+
"                        </div>"+
"                        <div class='row'>"+
"                            <div class='formulario_elemento col-md-12'>"+
"                                <label class='formulario_label'>Categoria</label>"+
"                                <div class='formulario_control'>"+
"                                    <select id='cbCategoriaM' class= 'stateCombo form-control'  > ";



  
            for(var i in listarCate )
            {
                if (categ == listarCate[i]["idtcategoria_titulo"]) 
                    aux+="<<option value="+listarCate[i]["idtcategoria_titulo"]+" selected>"+listarCate[i]["nombre_categ"]+"</option>";
                else                
                    aux+="<<option value="+listarCate[i]["idtcategoria_titulo"]+">"+listarCate[i]["nombre_categ"]+"</option>";
            }; 

             aux+="</select><span class='help-block'></span>"+
"                                </div>"+
"                            </div>"+
"                        </div>"+
"                      </div>"+
"                      <div class='panel-footer'>"+
"                        <div class='pull-right'>                            "+
"                            <button type='button' class='btn btn-success' onclick='ModificarCatalogoTitulo("+idTit+");'>Guardar</button>"+
"                            <button type='button' class='btn btn-default' onclick='ocultarM();'>Cancelar</button>                       "+
"                        </div>"+
"                        <div class='clearfix'></div>"+
"                      </div>"+
"                    </div>";

    return aux;

}


function nuevo () {
	
    $("#boton_nuevo").hide();   
    $("#nuevo_form").show("fast");
    ocultarM();
}
function ocultar () {
	
    $("#boton_nuevo").show("fast");   
    $("#nuevo_form").hide();
    Limpiar();
}

function modificar () {
	
    $("#boton_modificar").hide();   
    $("#venmod").show();
    $("#VentanaModificar").show("fast");

}

function ocultarM () {
	
    $("#boton_modificar").show("fast");   
    $("#venmod").hide();
    $("#VentanaModificar").hide();

    
}

function GuardarNuevo (argument) {
	
}


function actualizarXcategoria (idCategoria) {

	if (idCategoria.value==0)
		listaCatalogo.api().ajax.url(RutaBase+"/Servicios/Subpresupuestos.php/General/Lista").load();
else
	listaCatalogo.api().ajax.url(RutaBase+"/Servicios/Subpresupuestos.php/Categoria/Lista?idcategoria="+idCategoria.value).load();
	

}
function actualizartabla () {

        listaCatalogo.api().ajax.reload();

}
function EliminarSubPresupeusto (idsub) {
    if (confirm('Esta Seguro que desea eliminar el supresupuesto?\nUna ves eliminado no se podra recuperar!')) {
    // Save it!
    } else {
        // Do nothing!
    }
}

function Limpiar(){
    $("#txtDescripcionN").val("");
    $("#cbCategoriaN").val("0");
}

function GuardarNuevo (){
    if ($("#txtDescripcionN").val().trim() == "" || $("#cbCategoriaN").val() == "0") {
        alert("Falta llenar campos");
    }else {
        
        var dataString = {
            descripcion : $("#txtDescripcionN").val(), 
            idcategoria_titulo:$("#cbCategoriaN").val(),
            idusuario:$("#id_usuario").val(),
            idorganismo:$("#id_organismo").val()
        };


        $.ajax({
        type: "PUT",
        data: JSON.stringify(dataString),
        async   : false,
        url: RutaBase +"/Servicios/Titulo.php/Titulo",
        success: function (data)
        {
            if (data.Estado==1) {
                toastr.success('Se guardo correctamente','Satisfecho');
                ocultar();
                actualizartabla();
                Limpiar();

            }else {
                toastr.error(data.Mensaje,'Error');
            }


        },
        error:function (result)
        {
            toastr.error('Error desconocido','Error');
        }

    });

    }

}

function EliminarCatalogoTitulo (idTit) {
    if (confirm('Esta Seguro que desea eliminar el Titulo?\nUna ves eliminado no se podra recuperar!!!!')) 
    {
        var dataString = {
            idtitulo : idTit
        };
//alert(JSON.stringify(dataString));
        $.ajax({
            url: RutaBase +"/Servicios/Titulo.php/Titulo",
            type: "DELETE",
            data: JSON.stringify(dataString),
            async: true,
            success: function (data)
            {
                if (data.Estado==1) {
                    toastr.success('Se elimino correctamente','Satisfecho');
                    actualizartabla();

                }else {
                    toastr.error(data.Mensaje,'Error');
                }


            },
            error:function (result)
            {
                toastr.error('Error desconocido','Error');
            },
            cache: false

    })

    } else {
        //
    }
}
function ModificarCatalogoTitulo (idTit){
    if ($("#txtDescripcionM").val().trim() == "" || $("#cbCategoriaM").val() == "0") {
        alert("Falta llenar campos!!!");
    }else {
        var dataString = {
            idtitulo : idTit,
            descripcion : $("#txtDescripcionM").val(), 
            idcategoriaTitulo : $("#cbCategoriaM").val(), 
            idusuario:$("#id_usuario").val(),
            idorganismo:$("#id_organismo").val()

        };
//alert(JSON.stringify(dataString));
        $.ajax({
            url: RutaBase +"/Servicios/Titulo.php/Titulo",
            type: "POST",
            data: JSON.stringify(dataString),
            async: true,
            success: function (data)
            {
                if (data.Estado==1) {
                    toastr.success('Se modifico correctamente','Satisfecho');
                    actualizartabla();


                }else {
                    toastr.error(data.Mensaje,'Error');
                }


            },
            error:function (result)
            {
                toastr.error('Error desconocido','Error');
            },
            cache: false

    })
    }
}

function ActualizarTitulosHoja (){
    $.ajax({
        type: "GET",
        url: RutaBase +"/Servicios/Subpresupuestos.php/Titulo/Lista?idsubpresupuesto="+ $("#subper").val(),
        success: function (data)
        {
            $( "#nestable3 > ol" ).html( "" );
            var datos= data.data;
            for (var item in datos) {
                $('#nestable3 > ol').append(buildItem(datos[item]));
            }
                

        },
        error:function (result)
        {
            alert(JSON.stringify(result));
        }

    });
}

function buildItem(item) {

    var html = "<li class='dd-item' data-id='" + item.descripcion + "' id='" + item.idtitulo_presupuesto + "'>";
    html += "<input type='hidden' value='2' >";
    html += "<div class='idd' style='display:none;' >"+item.idtitulo+"</div>";
    html += "<div class='auxid' style='display:none;' >"+'2'+item.idtitulo+"</div>";
    if (item.hijos) {
        html += "<button data-action='collapse' type='button' style='display: block;'>Collapse</button>";
        html += "<button data-action='expand' type='button' style='display: none;'>Expand</button>";
    };

    html += "<div class='pull-right nestablecerrar'><a href='javascript:void(0);' onclick='quitartitu(this);' ><i class='fa fa-times'></i></a></div>";
    html += "<div class='dd-handle'>" + item.descripcion + "</div>";
    
    if (item.hijos) {
        html += "<ol class='dd-list'>";
        for (var sub in item.hijos) {
                html += buildItem(item.hijos[sub]);
            }
        html += "</ol>";
    }

    html += "</li>";

    return html;
}

function llevarTitulos (item) {

    var repetido = false;
   $( "#nestable3 > ol li" ).each(function( index ) {

          var orig = $(this).find("input").val();
          var idd = $(this).find("div.idd").html();
          var idtitu_pre = $(this).attr("id");

          if (item.id == idd && item.origen == orig) {
            repetido=true;
          };

    });
    if (repetido) {
        alert("dato repetido!!!");
    }else {
        var html = "<li class='dd-item' data-id='" + item.descripcion + "' id='0'>";
    html += "<input type='hidden' value='"+item.origen+"'>";
    html += "<div class='idd' style='display:none;'>"+item.id+"</div>";
    html += "<div class='auxid' style='display:none;' >"+item.origen+item.id+"</div>";
    html += "<div class='pull-right nestablecerrar'><a href='javascript:void(0);' onclick='quitartitu(this);'><i class='fa fa-times'></i></a></div>";
    html += "<div class='dd-handle'>" + item.descripcion + "</div>";

    html += "</li>";
    $("#nestable3 > ol").append(html);
    }
}

function quitartitu(aa){
    $elementoli=$(aa).closest("li");
    $elementoli.remove();
}



function guardarHojapre(){
    
     //var algo=$('#nestable3').nestable('serialize');
     //alert(JSON.stringify(algo));
     var jj = [];
     obtenerdatos($('#nestable3 > ol'),null,jj);
     alert(JSON.stringify(jj));
}

function obtenerdatos(principal, perte, jj){
    //niv++;
    var ord = 1;
    principal.children('li').each(function()
    {
        var elemento = {idtitulo_presupuesto : $(this).attr("id"), idaux: $(this).find("div.auxid").html(), idd : $(this).find("div.idd").html(), origen : $(this).find("input").val(), orden : ord,  pertenece : perte };
        jj.push(elemento);

        $tienehijos = $(this).find('ol');
        if ($tienehijos.length > 0) {

            obtenerdatos($tienehijos.eq(0), $(this).find("div.auxid").html(),jj);
        };
        ord++;
    });
}
var latabla;
var _idpresupuesto;

$(document).ready( function () {

    /*
    $('#tree')
                .jstree({
                    'core' : {
                        'data' : {
                            'url' : '?operation=get_node',
                            'data' : function (node) {
                                return { 'id' : node.id };
                            }
                        },
                        'check_callback' : true,
                        'themes' : {
                            'responsive' : false
                        }
                    },
                    'plugins' : ['state','dnd','contextmenu','wholerow']
                })
                .on('delete_node.jstree', function (e, data) {
                    $.get('?operation=delete_node', { 'id' : data.node.id })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('create_node.jstree', function (e, data) {
                    $.get('?operation=create_node', { 'id' : data.node.parent, 'position' : data.position, 'text' : data.node.text })
                        .done(function (d) {
                            data.instance.set_id(data.node, d.id);
                        })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('rename_node.jstree', function (e, data) {
                    $.get('?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('move_node.jstree', function (e, data) {
                    $.get('?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent, 'position' : data.position })
                        .fail(function () {
                            data.instance.refresh();
                        });
                })
                .on('copy_node.jstree', function (e, data) {
                    $.get('?operation=copy_node', { 'id' : data.original.id, 'parent' : data.parent, 'position' : data.position })
                        .always(function () {
                            data.instance.refresh();
                        });
                })
                .on('changed.jstree', function (e, data) {
                    if(data && data.selected && data.selected.length) {
                        $.get('?operation=get_content&id=' + data.selected.join(':'), function (d) {
                            $('#data .default').html(d.content).show();
                        });
                    }
                    else {
                        $('#data .content').hide();
                        $('#data .default').html('Select a file from the tree.').show();
                    }
                });

    */

    $('#Contenedor').jstree({
        'core' : {
            'data' : {
                'url' : RutaBase + '/Servicios/Contenedor.php/Lista?idorganismo=1&idusuario=1',
                'data' : function (node) {
                    return { 'id' : node.id };
                }
            },
            'check_callback' : true,
            'themes' : {
                'responsive' : true
            }
        },
        'plugins' : ['state','dnd','contextmenu','wholerow']
    }).on('move_node.jstree', function (e, data) {
        alert("wwww");
    });


    var opciones = {aSep: '', aDec: ',', vMin: '1', vMax: '100'};
    $('#cantidad_subpresupuesto').autoNumeric('init', opciones);

    var organismo = document.getElementById("id_organismo").value;
    var usuario = document.getElementById("id_usuario").value;

    latabla = $('#presupuestos').dataTable( {
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
    //ELIMINAR
    $("#presupuestos tbody").on('click', '.elim', function( evt ) {

        var lafila = $(this).closest('tr');
        var indice = $("#presupuestos tbody tr").index(lafila);  

        if(lafila.find("li").length > 0)
        {
            var correccion = (indice - 1);
            var fil = $("#presupuestos tbody").children().eq(correccion);

            if (confirm('Esta seguro que desea eliminar el Presupuesto?\nSe eliminaran todos los datos correspondientes a este.')) {
                alert("Eliminar"+fil.children().eq(0).html());
            } else {
                
            }
           
        }
        else
        {
            var fil = $("#presupuestos tbody").children().eq(indice);
            if (confirm('Esta seguro que desea eliminar el Presupuesto?\nSe eliminaran todos los datos correspondientes a este.')) {
                alert("Eliminar"+fil.children().eq(0).html());
            } else {
                
            }    
        }  
    });

    //MODIFICAR
    $("#presupuestos tbody").on('click', '.edit', function( evt ) {

        var lafila = $(this).closest('tr');
        var indice = $("#presupuestos tbody tr").index(lafila); 

        if(lafila.find("li").length > 0)
        {
            var correccion = (indice - 1);
            var fil = $("#presupuestos tbody").children().eq(correccion);
            window.location.href = RutaBase+"/Presupuesto/Modificar/"+fil.children().eq(0).html();
        }
        else
        {
            var fil = $("#presupuestos tbody").children().eq(indice);
            window.location.href = RutaBase+"/Presupuesto/Modificar/"+fil.children().eq(0).html();
        }  
    });

    //ABRIR
    $("#presupuestos tbody").on('click', '.opp', function( evt ) {

        var lafila = $(this).closest('tr');
        var indice = $("#presupuestos tbody tr").index(lafila);  

        if(lafila.find("li").length > 0)
        {
            var correccion = (indice - 1);
            var fil = $("#presupuestos tbody").children().eq(correccion);   
        }
        else        
            var fil = $("#presupuestos tbody").children().eq(indice);            
     
        
        var col = fil.children().eq(0);
        
        $("#pres_seleccionado").val(col.html());
        ListarSubPresupuesto(col.html());
        $('#subpresupuestos').modal('show');
    });
    

} );

function Actualizar_Tabla() 
{
    latabla.api().ajax.reload();

    //table.ajax.url( 'newData.json' ).load();
}

function Mostrar() {
    MostrarSubTodos();
    OcultarSubTodos();
    $("#nuevo_subpresupuesto").hide();   
    $("#nuevo_form").show("fast");
}

function Ocultar() {
    $("#nuevo_form").hide("fast");
    $("#nuevo_subpresupuesto").show();
}

function OcultarSubTodos () {
    $("#lista_subpresupuesto").children().children('.subitempres').hide();
}

function MostrarSubTodos () {
    $("#lista_subpresupuesto").children().children('.texto_subitem').show();
}

function OcultarSub (cual) {
    var pad = $(cual).parent().parent().parent().parent();
    pad.children('.subitempres').hide("fast");
    pad.children('.texto_subitem').show();
}

function EditarSubPresupuesto (item) {
    Ocultar();
    MostrarSubTodos();
    OcultarSubTodos();
    var listaitem = $(item).parent().parent().parent();
    $(listaitem).children('.texto_subitem').hide();   
    $(listaitem).children('.subitempres').show("fast");
}

function GuardarEditadoSubPresupuesto(idupd) {
    if ($('#cambio_descripcion_subpresupuesto'+idupd+'').val() != '') {
        var dataString = {
            idsubpresupuesto: idupd,
            descripcion: $('#cambio_descripcion_subpresupuesto'+idupd+'').val(),
            cantidad: $('#cambio_cantidad_subpresupuesto'+idupd+'').val()
        };        
       $.ajax({
            url: RutaBase+"/Servicios/Subpress.php/SubPresupuesto",
            type: "PUT",
            data: JSON.stringify(dataString),
            async: false,
            success: function (data) {       
                Actualizar(); 
            },
            error: function(result) {
                alert('Error Al Editar');
            },
            cache: false
        });
   } else {
        alert('Campo Vacio...Ingrese Descripción');
   }
}

function EliminarSubPresupeusto (idsub) {
    if (confirm('Esta seguro que desea eliminar el Subpresupuesto?\nUna ves eliminado no se podra recuperar!.')) {
        var dataString = {
            idsubpresupuesto: idsub
        };        
       $.ajax({
            url: RutaBase+"/Servicios/Subpress.php/SubPresupuesto",
            type: "DELETE",
            data: JSON.stringify(dataString),
            async: true,
            success: function (data) {   
                if (data == true)
                {
                    toastr.options.timeOut = 3500; // 2.5s
                    toastr.success('Eliminado Exitosamente','Correcto');
                    Actualizar();
                }
                else
                {
                    toastr.options.timeOut = 3500; // 2.5s
                    //toastr.warning('Probando','Peligro');
                    toastr.error('Si contiene Titulos','No se Puede Eliminar');
                }           
            },
            error: function(result) {
                alert('Error Al Eliminar');
            },
            cache: false
        })
    } else {
        // Do nothing!
    }
}

function Actualizar () {
    var sel = $("#pres_seleccionado").val();
    if(sel != "0")
    {
        ListarSubPresupuesto(sel);
    }
}

function GuardarSubPresupuesto() {
    if ($('#descripcion_subpresupuesto').val() != '') {
        var dataString = {
            descripcion: $('#descripcion_subpresupuesto').val(),
            idpresupuesto: _idpresupuesto,
            cantidad: $('#cantidad_subpresupuesto').val(),
            idorganismo: 1,
            idusuario: 1
        };        
       $.ajax({
            url: RutaBase+"/Servicios/Subpress.php/SubPresupuesto",
            type: "POST",
            data: JSON.stringify(dataString),
            async: true,
            success: function (data) {       
                Ocultar();
                $('#descripcion_subpresupuesto').val('');
                toastr.options.timeOut = 3500; // 2.5s
                toastr.success('Guardado Exitosamente','Correcto');
                Actualizar();               
            },
            error: function(result) {
                alert('Error Al Eliminar');
            },
            cache: false
        })
    } else {
        alert('Ingrese el campo de descripcion');
    }
}

function ListarSubPresupuesto(idpres) 
{
    _idpresupuesto = idpres;
    var lista = $("#lista_subpresupuesto");
    var opc = {aSep: '', aDec: ',', vMin: '1', vMax: '100'};
    lista.empty();
    lista.append("<div class='list-group-item'><img class='loading_icon1' src='"+RutaBase+"/Vista/Imagenes/loading.gif'></div>");    

    $.ajax({
        type: "GET",
        url: RutaBase+"/Servicios/Subpress.php/SubPresupuesto?idpresupuesto="+idpres+"&idusuario=1&idorganismo=1",
        success: function (data) 
        { 
            lista.empty();
            if(data.length>0)
            {
                for (var dato in data) {  
                    lista.append("<div class='list-group-item'><div class='texto_subitem'><span class='pull-right'><span class='badge'>"+data[dato]["cant_titulo"]
                        +"</span>&nbsp;<button class='btn btn-xs btn-info' onclick='EditarSubPresupuesto(this);'><span class='glyphicon glyphicon-pencil'></span></button>&nbsp;<button class='btn btn-xs btn-danger' onclick='EliminarSubPresupeusto("+data[dato]["idsubpresupuesto"]+");'><span class='glyphicon glyphicon-trash'></span></button></span><a href='"+RutaBase+"/Subpresupuesto/Editar/"+data[dato]["idsubpresupuesto"]+"'>"+data[dato]["descripcion"]
                        +"</a></div>"+
                        "<div class='panel panel-info subitempres' style='display: none; margin: -10px -15px;'><div class='panel-heading'><strong>EDITAR SUB-PRESUPUESTO</strong><div class='pull-right'><button class='close miniclose' onclick='OcultarSub(this);'><span class='glyphicon glyphicon-remove'></span></button></div></div><div class='panel-body' style='padding: 15px 15px 0px 15px;'> "+
                        "<div class='row'><div class='formulario_elemento col-md-12'><label class='formulario_label'>Descripción</label><span class='formulario_recomendacion'>Ingrese el Nombre</span><div class='formulario_control'><input class='form-control' id='cambio_descripcion_subpresupuesto"+data[dato]["idsubpresupuesto"]+"' type='text' value='"+data[dato]["descripcion"]+"'></div></div></div><div class='row'><div class='formulario_elemento col-md-12'><label class='formulario_label'>Cantidad</label><span class='formulario_recomendacion'>1,2,3,...</span><div class='formulario_control'><input type='text' class='form-control cant-cambio-sub' id='cambio_cantidad_subpresupuesto"+data[dato]["idsubpresupuesto"]+"' value='"+data[dato]["cantidad"]+"'/><span class='help-block'></span></div></div></div>"+
                        "</div><div class='panel-footer'><div class='pull-right'><button type='button' class='btn btn-success' onclick='GuardarEditadoSubPresupuesto("+data[dato]["idsubpresupuesto"]+");'>Guardar</button>&nbsp;<button type='button' class='btn btn-default' onclick='OcultarSub(this);'>Cancelar</button></div><div class='clearfix'></div></div></div></div>"); 

                    $('#cambio_cantidad_subpresupuesto'+data[dato]["idsubpresupuesto"]+'').autoNumeric('init', opc);
                };
            }
            else
            {
                lista.append("<div class='list-group-item'>Vacio</div>");
            }             
        },
        error: function(result) {
            lista.empty();
            lista.append("<div class='list-group-item'>"+JSON.stringify(result)+"</div>");
        }
    });       
}   
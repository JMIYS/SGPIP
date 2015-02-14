function AgregarSub()
{
	 toastr.options.timeOut = 2500;
	 toastr.success('Probando','Satisfecho');
}
$(document).ready( function () {
	ListaDepartamento();
	});
function ListaDepartamento () 
{
	var options=$("#Departamento");
	$.ajax({
		type: "GET",
		url: "/SGPIP/Servicios/Departamento.php/Ubicacion",
		//data: dataString,		
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
	 /*$.getJSON("/SGPIP/Servicios/Departamento.php/Ubicacion", function(result) { 
       var options = $("#Departamento"); 

       $.each(result, function(item) { 
       		alert("1");
           options.append($("<option />").val(item).text(item)); 
       }); 
   });*/
}	
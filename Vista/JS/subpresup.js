function alerta () {
	$('.AddSub').css('display', 'block');
}

function AgregarSub() {
	toastr.options.timeOut = 2500;
	toastr.success('SubPresupuesto', 'Agregando');
	$('.AddSub').css('display', 'none');
}

function CancelarSub() {
	$('.AddSub').css('display', 'none');
}
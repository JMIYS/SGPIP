function habilitar_dniruc(a){
	//var x = document.getElementById("browsers").value;
	//alert(a.value);
    //document.getElementById("demo").innerHTML = "You selected: " + x;	

    
    if(a.value=="1"){
    	
    	$( "#dnii" ).prop( "disabled", false );
    	$( "#rucc" ).prop( "disabled", true );
    	//alert("Natural");
    }
    else if (a.value=="2") {
    	$( "#dnii" ).prop( "disabled", true );
    	$( "#rucc" ).prop( "disabled", false );
    	//alert("Juridica");
    };
    
}


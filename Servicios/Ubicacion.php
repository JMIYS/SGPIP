<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Ubicacion.php");
$Modelo = new ModeloUbicacion();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

//-------------------------------------------------------------------GRUPO
  
$app->group('/Departamento', function () use ($app, $request, $Modelo) {
   
    $app->get('/Lista', function () use ($request, $Modelo) {

        $resultado = $Modelo->ListarDepartamento();
	    if(count($resultado)>0)
	        echo "{\"data\":" .json_encode($resultado). "}"; 
	    else
	        echo "{}";
    });       

});

$app->group('/Provincia', function () use ($app, $request, $Modelo) {

    $app->get('/Lista', function () use ($request, $Modelo) {

        $departamento = $request->get('iddepartamento');        
        $arrayName = array('iddepartamento' => $departamento);
        $resultado = $Modelo->ListarProvincia($arrayName);

        if(count($resultado)>0)
            echo "{\"data\":" .json_encode($resultado). "}";  
        else
            echo "{}";
    }); 
   

});

$app->group('/Distrtito', function () use ($app, $request, $Modelo) {

    $app->get('/Lista', function () use ($request, $Modelo) {

        $departamento = $request->get('iddepartamento');
        $provincia = $request->get('idprovincia');                
        $arrayName = array('iddepartamento' => $departamento, 'idprovincia' => $provincia);
        $resultado = $Modelo->ListarDistrito($arrayName);

        if(count($resultado)>0)
            echo "{\"data\":" .json_encode($resultado). "}";   
        else
            echo "{}";
    }); 
   

});


$app->run();

?>
<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Press.php");
$Modelo = new ModeloPress();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

//-------------------------------------------------------------------GET
$app->get("/Presupuesto", function () use ($request, $Modelo){

    $organismo = $request->get('idorganismo');
    $usuario = $request->get('idusuario');

    $arrayName = array('idorganismo' => $organismo, 'idusuario' => $usuario);
    $resultado = $Modelo->Listar($arrayName);
    if(count($resultado)>0)
    	echo "{\"data\":" .json_encode($resultado). "}"; 
    else
        echo "";

});

$app->run();

?>
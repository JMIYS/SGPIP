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

//-------------------------------------------------------------------GET
$app->get("/Ubicacion", function () use ($request, $Modelo){

    $resultado = $Modelo->ListarDepartamento();
    if(count($resultado)>0)
        echo "{\"data\":" .json_encode($resultado). "}"; 
    else
        echo "";

});

$app->run();

?>
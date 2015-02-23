<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Moneda.php");
$Modelo = new ModeloMoneda();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

//-------------------------------------------------------------------GET
$app->get("/Listar", function () use ($request, $Modelo){

    $resultado = $Modelo->Listar();
    if(count($resultado)>0)
        echo "{\"data\":" .json_encode($resultado). "}"; 
    else
        echo "";

});


$app->run();

?>
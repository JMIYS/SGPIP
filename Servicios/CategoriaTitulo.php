<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Subpresupuesto.php");
$Modelo = new ModeloSubpresupuesto();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;


$app->get("/Subpresupuesto", function () use ($request, $Modelo){
    
    $resultado = $Modelo->ListarCategorias();
    if(count($resultado)>0)
        echo json_encode($resultado);  
    else
        echo "{}";

});


$app->run();

?>
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


$app->put("/Titulo", function () use ($request, $Modelo){ //insert
    
     $body = json_decode($request->getBody(), true);
        $ress = $Modelo->AgregarTitulo($body);
        $resultado = array('Estado' => $ress, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
        echo json_encode($resultado);

});

$app->delete("/Titulo", function () use ($request, $Modelo){ //insert
    
     $body = json_decode($request->getBody(), true);
        $ress = $Modelo->EliminarTitulo($body);
        $resultado = array('Estado' => $ress, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
        echo json_encode($resultado);

});

$app->post("/Titulo", function () use ($request, $Modelo){ //insert
    
     $body = json_decode($request->getBody(), true);
        $ress = $Modelo->ActualizarTitulo($body);
        $resultado = array('Estado' => $ress, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
        echo json_encode($resultado);

});

$app->run();

?>
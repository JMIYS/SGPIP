<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Subpress.php");
$Modelo = new ModeloSubpress();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;


$app->get("/SubPresupuesto", function () use ($request, $Modelo){

    $presupeusto = $request->get('idpresupuesto');
    $organismo = $request->get('idorganismo');
    $usuario = $request->get('idusuario');
    
    $arrayName = array('idpresupuesto' => $presupeusto, 'idorganismo' => $organismo, 'idusuario' => $usuario);
    $resultado = $Modelo->Listar($arrayName);
    if(count($resultado)>0)
        echo json_encode($resultado);  
    else
        echo "{}";

});



$app->run();

?>
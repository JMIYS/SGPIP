<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Cliente.php");
$Modelo = new ModeloCliente();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

//-------------------------------------------------------------------GET
$app->get("/Cliente", function () use ($request, $Modelo){

    $usuario = $request->get('idusuario');
    $organismo = $request->get('idorganismo');
    
    $arrayName = array('idusuario' => $usuario, 'idorganismo' => $organismo);

    $resultado = $Modelo->Mostrar_clientes($arrayName);
    if(count($resultado)>0)
        echo "{\"data\":" .json_encode($resultado). "}"; 
    else
        echo "{}";

});

//-------------------------------------------------------------------POST

$app->post('/ClienteInsertar', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true);    
    $id = $Modelo->InsertarCliente($body);
    
    if($id != 0)    
        $resultado = array('Estado' => true, 'Mensaje' => 'Correcto', 'Codigo_Int' => $id, 'Codigo_String' => '');    
    else    
        $resultado = array('Estado' => false, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
    echo json_encode($resultado);
});

$app->run();

?>
<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/Plataforma/Modelo/Cliente.php");
//$Modelo = new ModeloCliente();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

//-------------------------------------------------------------------GET
$app->get("/Cliente", function () use ($request, $Modelo){

    $inquilino = $request->get('idinquilino');
    $user = $request->get('usuario');
    $pass = $request->get('password');
    
    $arrayName = array('idinquilino' => $inquilino, 'usuario' => $user, 'password' => $pass);
    $resultado = $Modelo->Validar($arrayName);
    if(count($resultado)>0)
        echo json_encode($resultado[0]);  
    else
        echo "";

});

//-------------------------------------------------------------------POST

$app->post('/Cliente', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true);    
    $id = $Modelo->Insertar($body);    
    
    if($id != 0)    
        $resultado = array('Estado' => true, 'Mensaje' => 'Correcto', 'Codigo_Int' => $id, 'Codigo_String' => '');    
    else    
        $resultado = array('Estado' => false, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
    echo json_encode($resultado);
});

//--------------------------------------------------------------------PUT

$app->put('/Cliente', function () use($request, $Modelo) {
        $body = json_decode($request->getBody(), true);
        $ress = $Modelo->Habilitar($body);
        $resultado = array('Estado' => $ress, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
        echo json_encode($resultado);
    }
);

$app->run();

?>
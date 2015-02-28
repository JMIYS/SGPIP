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

//-----------------------GET - LISTAR
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

//-----------------------POST - AGREGAR
$app->post('/SubPresupuesto', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true);    
    $id = $Modelo->Guardar($body);    
    
    if($id != 0)    
        $resultado = array('Estado' => true, 'Mensaje' => 'Correcto', 'Codigo_Int' => $id, 'Codigo_String' => '');    
    else    
        $resultado = array('Estado' => false, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
    echo json_encode($resultado);
});

//-----------------------DELETE - ELIMINAR
$app->delete('/SubPresupuesto', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true); 
    $id = $Modelo->Eliminar($body);

    echo json_encode($id);
});

//-----------------------PUT - ACTUALIZAR
$app->put('/SubPresupuesto', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true); 
    $id = $Modelo->Editar($body);    

    echo json_encode($id);
});

$app->run();

?>
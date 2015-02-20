<?php

$root = $_SERVER["DOCUMENT_ROOT"];

require_once($root."/SGPIP/Modelo/Contenedor.php");
$Modelo = new ModeloContenedor();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');
$request = $app->request;
$response = $app->response;

$app->get('/Lista', function () use ($request, $Modelo) {

    $usuario = $request->get('idusuario');
    $organismo = $request->get('idorganismo');
    $padre = ($request->get('id') == "#") ? "0" : $request->get('id');
    
    $arrayName = array('idusuario' => $usuario, 'idorganismo' => $organismo, 'idcontenedor' => $padre);
    $resultado = $Modelo->Listar($arrayName);
    if(count($resultado)>0)
    {
        //print_r($resultado);
        echo json_encode($resultado);  

    }            
    else
        echo "{}";
});   

//-------------------------------------------------------------------GRUPO
  
/*$app->group('/Padre', function () use ($app, $request, $Modelo) {
   
    $app->get('/Lista', function () use ($request, $Modelo) {

        $usuario = $request->get('idusuario');
        $organismo = $request->get('idorganismo');
        
        $arrayName = array('idusuario' => $usuario, 'idorganismo' => $organismo);
        $resultado = $Modelo->ListarPadres($arrayName);
        if(count($resultado)>0)
        {
            //print_r($resultado);
            echo json_encode($resultado);  

        }            
        else
            echo "{}";
    });       

});

$app->group('/Hijo', function () use ($app, $request, $Modelo) {

    $app->get('/Lista', function () use ($request, $Modelo) {

        $padre = $request->get('idcontenedor');
        
        $arrayName = array('idcontenedor' => $padre);
        $resultado = $Modelo->ListarHijos($arrayName);
        if(count($resultado)>0)
            echo json_encode($resultado);  
        else
            echo "{}";
    }); 
   

});
*/



$app->run();

?>




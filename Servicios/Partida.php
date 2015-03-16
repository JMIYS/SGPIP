
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

//-------------------------------------------------------------------GET listar filtrar
/*$app->get("/Subpresupuesto", function () use ($request, $Modelo){

    $subpresupuesto = $request->get('idsubpresupuesto');
 
    
    $arrayName = array('idsubpresupuesto' => $subpresupuesto);
    $resultado = $Modelo->ListarTitulos($arrayName);
    if(count($resultado)>0)
        echo json_encode($resultado[0]);  
    else
        echo "";

});*/

$app->group('/General', function () use ($app, $request, $Modelo) {
   
    $app->get('/Lista', function () use ($request, $Modelo) {

        $resultado = $Modelo->ListarCatalogo();
    if(count($resultado)>0)
        echo "{\"data\":".json_encode($resultado)."}";  
    else
        echo "{}";
    });       

});

$app->group('/Categoria', function () use ($app, $request, $Modelo) {

    $app->get('/Lista', function () use ($request, $Modelo) {

        $padre = $request->get('idcategoria');
        
        $arrayName = array('idcategoria' => $padre);
        $resultado = $Modelo->ListarTituloCategoria($arrayName);
    if(count($resultado)>0)
        echo "{\"data\":".json_encode($resultado)."}";  
    else
        echo "{}";
    }); 
   

});


/*$app->get("/Subpresupuesto", function () use ($request, $Modelo){
    
    $resultado = $Modelo->ListarCatalogo();
    if(count($resultado)>0)
        echo "{\"data\":".json_encode($resultado)."}";  
    else
        echo "{}";

});*/

//-------------------------------------------------------------------POST modificar

/*$app->post('/Subpresupuesto', function() use($request, $Modelo) {

    $body = json_decode($request->getBody(), true);    
    $id = $Modelo->ActualizarTitulo($body);    
    
    if($id != 0)    
        $resultado = array('Estado' => true, 'Mensaje' => 'Correcto', 'Codigo_Int' => $id, 'Codigo_String' => '');    
    else    
        $resultado = array('Estado' => false, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
    echo json_encode($resultado);
});

//--------------------------------------------------------------------PUT insertar 

$app->put('/Subpresupuesto', function () use($request, $Modelo) {
        $body = json_decode($request->getBody(), true);
        $ress = $Modelo->AgregarTitulo($body);
        $resultado = array('Estado' => $ress, 'Mensaje' => $Modelo->mensaje, 'Codigo_Int' => 0, 'Codigo_String' => '');
        echo json_encode($resultado);
    }
);*/

$app->run();

?>
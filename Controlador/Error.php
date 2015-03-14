<?php

require_once('Base.php');

class ControladorError extends ControladorBase
{    
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) {
        parent::__construct($action, $id, $urlValues);
    }
    
    //bad URL request error
    protected function badURL()
    {    
        $this->Contenido = file_get_contents("Vista/Contenido/Error.html");   
        $html = $this->MostarElementos('','Error');
        print $html;
    }

    protected function Acceso()
    {
        $this->Contenido = file_get_contents("Vista/Contenido/Acceso.html");   
        $html = $this->MostarElementos('','Error');
        print $html;
    }
}

?>


<?php

require_once('Base.php');

class ControladorPartida extends ControladorBase
{
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }
        
    protected function HojaPre()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Partida/HojaPre.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  


        $jss = array('jquery.dataTables.min', 'dataTables.responsive.min', 'Tabla_Ejemplo');
        $csss = array('jquery.dataTables.min', 'dataTables.responsive', 'Nuevo_Tabla', 'Elementos');

        $pagina = $this->MostarElementos($jss, $csss ); 
        print $pagina;
    }
}
?>

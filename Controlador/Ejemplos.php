<?php

require_once('Base.php');

class ControladorEjemplos extends ControladorBase
{
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }
        
    protected function Contenedores()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Ejemplos/Contenedores.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $pagina = $this->MostarElementos('','Elementos'); 
        print $pagina;
    }

    protected function Tablas()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Ejemplos/Tablas.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $jss = array('jquery.dataTables.min', 'dataTables.responsive.min', 'Tabla_Ejemplo');
        $csss = array('jquery.dataTables.min', 'dataTables.responsive', 'Nuevo_Tabla', 'Elementos');

        $pagina = $this->MostarElementos($jss, $csss ); 
        print $pagina;
    }

    protected function Formularios()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Ejemplos/Formularios.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $pagina = $this->MostarElementos('','Elementos'); 
        print $pagina;
    }
}

?>
<?php

require_once('Base.php');

class ControladorInicio extends ControladorBase
{
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }
        
    protected function Principal()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Inicio.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $pagina = $this->MostarElementos('', ''); 
        print $pagina;
    }

    protected function Controles()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Controles.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $jsss = array('moment','jquery.validate.min','bootstrap-datepicker','bootstrap-datetimepicker.min','autoNumeric','bootstrap3-typeahead.min','icheck.min','jquery.scrollbar.min','toastr','jstree.min','fullcalendar.min','nicEdit'); 
        $csss = array('Controles','datepicker','bootstrap-datetimepicker.min','typeahead','iCheck-blue','jquery.scrollbar','toastr','jstree.min','fullcalendar.min');

        $pagina = $this->MostarElementos($jsss, $csss); 
        print $pagina;
    }
}

?>
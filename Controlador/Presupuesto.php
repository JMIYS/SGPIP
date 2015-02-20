<?php

require_once('Base.php');

class ControladorPresupuesto extends ControladorBase
{
    //add to the parent constructor
    public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }
        
    protected function Registro()//La accion por defecto para inicio (si no se envian parametros)
    {
        require_once('Modelo/Presupuesto.php');        
        $Presupuesto=new ModeloPresupuesto;
        require_once('Modelo/Login.php');        
        $Login=new ModeloLogin;                
        if(count($_POST)>0)
        {
            $this->ComprobarLogin();
            $_POST["idOrganismo"]=$Login->GetOrganismo();           
            $Presupuesto->guardar($_POST);            
        }
        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Presupuesto/Registo_Presupuesto.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  
        $csss=array('dataTables.responsive', 'Nuevo_Tabla', 'Elementos','Presupuesto','toastr');
        $jsss=array('jquery.dataTables.min', 'dataTables.responsive.min','Presupuesto','toastr','cliente_listar');
        $pagina = $this->MostarElementos($jsss, $csss); 
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

    protected function Principal()//La accion por defecto para inicio (si no se envian parametros)
    {
        $this->ComprobarLogin();
        
        $this->Header = $this->CargarHeader(file_get_contents("Vista/Secciones/Header.html"));
        $this->Contenido = file_get_contents("Vista/Contenido/Presupuesto/Principal.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = $this->CargarAside(file_get_contents("Vista/Secciones/Aside.html")); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");

        $jsss = array('jstree.min', 'autoNumeric', 'jquery.dataTables.min', 'dataTables.responsive.min','Presupuesto_Principal'); 
        $csss = array('Controles', 'dataTables.responsive', 'Nuevo_Tabla', 'Elementos','jstree.min','Presupuesto_Principal');

        $pagina = $this->MostarElementos($jsss, $csss);
        print $pagina;
    }    
}

?>
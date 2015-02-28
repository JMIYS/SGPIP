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
        
    protected function Nuevo()//La accion por defecto para inicio (si no se envian parametros)
    {
        $this->ComprobarLogin();

        $cont = $this->CargarHeader(file_get_contents("Vista/Contenido/Presupuesto/Registro.html"));

        if($_POST)
        {
            require_once('Modelo/Presupuesto.php');        
            $Presupuesto = new ModeloPresupuesto; 

            if($Presupuesto->Guardar($_POST))            
                $this->Contenido =  $this->Resultado($cont,1);            
            else            
                $this->Contenido =  $this->Resultado($cont,$Presupuesto->mensaje);
       }             
        else
        {
            $this->Contenido =  $this->Resultado($cont,0);
        }
       

        $this->Header = $this->CargarHeader(file_get_contents("Vista/Secciones/Header.html"));       
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = $this->CargarAside(file_get_contents("Vista/Secciones/Aside.html"));  
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  
        $csss=array('dataTables.responsive', 'Nuevo_Tabla', 'Elementos','Presupuesto','toastr');
        $jsss=array('jquery.dataTables.min', 'dataTables.responsive.min', 'autoNumeric', 'Presupuesto','toastr');
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

        $jsss = array('jstree.min', 'autoNumeric', 'jquery.dataTables.min', 'dataTables.responsive.min','Presupuesto_Principal','toastr'); 
        $csss = array('Controles', 'dataTables.responsive', 'Nuevo_Tabla', 'Elementos','jstree.min','Presupuesto_Principal','toastr');

        $pagina = $this->MostarElementos($jsss, $csss);
        print $pagina;
    }    
}

?>
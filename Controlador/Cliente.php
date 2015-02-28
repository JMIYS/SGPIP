<?php
require_once('Base.php');

class ControladorCliente extends ControladorBase
{
	public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }

    protected function Nuevo()//La accion por defecto para inicio (si no se envian parametros)
    {
        $this->ComprobarLogin();

        $this->Header = $this->CargarHeader(file_get_contents("Vista/Secciones/Header.html"));
        $cont = $this->CargarHeader(file_get_contents("Vista/Contenido/Cliente/Registrar.html"));

        if($_POST)
        {
            require_once('Modelo/Cliente.php');
            $varo = new ModeloCliente();

            if (isset($_POST["cmb_persona"])) 
            {
                if($_POST["cmb_persona"]=="1")
                    $_POST["cmb_persona"]="NATURAL";                
                else                
                    $_POST["cmb_persona"]="JURIDICA";                
            }  
            
            if ($varo->InsertarCliente($_POST)) 
                $this->Contenido =  $this->Resultado($cont,1);              
            else
                $this->Contenido =  $this->Resultado($cont, $varo->mensaje);
        }
        else
            $this->Contenido =  $this->Resultado($cont, 0);      
       
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = $this->CargarAside(file_get_contents("Vista/Secciones/Aside.html")); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $csss = array('cliente_registrar', 'Elementos', 'toastr');
        $jsss = array('cliente_registro', 'autoNumeric', 'toastr');
        $pagina = $this->MostarElementos($jsss,$csss); 
        print $pagina;
    }    

    protected function Principal()//La accion por defecto para inicio (si no se envian parametros)
    {
        $this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        $this->Contenido = file_get_contents("Vista/Contenido/Inicio.html"); 
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = $this->CargarAside(file_get_contents("Vista/Secciones/Aside.html")); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");
        
        $pagina = $this->MostarElementos('', ''); 
        print $pagina;
    }

}

?>
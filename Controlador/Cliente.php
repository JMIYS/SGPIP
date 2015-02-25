<?php
require_once('Base.php');

class ControladorCliente extends ControladorBase
{
	public function __construct($action, $id, $urlValues) 
    {
        parent::__construct($action, $id, $urlValues);//llama al construc de la base controlbase
        //$controllerName = str_replace("Controlador", "", get_class($this));    
    }

    protected function Registrar()//La accion por defecto para inicio (si no se envian parametros)
    {
        //$this->ComprobarLogin();

        $this->Header = file_get_contents("Vista/Secciones/Header.html");
        if($_POST)
        {
            require_once('Modelo/Cliente.php');
            $varo=new ModeloCliente();
            if (!isset($_POST["txt_dni"])) {
                $_POST["txt_dni"]="null";
            }
            if (!isset($_POST["txt_ruc"])) {
                $_POST["txt_ruc"]="null";
            }
            $varo->InsertarCliente($_POST);
            //print_r($_POST["txt_razon_social"].",".$_POST["txt_abreviatura"].",".$_POST["txt_descripcion"].",".$_POST["cmb_persona"].",".$_POST["txt_ruc"].",".$_POST["txt_dni"].",".$_POST["txt_correo"].",".$_POST["txt_celular"].",".$_POST["txt_fijo"].",".$_POST["txt_direccion"].",".$_POST["txt_pagina"]);
            
            echo $varo->mensaje;
            
            $this->Contenido = file_get_contents("Vista/Contenido/Cliente/mensaje.html"); 

        }
        else{

             $this->Contenido = file_get_contents("Vista/Contenido/Cliente/Registrar.html"); 
        }


       
        $this->User = file_get_contents("Vista/Secciones/User.html");
        $this->Aside = file_get_contents("Vista/Secciones/Aside.html"); 
        $this->Footer = file_get_contents("Vista/Secciones/Footer.html");  

        $csss = array('cliente_registrar', 'Elementos');
        $jsss = array('cliente_registro', 'autoNumeric');
        $pagina = $this->MostarElementos($jsss,$csss); 
        print $pagina;


    }

}

?>
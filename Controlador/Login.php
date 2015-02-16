<?php

require_once('Base.php');

class ControladorLogin extends ControladorBase
{    
    public function __construct($action, $id, $urlValues) {
        parent::__construct($action, $id, $urlValues);        
    }
    
    protected function Principal()
    {
        $this->Contenido = file_get_contents("Vista/Contenido/Login.html");


        if($_POST)
        { 
            if($this->Login->ValidarLogin($_POST['Usuario'], $_POST['Password']))
            {
                header("Location: http://". $_SERVER['HTTP_HOST'].Constantes::Path."/Inicio/Principal" );
                exit;
            }
            else
            {
                $diccionario_login = array('{elemento_login}'=>'Usuario o Contraseña Incorrectos');                 
            }         
        }
        else
        {      
            $diccionario_login = array('{elemento_login}'=>'Ingrese Usuario y Contraseña');                        
        }  
        
        $this->Contenido= str_replace(array_keys($diccionario_login), array_values($diccionario_login), $this->Contenido); 
        $html = $this->MostarElementos('','Login');
        print $html;       
    }

    protected function Logout()
    {
        $this->Login->Salir();
        header("Location: http://". $_SERVER['HTTP_HOST'].Constantes::Path."/Login/Principal" );
        exit;
    }
}

?>
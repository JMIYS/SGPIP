<?php
require_once('Base.php');

class ModeloCliente extends ModeloBase
{
    //------------usuario--------
    public function ModificarDatos($vars)
    {
        $this->consulta = "UPDATE usuario SET nombres='".$vars['nombres']."', apellidop='".$vars['apellidop']."', apellidom ='".$vars['apellidom']."', dni = ".$vars['dni'].", direccion = '".$vars['direccion']."', titulo = '".$vars['titulo']."', abreviacion = '".$vars['abreviacion']."', correo = '".$vars['correo']."', telefono = ".$vars['telefono'].", celular = ".$vars['celular']." WHERE idusuario = ".$vars['idusuario'].";";
        return $this->Ejecutar();        
    }   

    public function ModificarPassword($vars)
    {
        $this->consulta = "UPDATE usuario SET password = '".$vars['password']."' WHERE idusuario = ".$vars['idusuario'].";";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
	} 
}
?>
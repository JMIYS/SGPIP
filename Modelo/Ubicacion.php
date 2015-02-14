<?php
require_once('Base.php');

class ModeloUbicacion extends ModeloBase
{
    //------------usuario--------
    public function ListarDepartamento()
    {
        $this->consulta = "SELECT *from tdepartamento";
        $this->consultar();        
        return $this->rows;       
    }   
    public function ListarProvincia($vars)
    {
        $this->consulta = "SELECT *from tprovincia";
        return $this->Ejecutar();        
    }  
    public function ListarDitrito($vars)
    {
        $this->consulta = "SELECT *from tdistrito";
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
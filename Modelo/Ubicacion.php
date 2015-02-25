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
        $this->consulta = "SELECT *from tprovincia where iddepartamento=".$vars["iddepartamento"].";";
        $this->consultar();        
        return $this->rows;        
    }  
    public function ListarDistrito($vars)
    {
        $this->consulta = "SELECT *from tdistrito where iddepartamento=".$vars["iddepartamento"]." and idprovincia=".$vars["idprovincia"].";";
        $this->consultar();        
        return $this->rows;         
    }

    function __destruct() {  
    unset($this);
	} 
}
?>
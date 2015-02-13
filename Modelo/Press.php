<?php
require_once('Base.php');

class ModeloPress extends ModeloBase
{
    public function Listar($vars)
    {
        $this->consulta = "CALL spListarPresupuestos(".$vars["idorganismo"].",".$vars["idusuario"].")";
        $this->consultar();        
        return $this->rows;
    }

    function __destruct() {  
    unset($this);
	} 
}
?>
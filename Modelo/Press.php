<?php
require_once('Base.php');

class ModeloPress extends ModeloBase
{
    public function Listar($vars)
    {
        $this->consulta = "CALL spListar_Presupuestos(".$vars["idorganismo"].",".$vars["idusuario"].")";
        $this->consultar();        
        return $this->rows;
    }

    function __destruct() {  
    unset($this);
	} 
}
?>
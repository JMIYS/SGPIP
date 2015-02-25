<?php
require_once('Base.php');

class ModeloMoneda extends ModeloBase
{    
    public function Listar()
    {
        $this->consulta = " Call spListar_Moneda();";
        $this->consultar();
        return $this->rows;
    }
    
    function __destruct() {  
    unset($this);
    } 
}
?>
<?php
require_once('Base.php');

class ModeloSubpress extends ModeloBase
{
    //------------Presupuesto--------
    
    public function Listar($vars)
    {
        $this->consulta = " Call spListar_SubPresupuesto(".$vars["idpresupuesto"].",".$vars["idorganismo"].",".$vars["idusuario"].");";
        $this->consultar();        
        return $this->rows;        
    }   

    function __destruct() {  
    unset($this);
	} 
}
?>
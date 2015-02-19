<?php
require_once('Base.php');

class ModeloContenedor extends ModeloBase
{    
    public function Listar($vars)
    {
        $this->consulta = " Call spListar_Contenedor(".$vars["idusuario"].",".$vars["idorganismo"].",".$vars["idcontenedor"].");";
        $this->consultar();

        $arreglo = array();

        foreach ($this->rows as $key => $value) {
             $arreglo[] = array('id' => (int)$value["id"],'text' => $value["text"],'children'=> (bool)$value["children"]);
        }

        return $arreglo;
    }
    
    function __destruct() {  
    unset($this);
    } 
}
?>
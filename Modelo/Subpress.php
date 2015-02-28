<?php
require_once('Base.php');

class ModeloSubpress extends ModeloBase
{
    //------------Presupuesto--------
    
    public function Listar($vars)
    {
        $this->consulta = "Call spListar_SubPresupuesto(".$vars["idpresupuesto"].",".$vars["idorganismo"].",".$vars["idusuario"].");";
        $this->consultar();        
        return $this->rows;        
    }   

    public function Eliminar($vars)
    {
        $this->consulta = "Call spEliminarSubPresupuesto(".$vars['idsubpresupuesto'].");";
        return $this->Ejecutar();  
    }

    public function Editar($vars)
    {
        $this->consulta = "Call spEditarSubPresupuesto(".$vars['idsubpresupuesto'].",".$vars['cantidad'].",'".$vars["descripcion"]."');";
        $this->Ejecutar();  
    }

    public function Guardar($vars)
    {
        $this->consulta = "Call spAgregar_SubPresupuesto(".$vars["idpresupuesto"].",".$vars["cantidad"].",'".$vars["descripcion"]."',".$vars["idorganismo"].",".$vars["idusuario"].");";
        $this->Ejecutar();
    }

    function __destruct() {  
    unset($this);
	} 
}
?>
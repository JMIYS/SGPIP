<?php
require_once('Base.php');

class ModeloPresupuesto extends ModeloBase
{
    //------------Presupuesto--------
    
    public function Guardar($vars)
    {
        $this->consulta = "INSERT INTO tpresupuesto(idusuario,idorganismo,iddistrito,idprovincia,iddepartamento,idcliente,idmoneda,nombre,fecha,plazo,jornada,pb_costo_directo,pb_costo_indirecto,pb_total,po_costo_directo,po_costo_indirecto,po_total) values (".$vars["idUsuario"].",".$vars["idOrganismo"].",".$vars["distrito"].",".$vars["provincia"].",".$vars["departamento"].",".$vars["codigoCliente"].",".$vars["Moneda"].",'".$vars["Descripcion"]."',".$vars["Fecha"].",".$vars["Plazo"].",".$vars["Jornadas"].",".$vars["pbcd"].",".$vars["pbci"].",".$vars["pbTotal"].",".$vars["pocb"].",".$vars["poci"].",".$vars["poTotal"].",);";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
	} 
}
?>
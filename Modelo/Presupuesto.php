<?php
require_once('Base.php');

class ModeloPresupuesto extends ModeloBase
{
    //------------Presupuesto--------
    
    public function Guardar($vars)
    {
    	$conf = array(
            'idusuario' => array(
                'tipo' => 'numero',
                'null' => false ),
            'idorganismo' => array(
                'tipo' => 'numero',
                'null' => false ),
            'Distrito' => array(
                'tipo' => 'numero',
                'null' => false ),            
            'Provincia' => array(
                'tipo' => 'numero',
                'null' => false ),
            'Departamento' => array(
                'tipo' => 'numero',
                'null' => false ),
            'idcliente' => array(
                'tipo' => 'numero',
                'null' => false ),  
            'Moneda' => array(
                'tipo' => 'numero',
                'null' => false ),
            'Descripcion' => array(
                'tipo' => 'texto',
                'null' => false ), 
            'Plazo' => array(
                'tipo' => 'numero',
                'null' => false ),
            'Jornada' => array(
                'tipo' => 'numero',
                'null' => false ),             
            'PBaseDirecto' => array(
                'tipo' => 'numero',
                'null' => true ),
            'PBaseIndirecto' => array(
                'tipo' => 'numero',
                'null' => true ),
            'PBaseTotal' => array(
                'tipo' => 'numero',
                'null' => true ));

        $this->consulta = "INSERT INTO tpresupuesto(idcontenedor, idusuario,idorganismo,iddistrito,idprovincia,iddepartamento,idcliente,idmoneda,nombre,plazo,jornada,pb_costo_directo,pb_costo_indirecto,pb_total,estado) values (2,".$this->Tratar($conf, $vars).", 1);";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
	} 
}
?>
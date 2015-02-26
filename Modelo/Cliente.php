<?php
require_once('Base.php');

class ModeloCliente extends ModeloBase
{
    public function Mostrar_clientes($vars)
    {
        //$this->consulta = "SELECT * FROM tcliente WHERE idorganismo=".$vars["idorganismo"]." AND idusuario=".$vars["idusuario"].";";
        $this->consulta = "call spMostrarClientes(".$vars["idorganismo"]",".$vars["idusuario"].");";
        $this->consultar();         
        return $this->rows;       
    }   

    public function InsertarCliente($vars)
    {
        $this->consulta = "call spInsertarCliente('".$vars["txt_razon_social"]."','".$vars["txt_abreviatura"]."','".$vars["txt_descripcion"]."','".$vars["cmb_persona"]."',".$vars["txt_ruc"].",".$vars["txt_dni"].",'".$vars["txt_correo"]."',".$vars["txt_celular"].",".$vars["txt_fijo"].",'".$vars["txt_direccion"]."','".$vars["txt_pagina"]."');";
        return $this->Ejecutar();        
    }   

    function __destruct() {  
    unset($this);
    } 
}
?>